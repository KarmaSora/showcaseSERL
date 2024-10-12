import { promises as fs } from 'fs'
import path from 'path'
import KioskPage from '../components/KioskPage'

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

export const revalidate = 60 // Next.js will regenerate the page every 60 seconds

const kiosk = async () => {
  const jsonFilePath = path.join(process.cwd(), 'data', 'research.json')

  const fileContents = await fs.readFile(jsonFilePath, 'utf8')

  let researchCardsTest: ResearchData[] = JSON.parse(fileContents) //convert json text to JS objekt

  //const sizeOf = researchCardsTest.length
  //const lastIndex = sizeOf - 1
  // Map over the data to set default values
  researchCardsTest = researchCardsTest.map((item) => ({
    id: item.id || 'N/A',
    date: item.date || 'Unknown Date',
    researchType: item.researchType || 'Unknown Type',
    title: item.title || 'Untitled',
    description: item.description || 'No description available.',
    tags: item.tags || [],
    screenshots: item.screenshots || [],
    researchURL: item.researchURL || '#',
  }))

  return (
    <div>
      <KioskPage ResearchDataToDisplay={researchCardsTest} />
    </div>
  )
}

export default kiosk
