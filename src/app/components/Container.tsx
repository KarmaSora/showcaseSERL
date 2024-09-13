import fs from 'fs'
import path from 'path'
import CardDisplay from './CardDisplay'

interface ResearchData {
  cardResearchType: string
  cardTitle: string
  cardDescription: string
  cardTags: string[]
  cardImageURL: string
}

export const revalidate = 60 // Next.js will regenerate the page every 60 seconds

// Server Component (default in the app directory)
const Container = async () => {
  // Fetch the data directly inside the component
  const jsonFilePath = path.join(process.cwd(), 'data', 'research.json')
  const researchCards: ResearchData[] = JSON.parse(
    fs.readFileSync(jsonFilePath, 'utf8')
  )

  return (
    <div>
      {/* Pass the researchCards to the client-side CardDisplay component */}
      <CardDisplay researchCards={researchCards} />
    </div>
  )
}

export default Container
