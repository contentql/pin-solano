'use client'

import { useResponsive } from '../hooks/useResponsive'
import { Blog } from '@payload-types'
import { motion, useScroll, useTransform } from 'framer-motion'
import React, { useRef } from 'react'

import BlogThreeDCard from './BlogThreeDCard'

interface HorizontalScrollCarousel {
  blogsData: Blog[]
}

export const HorizontalScrollCarousel: React.FC<HorizontalScrollCarousel> = ({
  blogsData,
}) => {
  const { isMobile, isTablet } = useResponsive()
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['1%', isMobile ? '-85%' : isTablet ? '-70%' : '50%'],
  )

  return (
    <section
      ref={targetRef}
      className='relative mx-auto -mt-20 h-[120vh] w-full max-w-7xl'>
      <div className='sticky top-0 flex h-screen items-center overflow-hidden'>
        <motion.div style={{ x }} className='flex gap-4'>
          {blogsData?.map((card, index) => {
            return <BlogThreeDCard key={index} item={card} />
          })}
        </motion.div>
      </div>
    </section>
  )
}
