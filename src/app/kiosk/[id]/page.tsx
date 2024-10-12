import { promises as fs } from 'fs'
import path from 'path'
import KioskSingleProject from '../../components/KioskSingleProject'
import { notFound } from 'next/navigation'

export const revalidate = 60 // Next.js will regenerate the page every 60 seconds

interface Params {
  params: {
    id: string
  }
}

interface ResearchData {
  id: string
  date: string
  researchType: string
  title: string
  description: string
  tags: string[]
  screenshots: string[]
  researchURL: string
}

async function loadResearchData(): Promise<ResearchData[]> {
  const jsonFilePath = path.join(process.cwd(), 'data', 'research.json')
  const fileContents = await fs.readFile(jsonFilePath, 'utf8')
  let researchData: ResearchData[] = JSON.parse(fileContents)

  // Map over the data to set default values
  researchData = researchData.map((item) => ({
    id: item.id || 'N/A',
    date: item.date || 'Unknown Date',
    researchType: item.researchType || 'Unknown Type',
    title: item.title || 'Untitled',
    description: item.description || 'No description available.',
    tags: item.tags || [],
    screenshots: item.screenshots || [],
    researchURL: item.researchURL || '#',
  }))

  return researchData
}

// Server Component
async function kioskIDPage({ params }: Params) {
  const researchCardsTest = await loadResearchData()
  const currentId = params.id

  // Check if the currentId exists in the data
  const itemExists = researchCardsTest.some((item) => item.id === currentId)

  if (!itemExists) {
    // Return a 404 page if the item doesn't exist
    notFound()
  }

  return <KioskSingleProject data={researchCardsTest} currentId={currentId} />
}

export default kioskIDPage
