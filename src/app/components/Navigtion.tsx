import Link from 'next/link'

// PascalCase
function Naviagtion() {
  return (
    <>
      <section className='divide-y divide-gray-200 '>
        <h1> here starts the naviagtion component</h1>
        <nav>
          <ul>
            <li>
              <Link href='/'> home page</Link>
            </li>
            <li>
              <Link href={'/'}>Kiosk Mode</Link>
            </li>
          </ul>
        </nav>
        <h1> here ends the naviagtion component</h1>
      </section>
    </>
  )
}

export default Naviagtion
