import { promises as fs } from 'fs'
import path from 'path'
import KioskSingleProject from '../../components/KioskSingleProject'

export const revalidate = 60 // Next.js will regenerate the page every 60 seconds

interface Params {
  params: {
    id: string
  }
}

async function loadResearchData() {
  const jsonFilePath = path.join(process.cwd(), 'data', 'research.json')
  const fileContents = await fs.readFile(jsonFilePath, 'utf8')
  return JSON.parse(fileContents)
}

// Generate Static Paths at Build Time
export async function generateStaticParams() {
  const researchCardsTest = await loadResearchData()

  return researchCardsTest.map((item: { id: string }) => ({
    id: item.id,
  }))
}

// Server Component
async function kioskIDPage({ params }: Params) {
  const researchCardsTest = await loadResearchData()
  return <KioskSingleProject data={researchCardsTest} currentId={params.id} />
}

export default kioskIDPage
