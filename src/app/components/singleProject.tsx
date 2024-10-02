'use client'
import { useState } from 'react'
import Image from 'next/image'

interface SingleProjectProps {
  researchType: string
  title: string
  description: string
  tags: string[]
  screenshots: string[]
  date: string
  id: string
}

function SingleProject({
  researchType,
  title,
  description,
  tags,
  screenshots,
  date,
  id,
}: SingleProjectProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? screenshots.length - 1 : prevIndex - 1
    )
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === screenshots.length - 1 ? 0 : prevIndex + 1
    )
  }

  return (
    <div className='mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md'>
      {screenshots.length > 0 && (
        <div className='relative mb-6'>
          <Image
            src={screenshots[currentImageIndex]}
            alt={`Project Screenshot ${currentImageIndex + 1}`}
            width={800}
            height={400}
            className='h-64 w-full rounded-lg object-contain shadow-lg'
          />
          <button
            onClick={handlePrevImage}
            className='absolute left-0 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-800 px-3 py-1 text-white hover:bg-gray-600'
          >
            ← Prev
          </button>
          <button
            onClick={handleNextImage}
            className='absolute right-0 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-800 px-3 py-1 text-white hover:bg-gray-600'
          >
            Next →
          </button>
        </div>
      )}

      <div className='space-y-4'>
        <h1 className='text-3xl font-bold text-gray-900'>
          Project Title: {title}
        </h1>
        <p className='text-lg text-gray-700'>{description}</p>
        <div className='flex items-center justify-between text-sm text-gray-500'>
          <span className='italic'>Research Type: {researchType}</span>
          <span>{date}</span>
        </div>
        <ul className='flex flex-wrap gap-2'>
          {tags.map((tag, index) => (
            <li
              key={index}
              className='rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800'
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SingleProject
