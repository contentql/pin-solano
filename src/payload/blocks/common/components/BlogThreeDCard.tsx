'use client'

import Link from '@node_modules/next/link'
import { Blog, Media } from '@payload-types'
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/common/Avatar'
import { cn } from '@/utils/cn'

const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined)

interface BlogThreeDCardProp {
  item: Blog
}

interface CardContainerProps {
  children?: React.ReactNode
  className?: string
  containerClassName?: string
}

interface CardBodyProps {
  children: React.ReactNode
  className?: string
}

export const CardContainer: React.FC<CardContainerProps> = ({
  children,
  className,
  containerClassName,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMouseEntered, setIsMouseEntered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect()
    const x = (e.clientX - left - width / 2) / 25
    const y = (e.clientY - top - height / 2) / 25
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseEntered(true)
    if (!containerRef.current) return
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    setIsMouseEntered(false)
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`
  }
  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn(containerClassName)}
        style={{
          perspective: '1000px',
        }}>
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            'relative flex items-center justify-center transition-all duration-200 ease-linear',
            className,
          )}
          style={{
            transformStyle: 'preserve-3d',
          }}>
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  )
}

export const CardBody: React.FC<CardContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'h-96 w-96 [transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]',
        className,
      )}>
      {children}
    </div>
  )
}

export const CardItem = ({
  as: Tag = 'div',
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: React.ElementType
  children: React.ReactNode
  className?: string
  translateX?: number | string
  translateY?: number | string
  translateZ?: number | string
  rotateX?: number | string
  rotateY?: number | string
  rotateZ?: number | string
  [key: string]: any
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isMouseEntered] = useMouseEnter()

  useEffect(() => {
    const handleAnimations = () => {
      if (!ref.current) return
      if (isMouseEntered) {
        ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
      } else {
        ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`
      }
    }

    handleAnimations()
  }, [
    isMouseEntered,
    translateX,
    translateY,
    translateZ,
    rotateX,
    rotateY,
    rotateZ,
  ])

  return (
    <Tag
      ref={ref}
      className={cn('w-fit transition duration-200 ease-linear', className)}
      {...rest}>
      {children}
    </Tag>
  )
}

// Create a hook to use the context
export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext)
  if (context === undefined) {
    throw new Error('useMouseEnter must be used within a MouseEnterProvider')
  }
  return context
}

const BlogThreeDCard: React.FC<BlogThreeDCardProp> = ({ item }) => {
  return (
    <Link href={`/blog/${item?.slug}`}>
      <CardContainer className='inter-var'>
        <CardBody className='group/card relative h-auto w-full min-w-[25rem]  rounded-xl border border-black/[0.1] bg-gray-50 p-6 dark:border-white/[0.2] dark:bg-transparent dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] '>
          <CardItem translateZ='100' className='mb-6 w-full'>
            <Avatar className='h-80 w-full rounded-xl object-cover group-hover/card:shadow-xl'>
              <AvatarImage
                alt='thumbnail'
                src={(item?.blogImage as Media)?.url || ''}
              />
              <AvatarFallback />
            </Avatar>
          </CardItem>
          <CardItem
            translateZ='50'
            className='line-clamp-1 text-xl font-bold text-white dark:text-white'>
            {item?.title}
          </CardItem>
          <CardItem
            as='p'
            translateZ='60'
            className='dark:text-neutral-300 mt-2 line-clamp-3 w-full text-sm text-[#d4d4d4]'>
            {item?.description}
          </CardItem>
        </CardBody>
      </CardContainer>
    </Link>
  )
}
export default BlogThreeDCard
