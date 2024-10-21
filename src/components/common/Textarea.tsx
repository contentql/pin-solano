import * as React from 'react'

import { cn } from '@/utils/cn'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'text-md focus: block max-h-48 min-h-[100px] w-full resize-y rounded-md border-0 bg-transparent px-3 py-1.5 leading-8 shadow-sm ring-1 ring-zinc-300 transition-shadow duration-300 focus:ring-2 focus:ring-primary focus-visible:outline-none',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea }
