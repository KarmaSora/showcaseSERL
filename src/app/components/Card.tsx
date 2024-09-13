interface Prop {
  cardResearchType: string
  cardTitle: string
  cardDescription: string
  cardTags: string[]
  cardImageURL: string
}

function Card({
  cardResearchType,
  cardTitle,
  cardDescription,
  cardTags,
  cardImageURL,
}: Prop) {
  return (
    <section className='card'>
      <p className='card-description'>cardResearchType: {cardResearchType}</p>
      <img src={cardImageURL} alt='card' className='card-image' />
      <h1 className='card-title'>{cardTitle}</h1>
      <p className='card-description'>{cardDescription}</p>
      <ul className='card-tags'>
        {cardTags.map((tag, index) => (
          <li key={index} className='tag'>
            {tag}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Card
