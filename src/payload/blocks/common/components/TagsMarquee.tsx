import { Media, Tag } from '@payload-types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/common/Avatar'
import { cn } from '@/utils/cn'

interface TagsDetails extends Tag {
  count: number
}

interface ReviewCard {
  tag: TagsDetails
}

const ReviewCard: React.FC<ReviewCard> = ({ tag }) => {
  const router = useRouter()
  return (
    <figure
      // onClick={() => {
      //   router.push(`/tag/${tag?.slug}`)
      // }}
      className={cn(
        'relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4',
        'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
        'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]',
      )}>
      <Link href={`/tag/${tag?.slug}`}>
        <div className='flex flex-row items-center justify-between'>
          <div className='flex flex-row items-center gap-2 pb-2'>
            <Avatar className='h-8 w-8'>
              <AvatarImage
                src={(tag?.tagImage as Media)?.url || ''}
                alt={(tag?.tagImage as Media)?.alt || 'Tag'}
              />
              <AvatarFallback />
            </Avatar>
            <figcaption className='text-md font-medium dark:text-white'>
              {tag?.title}
            </figcaption>
          </div>
          <p className='text-xs font-medium dark:text-white/40'>
            {tag?.count} posts
          </p>
        </div>
        <blockquote className='mt-2 text-sm dark:text-gray-300'>
          {tag?.description}
        </blockquote>
      </Link>
    </figure>
  )
}

export const TagsMarquee = ({
  tagsDetails,
}: {
  tagsDetails: TagsDetails[]
}) => {
  return (
    <div className='container relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg pt-16'>
      <Marquee pauseOnHover className='[--duration:20s]'>
        {tagsDetails?.map(tag => <ReviewCard key={tag?.slug} tag={tag} />)}
      </Marquee>
    </div>
  )
}

interface MarqueeProps {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  children?: React.ReactNode
  vertical?: boolean
  repeat?: number
  [key: string]: any
}

function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        'group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]',
        {
          'flex-row': !vertical,
          'flex-col': vertical,
        },
        className,
      )}>
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn('flex shrink-0 justify-around [gap:var(--gap)]', {
              'animate-marquee flex-row': !vertical,
              'animate-marquee-vertical flex-col': vertical,
              'group-hover:[animation-play-state:paused]': pauseOnHover,
              '[animation-direction:reverse]': reverse,
            })}>
            {children}
          </div>
        ))}
    </div>
  )
}
