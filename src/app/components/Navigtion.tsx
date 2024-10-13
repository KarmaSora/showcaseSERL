import Link from 'next/link'
import FullscreenButton from './fullscreen'

function Naviagtion() {
  return (
    <>
      <section className='bg-[#e8dcc0] px-6'>
        <nav className='flex items-center justify-between py-4'>
          <ul className='flex space-x-8'>
            <li>
              <Link
                href='/'
                className='font-semibold text-[#4a3f35] hover:text-[#8b4513]'
              >
                home page
              </Link>
            </li>
            <li>
              <Link
                href='/kiosk'
                className='font-semibold text-[#4a3f35] hover:text-[#8b4513]'
              >
                Kiosk Mode ⛶
              </Link>
            </li>
          </ul>
          <FullscreenButton />
        </nav>
      </section>
    </>
  )
}

export default Naviagtion
