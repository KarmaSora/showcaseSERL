'use client' // Client component

import React from 'react'
import { useState, useEffect } from 'react'
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
    if (selectedType === 'All' || '') return true // Show all cards if (All) is selected
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
        <h2>Loading...</h2>{' '}
        <div className='flex min-h-screen items-center justify-center'>
          <div className='h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
        </div>{' '}
      </>
    ) // Replace with a spinner or loading animation
  }

  return (
    <>
      {/* Dropdown for filtering by cardResearchType */}
      <section className='typeChangeSelection'>
        <h1 className='readable'>types</h1>
        <select value={selectedType} onChange={handleTypeChange}>
          <option value='All'>All</option>
          <option value='Student'>Student</option>
          <option value='Researcher'>Researcher</option>
          <option value='PhD'>PhD</option>
        </select>
      </section>

      {/* Dropdown to select sort order */}
      <section className='sortOrderSelection'>
        <h1 className='readable'>time order</h1>

        <select
          id='sortOrder'
          value={sortOrder}
          onChange={handleSortOrderChange}
        >
          <option value='desc'>Descending</option>
          <option value='asc'>Ascending</option>
        </select>
      </section>
      {/* Input field to type the filter text (title, description, tags) */}
      <input
        className='inputFilter'
        type='text'
        placeholder='Filter by title, description, or tags'
        value={inputText}
        onChange={handleInputChange}
      />
      <button>Filter</button>

      {/* Button to trigger the filtering */}
      {/* Display final filtered research cards */}
      {/* Display filtered data length, aka, card count */}
      <h2>Number of filtered data found: {finalFilteredCards.length}</h2>
      <div>
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
          <p>No results found</p>
        )}
      </div>
    </>
  )
}

export default CardDisplay
