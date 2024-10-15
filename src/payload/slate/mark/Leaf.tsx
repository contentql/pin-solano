'use client'

import { useLeaf } from '@payloadcms/richtext-slate/client'

const Leaf = () => {
  const { attributes, children } = useLeaf()

  return <mark {...attributes}>{children}</mark>
}

export default Leaf
