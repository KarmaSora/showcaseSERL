import path from 'path'
import fs from 'fs/promises'
import { notFound } from 'next/navigation'
import Naviagtion from '@/app/components/Navigtion'
import SingleProject from '../../components/singleProject'
import crypto from 'crypto'
interface CardData {
  id: string
  date: string
  researchType: string
  title: string
  description: string
  tags: string[]
  screenshots: string[]
  researchURL: string
}

function generateId(item: CardData): string {
  const dataToHash = `${item.title}-${item.date}-${item.researchType}`
  const hash = crypto.createHash('sha256').update(dataToHash).digest('hex')
  return hash.substring(0, 16)
}

// Fetch all card data with default values
async function getAllCards(): Promise<CardData[]> {
  const filePath = path.join(process.cwd(), 'data', 'research.json')
  const jsonData = await fs.readFile(filePath, 'utf-8')
  let data: CardData[] = JSON.parse(jsonData)

  // Map over the data to set default values
  data = data.map((item) => ({
    id: item.id || generateId(item),
    date: item.date || 'Unknown Date',
    researchType: item.researchType || 'Unknown Type',
    title: item.title || 'Untitled',
    description: item.description || 'No description available.',
    tags: item.tags || [],
    screenshots: item.screenshots || [],
    researchURL: item.researchURL || '#',
  }))

  return data
}

// Fetch a single card by its ID
async function getCardById(id: string): Promise<CardData | null> {
  const data = await getAllCards()
  const card = data.find((card) => card.id === id)
  return card || null
}

export async function generateStaticParams() {
  const cards = await getAllCards()
  return cards.map((card) => ({ id: card.id || generateId(card) }))
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
