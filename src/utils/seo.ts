import { env } from '@env'
import {
  GenerateDescription,
  GenerateImage,
  GenerateTitle,
  GenerateURL,
} from '@payloadcms/plugin-seo/types'

/**
 * Generates the title for SEO purposes based on the provided data.
 *
 * @param {any} data - The data object containing title information.
 * @returns {string} - The generated SEO title.
 *
 * @example
 * ```
 * const seoTitle = generateTitle({ doc: { title: { value: 'My Blog Post' } } });
 * // Example output: 'My Blog Post'
 * ```
 */
export const generateTitle: GenerateTitle = (data: any): string => {
  const title =
    typeof data?.doc?.title?.value === 'string'
      ? data?.doc?.title?.value
      : typeof data?.title === 'string'
        ? data.title
        : ''

  return title
}

/**
 * Generates a prompt for creating an SEO title based on the provided data.
 *
 * @param {any} data - The data object containing title information.
 * @returns {string} - The SEO title prompt.
 *
 * @example
 * ```
 * const seoTitlePrompt = generateTitlePrompt({ doc: { title: { value: 'My Blog Post' } } });
 * // Example output: 'Generate a SEO title for a blog post for My Blog Post in 50-60 chars'
 * ```
 */
export const generateTitlePrompt: GenerateTitle = (data: any): string => {
  const title =
    typeof data?.doc?.title?.value === 'string'
      ? data?.doc?.title?.value
      : typeof data?.title === 'string'
        ? data.title
        : ''

  return `Generate a SEO title for a blog post for ${title} in 50-60 chars`
}

/**
 * Generates the description for SEO purposes based on the provided data.
 *
 * @param {any} data - The data object containing description information.
 * @returns {string} - The generated SEO description.
 *
 * @example
 * ```
 * const seoDescription = generateDescription({ doc: { description: { value: 'A detailed description.' } } });
 * // Example output: 'A detailed description.'
 * ```
 */
export const generateDescription: GenerateDescription = (data: any): string => {
  const description =
    typeof data?.doc?.description?.value === 'string'
      ? data?.doc?.description?.value
      : ''

  return description
}

/**
 * Generates a prompt for creating an SEO description based on the provided data.
 *
 * @param {any} data - The data object containing description information.
 * @returns {string} - The SEO description prompt.
 *
 * @example
 * ```
 * const seoDescriptionPrompt = generateDescriptionPrompt({ doc: { description: { value: 'A detailed description.' } } });
 * // Example output: 'Generate a summarized description for a blog post with description A detailed description. in 100-150 chars'
 * ```
 */
export const generateDescriptionPrompt: GenerateDescription = (
  data: any,
): string => {
  const description =
    typeof data?.doc?.description?.value === 'string'
      ? data?.doc?.description?.value
      : ''

  return `Generate a summarized description for a blog post with description ${description} in 100-150 chars`
}

/**
 * Generates the image URL for SEO purposes based on the provided data.
 *
 * @param {any} data - The data object containing image information.
 * @returns {string} - The generated SEO image URL.
 *
 * @example
 * ```
 * const seoImage = generateImage({ doc: { img: { value: 'image-url.jpg' } } });
 * // Example output: 'image-url.jpg'
 * ```
 */
export const generateImage: GenerateImage = (data: any): string => {
  const image = typeof data?.doc?.blog_image

  return image
}

/**
 * Generates the URL for SEO purposes based on the provided data and environment configuration.
 *
 * @param {any} data - The data object containing URL components.
 * @returns {string} - The generated SEO URL.
 *
 * @example
 * ```
 * const seoURL = generateURL({ locale: 'en', collectionSlug: 'blog', id: '123' });
 * // Example output: 'https://example.com/en/blog/123'
 * ```
 */
export const generateURL: GenerateURL = (data: any): string => {
  const url = `${env.PAYLOAD_URL}/${data?.locale ? data?.locale + '/' : ''}${data?.collectionSlug || data?.docConfig?.slug || ''}/${data?.id || ''}`

  return url || ''
}
