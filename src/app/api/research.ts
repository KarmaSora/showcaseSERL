import { promises as fs } from 'fs'
import path from 'path'

export async function GET() {
  const filePath = path.join(process.cwd(), 'data', 'research.json')

  try {
    const jsonData = await fs.readFile(filePath, 'utf-8')
    const researchProjects = JSON.parse(jsonData)
    return new Response(JSON.stringify(researchProjects), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to load data' }), {
      status: 500,
    })
  }
}

export async function POST(req: Request) {
  const filePath = path.join(process.cwd(), 'data', 'research.json')
  const newResearch = await req.json()

  try {
    const jsonData = await fs.readFile(filePath, 'utf-8')
    const researchProjects = JSON.parse(jsonData)
    researchProjects.push(newResearch) // Add the new project
    await fs.writeFile(filePath, JSON.stringify(researchProjects, null, 2))
    return new Response(
      JSON.stringify({ message: 'Research project added successfully!' }),
      { status: 200 }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to save data' }), {
      status: 500,
    })
  }
}
