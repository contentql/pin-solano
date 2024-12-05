'use client'

import { Blog, Media, Tag, User } from '@payload-types'
import Image from 'next/image'
import { useRef } from 'react'
import { FaCheck } from 'react-icons/fa'
import { IoCalendarOutline } from 'react-icons/io5'

import { cn } from '@/utils/cn'
import { formatDate } from '@/utils/dateFormatter'
import { getHTML } from '@/utils/slateToHTML'

interface AnimatedBlogCardProp {
  blogData: Blog
  index: number
}

const AnimatedBlogCard: React.FC<AnimatedBlogCardProp> = ({
  blogData,
  index,
}) => {
  const readingTime = require('reading-time')

  return (
    <CardAnimation>
      <div
        className={`flex h-full w-full flex-col gap-2 ${blogData?.selectBlogSize === '2' && index % 2 == 0 ? 'md:flex-row-reverse' : ''} ${
          blogData?.selectBlogSize === '2'
            ? 'md:flex-row md:justify-between'
            : 'flex-col'
        } space-y-2 p-4 text-white`}>
        <Image
          width={100}
          height={100}
          src={(blogData?.blogImage as Media)?.url || ''}
          alt='blog'
          className={`w-full rounded-xl object-cover ${blogData?.selectBlogSize === '2' ? ' md:h-[100%] md:w-[46%]' : 'h-[60%]'}`}
        />
        <div className='flex flex-col justify-between gap-y-2'>
          <h1
            className={`${blogData?.selectBlogSize === '2' ? 'line-clamp-2' : 'line-clamp-1'} text-2xl font-bold`}>
            {blogData?.title}
          </h1>
          <p
            className={`${blogData?.selectBlogSize === '2' ? 'line-clamp-4' : 'line-clamp-2'}`}>
            {blogData?.description}
          </p>
          <div
            className={`hidden ${blogData?.selectBlogSize === '2' && 'md:block'}`}>
            <div className='mb-2 mr-4 flex items-center gap-x-2'>
              <IoCalendarOutline size={20} />
              <p>{formatDate(blogData?.createdAt)}</p>
            </div>

            <div className='flex items-center gap-x-2'>
              <FaCheck size={24} />
              {readingTime(getHTML(blogData?.content))?.text}
            </div>
          </div>
          <div
            className={`hidden flex-wrap gap-x-4 ${blogData?.selectBlogSize === '2' && 'md:flex'}`}>
            {blogData?.author?.map((author, index) => (
              <div key={index} className='flex items-center gap-x-2'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={((author?.value as User)?.imageUrl as Media)?.url!}
                  alt='author'
                  className='h-8 w-8 rounded-full'
                  // width={8}
                  // height={8}
                />
                <p className='capitalize'>
                  {(author?.value as User)?.displayName}
                </p>
              </div>
            ))}
          </div>
          <div className='flex flex-wrap gap-2'>
            {blogData?.tags?.map((tag, index) => (
              <p
                className={`rounded-md  bg-gray-800 px-2 py-1 font-bold capitalize`}
                key={index}>
                {(tag?.value as Tag)?.title}
              </p>
            ))}
          </div>
        </div>
      </div>
    </CardAnimation>
  )
}
export default AnimatedBlogCard

