import Link from 'next/link'
import FullscreenButton from './fullscreen'
// PascalCase
function Naviagtion() {
  return (
    <>
      <section className='divide-y divide-gray-200 '>
        <nav>
          <ul>
            <li>
              <Link href='/'> home page</Link>
            </li>
            <li>
              <Link href={'/kiosk'}>Kiosk Mode ⛶</Link>
            </li>
          </ul>
          <FullscreenButton />
        </nav>
      </section>
    </>
  )
}

export default Naviagtion
