'use client' // Client component

import React, { useState, useEffect } from 'react'
import Card from './Card'

interface ResearchData {
  id: string
  researchType: string
  title: string
  description: string
  tags: string[]
  screenshots: string[]
  date: string
}

const CardDisplay = ({ researchCards }: { researchCards: ResearchData[] }) => {
  const [inputText, setInputText] = useState('') // Track input text for filtering by title/description/tags
  const [selectedType, setSelectedType] = useState('All') // Track the selected cardResearchType
  const [loadingBool, setLoadingBoolState] = useState(true)
  const [sortOrder, setSortOrder] = useState('desc') // Track sorting order (asc or desc)

  // Handle user input for text filtering (title, description, tags)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value.toLowerCase()) // Convert input text to lowercase for case-insensitive filtering
  }

  // Handle changes in the cardResearchType filter
  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value) // Store the selected cardResearchType
  }

  const handleSortOrderChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortOrder(event.target.value) // Store the selected sort order
  }

  // First filter: Filter the Research cards based on cardResearchType (case-insensitive)
  const filteredByType = researchCards.filter((card) => {
    if (selectedType === 'All' || selectedType === '') return true // Show all cards if 'All' is selected
    return card.researchType.toLowerCase() === selectedType.toLowerCase()
  })

  // Second filter: Apply the text filter (title, description, tags) to the already filtered data by type
  const finalFilteredCards = filteredByType
    .filter((card) => {
      const matchesTitleOrDescription =
        card.title.toLowerCase().includes(inputText) ||
        card.description.toLowerCase().includes(inputText)

      const matchesTags = card.tags.some((tag) =>
        tag.toLowerCase().includes(inputText)
      )

      return matchesTitleOrDescription || matchesTags
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.date).getTime() - new Date(b.date).getTime() // Ascending order
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime() // Descending order
      }
    })

  useEffect(() => {
    if (researchCards && researchCards.length > 0) {
      setLoadingBoolState(false)
    }
  }, [researchCards])

  if (loadingBool) {
    return (
      <>
        <h2 className='text-center text-2xl font-semibold text-white'>
          Loading...
        </h2>
        <div className='flex min-h-screen items-center justify-center'>
          <div className='h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
        </div>
      </>
    )
  }

  return (
    <>
      {/* Filters */}
      <div className='mb-6 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0'>
        {/* Dropdown for filtering by researchType */}
        <div className='flex items-center space-x-2'>
          <label htmlFor='typeFilter' className='font-semibold text-gray-800'>
            Filter by Type:
          </label>
          <select
            id='typeFilter'
            value={selectedType}
            onChange={handleTypeChange}
            className='rounded border border-gray-600 bg-gray-700 p-2 text-white'
          >
            <option value='All'>All</option>
            <option value='Student'>Student</option>
            <option value='Researcher'>Researcher</option>
            <option value='PhD'>PhD</option>
          </select>
        </div>

        {/* Dropdown to select sort order */}
        <div className='flex items-center space-x-2'>
          <label htmlFor='sortOrder' className='font-semibold text-gray-800'>
            Sort by Date:
          </label>
          <select
            id='sortOrder'
            value={sortOrder}
            onChange={handleSortOrderChange}
            className='rounded border border-gray-600 bg-gray-700 p-2 text-white'
          >
            <option value='desc'>Newest First</option>
            <option value='asc'>Oldest First</option>
          </select>
        </div>

        {/* Input field for text filtering */}
        <div className='flex w-full items-center space-x-2 md:w-auto'>
          <input
            className='w-full rounded border border-gray-600 bg-gray-700 p-2 text-white placeholder-gray-400 md:w-64'
            type='text'
            placeholder='Search by title, description, or tags'
            value={inputText}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Display filtered data length */}
      <h2 className='mb-4 text-lg font-semibold text-gray-800'>
        Number of results: {finalFilteredCards.length}
      </h2>

      {/* Display final filtered research cards */}
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {finalFilteredCards.length > 0 ? (
          finalFilteredCards.map((card, index) => (
            <Card
              key={index}
              researchType={card.researchType}
              title={card.title}
              description={card.description}
              tags={card.tags}
              screenshots={card.screenshots}
              date={card.date}
              id={card.id}
            />
          ))
        ) : (
          <p className='text-center text-gray-500'>No results found</p>
        )}
      </div>
    </>
  )
}

export default CardDisplay