const CardAnimation = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const isPointerInside = useRef(false)
  const refElement = useRef<HTMLDivElement>(null)
  const state = useRef({
    glare: {
      x: 50,
      y: 50,
    },
    background: {
      x: 50,
      y: 50,
    },
    rotate: {
      x: 0,
      y: 0,
    },
  })
  const containerStyle = {
    '--m-x': '50%',
    '--m-y': '50%',
    '--r-x': '0deg',
    '--r-y': '0deg',
    '--bg-x': '50%',
    '--bg-y': '50%',
    '--duration': '500ms',
    '--foil-size': '100%',
    '--opacity': '0',
    '--radius': '10px',
    '--easing': 'ease',
    '--transition': 'var(--duration) var(--easing)',
  } as any

  const updateStyles = () => {
    if (refElement.current) {
      const { background, rotate, glare } = state.current
      refElement.current?.style.setProperty('--m-x', `${glare.x}%`)
      refElement.current?.style.setProperty('--m-y', `${glare.y}%`)
      refElement.current?.style.setProperty('--r-x', `${rotate.x}deg`)
      refElement.current?.style.setProperty('--r-y', `${rotate.y}deg`)
      refElement.current?.style.setProperty('--bg-x', `${background.x}%`)
      refElement.current?.style.setProperty('--bg-y', `${background.y}%`)
    }
  }
  return (
    <div
      style={{ ...containerStyle, height: '400px', width: '100%' }}
      className='duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] relative isolate h-[400px] w-full cursor-pointer transition-transform will-change-transform [aspect-ratio:17/21] [contain:layout_style] [perspective:600px]'
      ref={refElement}
      onPointerMove={event => {
        const rotateFactor = 0.4
        const rect = event.currentTarget.getBoundingClientRect()
        const position = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        }
        const percentage = {
          x: (100 / rect.width) * position.x,
          y: (100 / rect.height) * position.y,
        }
        const delta = {
          x: percentage.x - 50,
          y: percentage.y - 50,
        }

        const { background, rotate, glare } = state.current
        background.x = 50 + percentage.x / 4 - 12.5
        background.y = 50 + percentage.y / 3 - 16.67
        rotate.x = -(delta.x / 3.5)
        rotate.y = delta.y / 2
        rotate.x *= rotateFactor
        rotate.y *= rotateFactor
        glare.x = percentage.x
        glare.y = percentage.y

        updateStyles()
      }}
      onPointerEnter={() => {
        isPointerInside.current = true
        if (refElement.current) {
          setTimeout(() => {
            if (isPointerInside.current) {
              refElement.current?.style.setProperty('--duration', '0s')
            }
          }, 300)
        }
      }}
      onPointerLeave={() => {
        isPointerInside.current = false
        if (refElement.current) {
          refElement.current.style.removeProperty('--duration')
          refElement.current?.style.setProperty('--r-x', `0deg`)
          refElement.current?.style.setProperty('--r-y', `0deg`)
        }
      }}>
      <div className='duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] grid h-full origin-center overflow-hidden rounded-[var(--radius)] transition-transform will-change-transform [transform:rotateY(var(--r-x))_rotateX(var(--r-y))] hover:filter-none hover:[--duration:200ms] hover:[--easing:linear] hover:[--opacity:0.6]'>
        <div className='grid h-full w-full mix-blend-soft-light [clip-path:inset(0_0_0_0_round_var(--radius))] [grid-area:1/1]'>
          <div className={cn('h-full w-full bg-slate-950', className)}>
            {children}
          </div>
        </div>
        <div className='transition-background duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] will-change-background grid h-full w-full opacity-[var(--opacity)] mix-blend-soft-light transition-opacity [background:radial-gradient(farthest-corner_circle_at_var(--m-x)_var(--m-y),_rgba(255,255,255,0.8)_10%,_rgba(255,255,255,0.65)_20%,_rgba(255,255,255,0)_90%)] [clip-path:inset(0_0_1px_0_round_var(--radius))] [grid-area:1/1]' />
        <div className="will-change-background after:grid-area-[inherit] after:bg-repeat-[inherit] after:bg-attachment-[inherit] after:bg-origin-[inherit] after:bg-clip-[inherit] relative grid h-full w-full opacity-[var(--opacity)] mix-blend-color-dodge transition-opacity [background-blend-mode:hue_hue_hue_overlay] [background:var(--pattern),_var(--rainbow),_var(--diagonal),_var(--shade)] [clip-path:inset(0_0_1px_0_round_var(--radius))] [grid-area:1/1] after:bg-[inherit] after:mix-blend-exclusion after:content-[''] after:[background-blend-mode:soft-light,_hue,_hard-light] after:[background-position:center,_0%_var(--bg-y),_calc(var(--bg-x)*_-1)_calc(var(--bg-y)*_-1),_var(--bg-x)_var(--bg-y)] after:[background-size:var(--foil-size),_200%_400%,_800%,_200%]" />
      </div>
    </div>
  )
}
