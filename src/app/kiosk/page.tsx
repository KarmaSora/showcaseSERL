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

  const researchCardsTest: ResearchData[] = JSON.parse(fileContents) //convert json text to JS objekt

  //const sizeOf = researchCardsTest.length
  //const lastIndex = sizeOf - 1

  return (
    <div>
      <KioskPage ResearchDataToDisplay={researchCardsTest} />
    </div>
  )
}

export default kiosk
