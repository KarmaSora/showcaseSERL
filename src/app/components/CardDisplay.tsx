'use client' // Client component

import React from 'react'
import { useState } from 'react'
import Card from './Card'

interface ResearchData {
  cardResearchType: string
  cardTitle: string
  cardDescription: string
  cardTags: string[]
  cardImageURL: string
}

const CardDisplay = ({ researchCards }: { researchCards: ResearchData[] }) => {
  const [inputText, setInputText] = useState('') // Track input text for filtering by title/description/tags
  const [selectedType, setSelectedType] = useState('All') // Track the selected cardResearchType

  // Handle user input for text filtering (title, description, tags)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value.toLowerCase()) // Convert input text to lowercase for case-insensitive filtering
  }

  // Handle changes in the cardResearchType filter
  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value) // Store the selected cardResearchType
  }

  // First filter: Filter the research cards based on cardResearchType (case-insensitive)
  const filteredByType = researchCards.filter((card) => {
    if (selectedType === 'All' || '') return true // Show all cards if "All" is selected
    return card.cardResearchType.toLowerCase() === selectedType.toLowerCase() // Case-insensitive comparison for researchType
  })

  // Second filter: Apply the text filter (title, description, tags) to the already filtered data by type
  const finalFilteredCards = filteredByType.filter((card) => {
    const matchesTitleOrDescription =
      card.cardTitle.toLowerCase().includes(inputText) ||
      card.cardDescription.toLowerCase().includes(inputText)

    const matchesTags = card.cardTags.some((tag) =>
      tag.toLowerCase().includes(inputText)
    )

    return matchesTitleOrDescription || matchesTags // Return true if matches title, description, or any tag
  })

  return (
    <>
      {/* Dropdown for filtering by cardResearchType */}
      <section className='typeChangeSelection'>
        <select value={selectedType} onChange={handleTypeChange}>
          <option value='All'>All</option>
          <option value='student'>Student</option>
          <option value='teacher'>Teacher</option>
        </select>
      </section>
      {/* Input field to type the filter text (title, description, tags) */}
      <input
        type='text'
        placeholder='Filter by title, description, or tags'
        value={inputText}
        onChange={handleInputChange}
      />
      {/* Button to trigger the filtering */}
      <button>Filter</button>
      {/* Display final filtered research cards */}
      {/* Display filtered data length, aka, card count */}
      <h2>Number of filtered data found: {finalFilteredCards.length}</h2>
      <div>
        {finalFilteredCards.length > 0 ? (
          finalFilteredCards.map((card, index) => (
            <Card
              key={index}
              cardResearchType={card.cardResearchType}
              cardTitle={card.cardTitle}
              cardDescription={card.cardDescription}
              cardTags={card.cardTags}
              cardImageURL={card.cardImageURL}
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
