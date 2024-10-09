'use client'

import Image from 'next/image'
import QRCode from './QRCode'
import Header from './Header'
import { useRouter } from 'next/navigation' // Import from next/navigation
import { useEffect, useState } from 'react'

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

interface KioskSingleProjectProps {
  data: ResearchDataToDisplay[]
  currentId: string
}

function KioskSingleProject({ data, currentId }: KioskSingleProjectProps) {
  const router = useRouter() // Using next/navigation useRouter
  const chosenTimerForPageIteration = 6000 // Interval in milliseconds (6 seconds)

  const [currentData, setCurrentData] = useState<ResearchDataToDisplay | null>(
    data.find((item) => item.id === currentId) || null
  )

  // Update the state to reflect the correct project based on the provided currentId
  useEffect(() => {
    const foundData = data.find((item) => item.id === currentId)
    if (foundData) {
      setCurrentData(foundData)
    } else if (data.length > 0) {
      setCurrentData(data[0])
      // Update the URL to the first item if currentId is invalid
      router.replace(`/kiosk/${data[0].id}`)
    }
  }, [currentId, data, router])

  // Automatically navigate to the next project after the interval
  useEffect(() => {
    if (data.length > 0) {
      const interval = setInterval(() => {
        const currentIndex = data.findIndex((item) => item.id === currentId)

        if (currentIndex !== -1) {
          const nextIndex = (currentIndex + 1) % data.length

          // Update the URL to the next project without a full page refresh
          router.push(`/kiosk/${data[nextIndex].id}`)

          // Update the state to reflect the next data
          setCurrentData(data[nextIndex])
        }
      }, chosenTimerForPageIteration)

      // Cleanup interval on unmount
      return () => clearInterval(interval)
    }
  }, [currentId, data, router])

  if (!currentData) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header />
      <div className='flex min-h-screen min-w-[700px] flex-col items-center justify-center bg-gray-100 p-4'>
        <div className='flex min-h-[500px] w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-white p-4 shadow-lg'>
          <div className='clearfix flex flex-1'>
            <div className='mr-4'>
              <Image
                src={currentData.screenshots[0]}
                alt='Screenshot'
                width={300}
                height={200}
                className='h-[200px] w-[300px] rounded-lg object-contain shadow-md'
              />
              <div className='scale-75'>
                <QRCode IdForURL={currentData.id} />
              </div>
            </div>
            <div className='flex-1 overflow-hidden'>
              <h1 className='mb-2 truncate text-2xl font-bold text-gray-800'>
                {currentData.title}
              </h1>
              <p className='mb-4 text-sm text-gray-600'>
                {currentData.description}
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

export default KioskSingleProject
