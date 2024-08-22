'use client'

import React from 'react'
import { Toaster } from 'sonner'

/**
 * Custom icons used for different types of toasts.
 */

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
      <Toaster />
    </>
  )
}

export default ToastProvider
