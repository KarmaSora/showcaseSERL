import path from 'path'
import fs from 'fs/promises'
import { notFound } from 'next/navigation'
import Naviagtion from '@/app/components/Navigtion'
import SingleProject from '../../components/singleProject'

interface CardData {
  researchType: string
  title: string
  description: string
  tags: string[]
  screenshots: string[]
  date: string
  id: string
  researchURL: string
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
      <SingleProject
        id={card.id}
        title={card.title}
        description={card.description}
        tags={card.tags}
        screenshots={card.screenshots}
        researchType={card.researchType}
        date={card.date}
        researchURL={card.researchURL}
      />
    </>
  )
}
