'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import QRCode from './QRCode'
import Header from './Header'

interface ResearchDataToDisplay {
  id: string
  date: string
  researchType: string
  title: string
  description: string
  tags: string[]
  screenshots: string[]
  researchURL: string
}

function KioskPage({
  ResearchDataToDisplay,
}: {
  ResearchDataToDisplay: ResearchDataToDisplay[]
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isIterating, setIsIterating] = useState(true)

  const pageIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const chosenTimerForPageIteration = 6000

  // Manual Timer Control using useRef
  const startPageIteration = () => {
    if (!pageIntervalRef.current) {
      pageIntervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === ResearchDataToDisplay.length - 1 ? 0 : prevIndex + 1
        )
      }, chosenTimerForPageIteration)
    }
    setIsIterating(true)
  }

  const stopPageIteration = () => {
    if (pageIntervalRef.current) {
      clearInterval(pageIntervalRef.current)
      pageIntervalRef.current = null
    }
    setIsIterating(false)
  }

  // Automatically clear interval on unmount
  useEffect(() => {
    if (isIterating) {
      startPageIteration()
    }
    return () => stopPageIteration()
  }, [isIterating])

  const currentData = ResearchDataToDisplay[currentIndex]

  // Handle Image Iteration
  useEffect(() => {
    let imageInterval: NodeJS.Timeout
    if (isIterating && currentData.screenshots.length > 0) {
      imageInterval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === currentData.screenshots.length - 1 ? 0 : prevIndex + 1
        )
      }, 3000)
    }

    return () => clearInterval(imageInterval)
  }, [isIterating, currentIndex, currentData.screenshots.length])

  return (
    <>
      <Header />
      <div className='flex min-h-screen min-w-[700px] flex-col items-center justify-center bg-gray-100 p-4'>
        <div className='flex min-h-[500px] w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-white p-4 shadow-lg'>
          <div className='clearfix flex flex-1'>
            {/* Floating Image on the left */}
            <div className='mr-4'>
              <Image
                src={currentData.screenshots[currentImageIndex]}
                priority={true}
                alt='Screenshot'
                width={300}
                height={200}
                className='h-[200px] w-[300px] rounded-lg object-contain shadow-md'
              />
              {/* QR Code Underneath the Image */}
              <div className='scale-75'>
                <QRCode IdForURL={currentData.id} />
              </div>
              {isIterating ? (
                <button
                  onClick={stopPageIteration}
                  className='rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-700'
                >
                  Stop Iteration
                </button>
              ) : (
                <button
                  onClick={startPageIteration}
                  className='rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-700'
                >
                  Start Iteration
                </button>
              )}
            </div>

            {/* Description Text */}
            <div className='flex-1 overflow-hidden'>
              <h1 className='mb-2 truncate text-2xl font-bold text-gray-800'>
                {currentData.title}
              </h1>
              <p className='mb-4 text-sm text-gray-600'>
                {currentData.description.length > 1000
                  ? currentData.description.substring(0, 1000) + '...'
                  : currentData.description}
              </p>
            </div>
          </div>

          <div className='mt-4 flex w-full items-center justify-between border-t pt-4'>
            <div className='text-sm text-gray-600'>
              <strong>Date:</strong>{' '}
              {new Date(currentData.date).toLocaleDateString()}
            </div>
            <div className='ml-4 flex flex-1 space-x-2 overflow-x-auto p-4'>
              {currentData.tags.map((tag, index) => (
                <span
                  key={index}
                  className='rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800'
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default KioskPage
