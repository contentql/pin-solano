import { getParents } from '@payloadcms/plugin-nested-docs'
import deepmerge from 'deepmerge'
import type { Field, FieldHook, Payload } from 'payload'
import { APIError } from 'payload'

import { COLLECTION_SLUG_PAGE } from '@/payload/collections/constants'
import { generateBreadcrumbsUrl } from '@/utils/generateBreadcrumbsUrl'

export const willPathConflict = async ({
  payload,
  path,
  currentDocId,
  currentCollection,
  collectionsToCheck = [],
}: {
  payload: Payload
  path: string
  currentDocId?: string
  currentCollection: string
  collectionsToCheck?: string[]
}) => {
  if (!payload || collectionsToCheck.length === 0) return false

  const queries = collectionsToCheck.map(collection => {
    const whereCondition: any = {
      path: {
        equals: path,
      },
    }
    if (currentDocId && currentCollection === collection) {
      whereCondition.id = { not_equals: currentDocId }
    }

    return payload.find({
      // @ts-ignore
      collection,
      where: whereCondition,
      limit: 1,
    })
  })

  const results = await Promise.allSettled(queries)
  return results.some(
    result => result.status === 'fulfilled' && result.value.docs.length > 0,
  )
}

export const generateAndValidatePath: FieldHook = async ({
  collection,
  req,
  value,
  siblingData,
  originalDoc,
  operation,
}) => {
  // This can happen if auto save is on.
  if (
    operation === 'create' &&
    value == null &&
    (Object.keys(originalDoc).length === 0 ||
      Object.keys(siblingData).length === 0)
  )
    return value

  const { payload } = req

  if (!payload) return value // If not server side exist

  const currentDoc = { ...originalDoc, ...siblingData }

  if (siblingData?.pathMode && siblingData?.pathMode === 'custom') {
    return value
  }

  const docs = await getParents(
    req,
    // @ts-ignore
    { parentFieldSlug: 'parent' },
    collection,
    currentDoc,
    [currentDoc],
  )

  const updatedPath = generateBreadcrumbsUrl(docs, currentDoc)
  const isNewPathConflicting = await willPathConflict({
    payload,
    path: updatedPath,
    currentDocId: currentDoc.id,
    currentCollection: collection ? collection.slug : COLLECTION_SLUG_PAGE,
    collectionsToCheck: [COLLECTION_SLUG_PAGE], // Add more collections as needed
  })

  if (isNewPathConflicting) {
    const error = new APIError(
      'This will create a conflict with an existing path.',
      400,
      [
        {
          field: 'path',
          message: 'This will create a conflict with an existing path.',
        },
      ],
      false,
    )
    throw error
  }

  return updatedPath
}

const pathField = (overrides?: Partial<Field>): Field =>
  deepmerge<Field, Partial<Field>>(
    {
      type: 'text',
      name: 'path',
      unique: true,
      index: true,
      label: 'Path',
      hooks: {
        beforeValidate: [generateAndValidatePath],
      },
      admin: {
        position: 'sidebar',
        components: {
          Field: '/src/payload/fields/CustomPathField.tsx',
        },
      },
    },
    overrides || {},
  )

const pathModeField = (overrides?: Partial<Field>): Field =>
  deepmerge<Field, Partial<Field>>(
    {
      name: 'pathMode',
      label: 'Path Mode',
      type: 'radio',
      options: [
        {
          label: 'Generate',
          value: 'generate',
        },
        {
          label: 'Custom',
          value: 'custom',
        },
      ],
      defaultValue: 'generate',
      admin: {
        position: 'sidebar',
        layout: 'horizontal',
      },
    },
    overrides || {},
  )

export { pathField, pathModeField }

export default pathField
