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
  const timeBetweenImageIteration = 3000 // Interval for images in milliseconds (3 seconds)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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

  // Reset currentImageIndex when currentIndex changes
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [currentIndex])

  // Automatically switch to the next image for the current project
  useEffect(() => {
    if (currentIndex === -1) return
    const screenshotsLength = data[currentIndex].screenshots.length

    if (screenshotsLength <= 1) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % screenshotsLength)
    }, timeBetweenImageIteration)

    return () => clearInterval(interval)
  }, [currentIndex, data, timeBetweenImageIteration])

  const currentData = data[currentIndex]

  // Handle loading state
  const [loadingBool, setLoadingBoolState] = useState(true)

  useEffect(() => {
    if (data && data.length > 0) {
      setLoadingBoolState(false)
    }
  }, [data])

  if (loadingBool || !currentData) {
    return (
      <>
        <h2>Loading...</h2>
        <div className='flex min-h-screen items-center justify-center'>
          <div className='h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
        </div>
      </>
    )
  }

  // Calculate imageSrc safely

  // Truncate description
  const maxCharLength = 1000
  const truncateDescription = (description: string) => {
    return description.length > maxCharLength
      ? description.substring(0, maxCharLength) + '...'
      : description
  }

  // Handlers for navigation
  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + data.length) % data.length
    setCurrentIndex(prevIndex)
    router.push(`/kiosk/${data[prevIndex].id}`)
  }

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % data.length
    setCurrentIndex(nextIndex)
    router.push(`/kiosk/${data[nextIndex].id}`)
  }

  const imageSrc =
    currentData.screenshots.length > 0 &&
    currentData.screenshots[currentImageIndex] &&
    currentData.screenshots[currentImageIndex].trim() !== ''
      ? currentData.screenshots[currentImageIndex]
      : 'data:image/jpeg;base64,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'

  return (
    <>
      {/* Header wrapped in a container for hover effect */}
      <div
        className='relative'
        // The relative positioning is necessary for absolute positioning inside
      >
        <div
          className='absolute left-0 top-0 w-full'
          // Container to position the header absolutely
        >
          <div
            className='opacity-0 transition-opacity duration-300 hover:opacity-100'
            // Hide the header by default and show on hover
          >
            <Header />
          </div>
        </div>
      </div>

      <div className='flex min-h-screen min-w-[700px] flex-col items-center justify-center bg-gray-100 p-4'>
        <div
          className='relative flex min-h-[500px] w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-white p-4 shadow-lg'
          // Container to handle hover effect for navigation controls
        >
          {/* Navigation Controls */}
          <div
            className='absolute inset-0 flex items-center justify-between opacity-0 transition-opacity duration-300 hover:opacity-100'
            // The controls are hidden by default and appear on hover
          >
            <button
              onClick={handlePrevious}
              className='ml-2 rounded-full bg-gray-800 bg-opacity-50 p-2 text-white hover:bg-opacity-75'
            >
              &#8592; {/* Left Arrow */}
            </button>
            <button
              onClick={handleNext}
              className='mr-2 rounded-full bg-gray-800 bg-opacity-50 p-2 text-white hover:bg-opacity-75'
            >
              &#8594; {/* Right Arrow */}
            </button>
          </div>

          <div className='clearfix flex flex-1'>
            <div className='mr-4'>
              <Image
                src={imageSrc}
                alt='Screenshot'
                priority={true}
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
                {truncateDescription(currentData.description)}
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
