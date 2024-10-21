'use client'

import { Params } from '../types'
import { FormType } from '@payload-types'
import React from 'react'

import FormComponent from './Components/Form'

interface FormProps extends FormType {
  params: Params
}
const FormBlock: React.FC<FormProps> = ({ params, ...block }) => {
  const form =
    block?.form?.value && typeof block?.form?.value !== 'string'
      ? block?.form?.value
      : undefined

  return (
    <div className='mx-auto max-w-5xl space-y-8 pb-14 pt-40 text-base-content'>
      <h4 className='mb-8 text-2xl font-semibold text-base-content'>
        {block?.title}
      </h4>
      {form ? <FormComponent form={form} /> : null}
    </div>
  )
}

export default FormBlock
