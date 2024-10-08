import Link from 'next/link'
import Image from 'next/image'

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
      <p className='card-type'>Project type: {researchType}</p>

      <Image
        src={screenshots[0]}
        alt={`Project Screenshot`}
        width={800}
        height={400}
        className='card-image'
      />
      <h1 className=' card-title overflow-x-auto '>{title}</h1>
      {/*       <p className='card-description'>{trimmedDescription}</p>*/}
      <p className='card-description'>{trimmedDescription}</p>

      <p className='card-date'>Date: {date}</p>
      <ul className=' ml-4 flex flex-1 justify-center space-x-2 overflow-x-auto p-4 '>
        {tags.map((tag, index) => (
          <li key={index} className='tag'>
            {tag}
          </li>
        ))}
      </ul>
      <Link href={`/card/${id}`} className='cardURL'>
        Go HERE!
      </Link>
    </section>
  )
}

export default Card
