import { payloadSlateToHtmlConfig, slateToHtml } from '@slate-serializers/html'
import DOMPurify from 'dompurify'

export const slateHtml = (slateText: any) => {
  const html = slateToHtml(slateText!, payloadSlateToHtmlConfig)
  const sanitizeHtml = DOMPurify.sanitize(html)

  return sanitizeHtml
}
