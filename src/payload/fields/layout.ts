import { blocks } from '../blocks/index'
import deepMerge from 'deepmerge'
import { type Field } from 'payload'

export const layoutField = (overrides?: Partial<Field>): Field => {
  return deepMerge<Field, Partial<Field>>(
    {
      name: 'layout',
      label: 'Page Layout',
      type: 'blocks',
      minRows: 1,
      blocks,
    },
    overrides || {},
  )
}
