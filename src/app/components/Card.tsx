import React from 'react'
const karam = require('fs')

interface Prop {
  cardTitle: string
  cardDescribtion: string
  cardTags: string[]
  cardImageURL: string
}
function Card({ cardTitle, cardDescribtion, cardTags, cardImageURL }: Prop) {
  return (
    <>
      <section className='cards'>
        <h1> the card: {cardTitle}</h1>
        <p>{cardDescribtion}</p>
        <h3>{cardTags}</h3>
        <img src={cardImageURL} alt='card' />
      </section>
    </>
  )
}

export default Card
