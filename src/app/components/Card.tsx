import Link from 'next/link'

interface Prop {
  cardResearchType: string
  cardTitle: string
  cardDescription: string
  cardTags: string[]
  cardImageURL: string
  date: string
  id: string
}

function Card({
  cardResearchType,
  cardTitle,
  cardDescription,
  cardTags,
  cardImageURL,
  date,
  id,
}: Prop) {
  return (
    <section className='card'>
      <p className='card-description'>cardResearchType: {cardResearchType}</p>
      <img src={cardImageURL} alt='card' className='card-image' />
      <h1 className='card-title'>{cardTitle}</h1>
      <p className='card-description'>{cardDescription}</p>
      <p className='card-date'>Date: {date}</p>
      <ul className='card-tags'>
        {cardTags.map((tag, index) => (
          <li key={index} className='tag'>
            {tag}
          </li>
        ))}
        <Link href={`/card/${id}`}> Go HERE! </Link>
      </ul>
    </section>
  )
}

export default Card
