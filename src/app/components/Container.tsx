import fs from 'fs'
import path from 'path'
import Card from './Card'

interface ResearchData {
  cardResearchType: string
  cardTitle: string
  cardDescription: string
  cardTags: string[]
  cardImageURL: string
}

const Container = () => {
  // Define the path to your JSON file
  const jsonFilePath = path.join(process.cwd(), 'data', 'research.json')

  // Read the JSON file during build time
  const data: ResearchData[] = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'))

  return (
    <div>
      {data.map((item, index) => (
        <Card
          key={index}
          cardResearchType={item.cardResearchType}
          cardTitle={item.cardTitle}
          cardDescription={item.cardDescription}
          cardTags={item.cardTags}
          cardImageURL={item.cardImageURL}
        />
      ))}
    </div>
  )
}

export default Container
