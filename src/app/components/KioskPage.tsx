'use client' // Ensure this is a client component
import Image from 'next/image'
import { useState, useEffect } from 'react'
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
function kioskPage({
  ResearchDataToDisplay,
}: {
  ResearchDataToDisplay: ResearchDataToDisplay[]
}) {
  useEffect(() => {
    console.log(ResearchDataToDisplay)
  })
  const [currentIndex, setCurrentIndex] = useState(0)

  // Use an effect to change the index at a set interval (e.g., every 60 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === ResearchDataToDisplay.length - 1 ? 0 : prevIndex + 1
      )
    }, 6000) // 6 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(interval)
  }, [ResearchDataToDisplay])

  const currentData = ResearchDataToDisplay[currentIndex]

  return (
    <>
      <div className='mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md'>
        <h1 className='card-description'>hehehe</h1>
        <h1 className='card-description'> {currentData.title}</h1>
        <Image
          src={currentData.screenshots[0]}
          alt={'first shot'}
          width={800}
          height={400}
          className='h-64 w-full rounded-lg object-contain shadow-lg'
        />
        {currentData.id}
      </div>
    </>
  )
}

export default kioskPage
