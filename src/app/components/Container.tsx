import { promises as fs } from 'fs'
import path from 'path'
import CardDisplay from './CardDisplay'

interface ResearchData {
  researchType: string
  title: string
  description: string
  tags: string[]
  screenshots: string[]
  id: string
  date: string
}

export const revalidate = 60 // Next.js will regenerate the page every 60 seconds

const Container = async () => {
  const jsonFilePath = path.join(process.cwd(), 'data', 'research.json')

  const fileContents = await fs.readFile(jsonFilePath, 'utf8')

  const researchCardsTest: ResearchData[] = JSON.parse(fileContents) //convert json text to JS objekt

  return (
    <div>
      {/* Pass the researchCards to the client-side CardDisplay component */}
      <CardDisplay researchCards={researchCardsTest} />
    </div>
  )
}

export default Container
