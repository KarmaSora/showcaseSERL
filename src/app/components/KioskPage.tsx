'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
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

  const chosenTimerForPageItteration = 6000

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === ResearchDataToDisplay.length - 1 ? 0 : prevIndex + 1
      )
    }, chosenTimerForPageItteration)

    return () => clearInterval(interval)
  }, [ResearchDataToDisplay])

  const currentData = ResearchDataToDisplay[currentIndex]

  const maxCharLength = 1000
  const truncateDescription = (description: string) => {
    return description.length > maxCharLength
      ? description.substring(0, maxCharLength) + '...'
      : description
  }

  return (
    <>
      <Header />
      <div className='flex min-h-screen min-w-[700px] flex-col items-center justify-center bg-gray-100 p-4'>
        <div className='flex min-h-[500px] w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-white p-4 shadow-lg'>
          <div className='clearfix flex flex-1'>
            {/* Floating Image on the left */}
            <div className='mr-4'>
              <Image
                src={currentData.screenshots[0]}
                alt='Screenshot'
                width={300}
                height={200}
                className='h-[200px] w-[300px] rounded-lg object-contain shadow-md'
              />
              {/* QR Code Underneath the Image */}
              <div className='  scale-75 '>
                <QRCode IdForURL={currentData.id} />
              </div>
            </div>

            {/* Description Text */}
            <div className='flex-1 overflow-hidden'>
              <h1 className='mb-2 truncate text-2xl font-bold text-gray-800'>
                {currentData.title}
              </h1>
              <p className='mb-4 text-sm text-gray-600'>
                {truncateDescription(currentData.description)}
              </p>
            </div>
          </div>

          <div className='mt-4 flex w-full items-center justify-between border-t pt-4'>
            <div className='text-sm text-gray-600'>
              <strong>Date:</strong>
              {new Date(currentData.date).toLocaleDateString()}
            </div>
            <div className='ml-4 flex flex-1 space-x-2 overflow-x-auto p-4 '>
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
