'use client'

import { TextField, useFormFields } from '@payloadcms/ui'
import { TextFieldProps } from 'payload'
import React from 'react'

const format = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

const CustomSlugField: React.FC<TextFieldProps> = props => {
  const { fields, dispatch } = useFormFields(([fields, dispatch]) => ({
    fields,
    dispatch,
  }))

  const title = fields?.title?.value
  const isHome = fields?.isHome?.value
  const isDynamic = fields?.isDynamic?.value
  const slugMode = fields?.slugMode?.value

  React.useEffect(() => {
    if (slugMode !== 'generate') return

    const formattedSlug = isHome ? '/' : format(String(title))

    dispatch({
      type: 'UPDATE',
      path: 'slug',
      value: formattedSlug,
    })
  }, [title, isHome, isDynamic, dispatch, props.readOnly, slugMode])

  const readOnly = fields?.slugMode?.value
    ? fields?.slugMode?.value === 'generate'
    : true

  return <TextField {...props} readOnly={readOnly} />
}

export default CustomSlugField
