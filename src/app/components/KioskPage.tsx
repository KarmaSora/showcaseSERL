'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === ResearchDataToDisplay.length - 1 ? 0 : prevIndex + 1
      )
    }, 6000)

    return () => clearInterval(interval)
  }, [ResearchDataToDisplay])

  const currentData = ResearchDataToDisplay[currentIndex]

  return (
    <>
      <Header />
      <div className='flex min-h-[500px] min-h-screen min-w-[700px] flex-col items-center justify-center bg-gray-100 p-10'>
        <div className='min-h-[500px] w-full max-w-4xl overflow-hidden rounded-lg bg-white p-6 shadow-lg'>
          <div className='clearfix'>
            {/* Floating Image on the left */}
            <div className='float-left mr-4'>
              <Image
                src={currentData.screenshots[0]}
                alt='Screenshot'
                width={300}
                height={200}
                className='rounded-lg object-contain shadow-md'
              />
            </div>

            {/* Description Text */}

            <div className='overflow-hidden'>
              <h1 className='mb-2 text-2xl font-bold text-gray-800'>
                {currentData.title}
              </h1>
              <p className='mb-4 text-sm text-gray-600'>
                {currentData.description}
              </p>
            </div>

            <div className='flex items-center justify-between'>
              <p className='text-sm text-gray-600'>
                <strong>ID:</strong> {currentData.id}
              </p>
              <p className='text-sm text-gray-600'>
                <strong>Date:</strong>{' '}
                {new Date(currentData.date).toLocaleDateString()}
              </p>
            </div>

            <div className='mt-4'>
              <h2 className='text-lg font-semibold text-gray-700'>Tags</h2>
              <ul className='mt-2 flex flex-wrap space-x-2'>
                {currentData.tags.map((tag, index) => (
                  <li
                    key={index}
                    className='rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800'
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className='mt-4 text-right'>
              {/* Link to the research URL */}
              {currentData.researchURL == '' ? (
                <h1 className='font-semibold text-red-600 hover:text-blue-800'>
                  no link provided
                </h1>
              ) : (
                <a
                  href={currentData.researchURL}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-semibold text-blue-600 hover:text-blue-800'
                >
                  currentData.researchURL????
                </a>
              )}

              <a
                href={`/card/${currentData.id}`}
                target='_blank'
                rel='noopener noreferrer'
                className='font-semibold text-blue-600 hover:text-blue-800'
              >
                /card/${currentData.id}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default KioskPage
