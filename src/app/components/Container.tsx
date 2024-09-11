import React from 'react'
import Card from './Card'

// Step 1: Define a TypeScript interface for the shape of the data
interface ResearchItem {
  title: string // The title of the research project
  description: string // A brief description of the project
  image: string // URL or path to the image representing the project
  tags: string[] // An array of tags associated with the project
}

// Step 2: Define the type for the props of the Container component
// Here, "data" is an array of "ResearchItem" objects
interface ContainerProps {
  data: ResearchItem[] // "data" will be an array of ResearchItem objects
}

function Container({ data }: ContainerProps) {
  return (
    <section className='card-container'>
      {data.map((item, index) => (
        <Card
          key={index}
          cardTitle={item.title}
          cardDescription={item.description}
          cardTags={item.tags}
          cardImageURL={item.image}
        />
      ))}
    </section>
  )
}

export default Container
