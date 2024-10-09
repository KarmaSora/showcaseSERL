'use client'

import Image from 'next/image'
import QRCode from './QRCode'
import Header from './Header'
import { useRouter } from 'next/navigation'
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
  const router = useRouter()
  const chosenTimerForPageIteration = 6000 // Interval in milliseconds (6 seconds)

  // State to hold the currently displayed research item index
  const [currentIndex, setCurrentIndex] = useState<number>(() =>
    data.findIndex((item) => item.id === currentId)
  )

  // Update the state when the component mounts or when the currentId changes
  useEffect(() => {
    const foundIndex = data.findIndex((item) => item.id === currentId)
    if (foundIndex !== -1) {
      setCurrentIndex(foundIndex)
    } else if (data.length > 0) {
      setCurrentIndex(0)
      // Only push to the URL if the currentId is not found to ensure a valid route
      router.push(`/kiosk/${data[0].id}`)
    }
  }, [currentId, data, router])

  // Automatically switch to the next project after the interval without updating the URL
  useEffect(() => {
    if (data.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length)
      }, chosenTimerForPageIteration)

      // Cleanup interval on component unmount
      return () => clearInterval(interval)
    }
  }, [data, chosenTimerForPageIteration])

  if (currentIndex === -1) {
    return <div>Loading...</div>
  }

  const currentData = data[currentIndex]

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
