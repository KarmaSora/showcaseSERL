import Link from 'next/link'

interface Prop {
  researchType: string
  title: string
  description: string
  tags: string[]
  screenshots: string[]
  date: string
  id: string
}

function Card({
  researchType,
  title,
  description,
  tags,
  screenshots,
  date,
  id,
}: Prop) {
  let trimmedDescription = ''
  if (description.length > 100) {
    trimmedDescription = description.substring(0, 100) + '...'
  }
  if (description.length < 100) {
    trimmedDescription = description.padEnd(103, '')
  }
  return (
    <section className='card'>
      <p className='card-type'>cardResearchType: {researchType}</p>

      <img src={screenshots[0]} alt='an image' className='card-image' />
      <h1 className='card-title'>{title}</h1>
      <p className='card-description'>{trimmedDescription}</p>
      <p className='card-date'>Date: {date}</p>
      <ul className='card-tags'>
        {tags.map((tag, index) => (
          <li key={index} className='tag'>
            {tag}
          </li>
        ))}
      </ul>
      <Link href={`/card/${id}`} className='cardURL'>
        {' '}
        Go HERE!{' '}
      </Link>
    </section>
  )
}

export default Card
