import path from 'path'
import fs from 'fs/promises'
import Card from '../../components/Card'
import { notFound } from 'next/navigation'
import Naviagtion from '@/app/components/Navigtion'

interface CardData {
  id: string
  cardTitle: string
  cardDescription: string
  cardTags: string[]
  cardImageURL: string
  cardResearchType: string
  date: string
}

// Fetch all card data
async function getAllCards(): Promise<CardData[]> {
  const filePath = path.join(process.cwd(), 'data', 'research.json')
  const jsonData = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(jsonData)
}

// Fetch a single card by its ID
async function getCardById(id: string): Promise<CardData | null> {
  const data = await getAllCards()
  const card = data.find((card) => card.id === id)
  return card || null
}

// Required for static exporting
export async function generateStaticParams() {
  const cards = await getAllCards()

  // Generate static paths based on card IDs
  return cards.map((card) => ({
    id: card.id,
  }))
}

export default async function SingleCardPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  // Fetch the card data by id
  const card = await getCardById(id)

  // If card is not found, show the 404 page
  if (!card) {
    notFound()
  }

  // Render the card component with the fetched data
  return (
    <>
      <Naviagtion />

      <Card
        id={card.id}
        cardTitle={card.cardTitle}
        cardDescription={card.cardDescription}
        cardTags={card.cardTags}
        cardImageURL={card.cardImageURL}
        cardResearchType={card.cardResearchType}
        date={card.date} // Pass the date to the Card component
      />
    </>
  )
}
