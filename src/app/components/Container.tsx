'use client'

import React, { useState, useEffect, useCallback } from 'react'
import crypto from 'crypto'
import CardDisplay from './CardDisplay'

const secondsToRefresh = 6
const datarefresh = secondsToRefresh * 1000 // 60 seconds
interface ResearchData {
  id: string
  researchType: string
  title: string
  description: string
  tags: string[]
  screenshots: string[]
  date: string
  researchURL: string
}

const Container = () => {
  const [researchCards, setResearchCards] = useState<ResearchData[]>([])

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/research.json')
      let data = await response.json()

      data = data.map((item: ResearchData) => ({
        id: item.id || generateId(item),
        date: item.date || 'Unknown Date',
        researchType: item.researchType || 'Unknown Type',
        title: item.title || 'Untitled',
        description: item.description || 'No description available.',
        tags: item.tags || ['undef'],
        screenshots: item.screenshots || [
          'data:image/jpeg;base64,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',
        ],
        researchURL: item.researchURL || '#',
      }))

      setResearchCards(data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }, []) // <-- useCallback dependency

  function generateId(item: ResearchData): string {
    const dataToHash = `${item.title}-${item.date}-${item.researchType}`
    const hash = crypto.createHash('sha256').update(dataToHash).digest('hex')
    return hash.substring(0, 16)
  }

  useEffect(() => {
    fetchData() // Fetch data on mount
    const interval = setInterval(fetchData, datarefresh) // Fetch data every 60 seconds

    return () => clearInterval(interval) // Cleanup interval on unmount
  }, [fetchData]) // fetchData is now memoized

  return (
    <div>
      <CardDisplay researchCards={researchCards} />
    </div>
  )
}

export default Container
