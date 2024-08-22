'use client'

import { Blog } from '@payload-types'
import { motion, useMotionValue } from 'framer-motion'
import { useEffect, useState } from 'react'

import BlogThreeDCard from './BlogThreeDCard'

const ONE_SECOND = 1000
const AUTO_DELAY = ONE_SECOND * 10
const DRAG_BUFFER = 50

const SPRING_OPTIONS = {
  type: 'spring',
  mass: 3,
  stiffness: 400,
  damping: 50,
}

interface SwipeCarouselProps {
  blogsData: {
    relationTo: 'blogs'
    value: string | Blog
  }[]
}

export const SwipeCarousel: React.FC<SwipeCarouselProps> = ({ blogsData }) => {
  const [imgIndex, setImgIndex] = useState(0)

  const dragX = useMotionValue(0)

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get()

      if (x === 0) {
        setImgIndex(pv => {
          if (pv === blogsData?.length - 1) {
            return 0
          }
          return pv + 1
        })
      }
    }, AUTO_DELAY)

    return () => clearInterval(intervalRef)
  }, [dragX, blogsData?.length])

  const onDragEnd = () => {
    const x = dragX.get()

    if (x <= -DRAG_BUFFER && imgIndex < blogsData?.length - 1) {
      setImgIndex(pv => pv + 1)
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex(pv => pv - 1)
    }
  }

  return (
    <div className='relative w-full overflow-x-hidden bg-transparent'>
      <motion.div
        drag='x'
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${imgIndex * 100}%`,
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className='flex cursor-grab items-center active:cursor-grabbing'>
        {blogsData.map((blog, idx) => {
          return (
            <motion.div
              key={idx}
              animate={{
                scale: imgIndex === idx ? 0.95 : 0.85,
              }}
              transition={SPRING_OPTIONS}
              className='aspect-video w-full shrink-0'>
              <BlogThreeDCard item={blog?.value as Blog} />
            </motion.div>
          )
        })}
      </motion.div>

      <Dots
        imgIndex={imgIndex}
        setImgIndex={setImgIndex}
        blogsData={
          blogsData as {
            relationTo: 'blogs'
            value: string | Blog
          }[]
        }
      />
    </div>
  )
}

const Dots = ({
  imgIndex,
  setImgIndex,
  blogsData,
}: {
  imgIndex: number
  setImgIndex: Function
  blogsData: {
    relationTo: 'blogs'
    value: string | Blog
  }[]
}) => {
  return (
    <div className='mt-4 flex w-full justify-center gap-2'>
      {blogsData?.map((_, idx) => {
        return (
          <button
            key={idx}
            onClick={() => setImgIndex(idx)}
            className={`h-3 w-3 rounded-full transition-colors ${
              idx === imgIndex ? 'bg-neutral-50' : 'bg-neutral-500'
            }`}
          />
        )
      })}
    </div>
  )
}
