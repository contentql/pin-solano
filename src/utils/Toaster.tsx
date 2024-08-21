'use client'

import React from 'react'
import { IoIosCloseCircle } from 'react-icons/io'
import { TiTick } from 'react-icons/ti'
import { Toaster } from 'sonner'

/**
 * Custom icons used for different types of toasts.
 */
export const icons = {
  success: (
    <div>
      <TiTick
        size={16}
        className='rounded-full bg-success text-sm text-success'
      />
    </div>
  ),

  error: (
    <div>
      <IoIosCloseCircle
        size={16}
        className='rounded-full bg-error text-sm text-error'
      />
    </div>
  ),
}

/**
 * A component that provides toast notifications with custom icons and options.
 *
 * @returns {React.FC} - The rendered `Toaster` component from the `sonner` library with custom configurations.
 *
 * @example
 * ```
 * <ToastProvider />
 * // This will render the `Toaster` with custom icons and toast options.
 * ```
 */
const ToastProvider: React.FC = () => {
  return (
    <>
      <Toaster icons={icons} />
    </>
  )
}

export default ToastProvider
