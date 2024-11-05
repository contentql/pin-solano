import { Block } from 'payload'

const FormConfig: Block = {
  slug: 'FormBlock',
  imageURL: '/images/block/form.png',
  interfaceName: 'FormType',
  labels: {
    singular: 'Form Block',
    plural: 'Form Blocks',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: ['forms'],
      required: true,
    },
  ],
}

export default FormConfig
