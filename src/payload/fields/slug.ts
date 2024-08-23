import deepMerge from 'deepmerge'
import type { Field, FieldHook } from 'payload'

const format = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

export const formatSlug =
  (fallback: string): FieldHook =>
  ({ operation, value, originalDoc, data }) => {
    if (data?.isHome) return ''

    if (typeof value === 'string' && value.length > 0) {
      return format(value)
    }

    if (operation === 'create') {
      const fallbackData =
        (data && data[fallback]) || (originalDoc && originalDoc[fallback])

      if (fallbackData && typeof fallbackData === 'string') {
        return format(fallbackData)
      }
    }

    return value
  }

type Slug = (fieldToUse?: string, overrides?: Partial<Field>) => Field

const slugField: Slug = (fieldToUse = 'title', overrides = {}) => {
  return deepMerge<Field, Partial<Field>>(
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      index: true,
      required: false, // Need to be false so that we can use beforeValidate hook to set slug.
      admin: {
        position: 'sidebar',
        description: 'Auto generated or custom',
        condition: data => {
          return !data?.isHome && !data?.isDynamic
        },
        components: {
          Field: '/src/payload/fields/CustomSlugField.tsx',
        },
      },
      hooks: {
        beforeValidate: [formatSlug(fieldToUse)],
      },
    },
    overrides,
  )
}

const slugModeField = (overrides?: Partial<Field>): Field =>
  deepMerge<Field, Partial<Field>>(
    {
      name: 'slugMode',
      label: 'Slug Mode',
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
        condition: data => {
          return !data?.isHome && !data?.isDynamic
        },
      },
    },
    overrides || {},
  )

export { slugField, slugModeField }

export default slugField
