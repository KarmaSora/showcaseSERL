'use client'
import React from 'react'

const FullscreenButton: React.FC = () => {
  // Function to trigger fullscreen
  const toggleFullscreen = () => {
    const element = document.documentElement // This selects the whole page

    if (!document.fullscreenElement) {
      if (element.requestFullscreen) {
        element.requestFullscreen()
      } else if ((element as any).webkitRequestFullscreen) {
        // Safari
        ;(element as any).webkitRequestFullscreen()
      } else if ((element as any).mozRequestFullScreen) {
        // Firefox
        ;(element as any).mozRequestFullScreen()
      } else if ((element as any).msRequestFullscreen) {
        // IE/Edge
        ;(element as any).msRequestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if ((document as any).webkitExitFullscreen) {
        // Safari
        ;(document as any).webkitExitFullscreen()
      } else if ((document as any).mozCancelFullScreen) {
        // Firefox
        ;(document as any).mozCancelFullScreen()
      } else if ((document as any).msExitFullscreen) {
        // IE/Edge
        ;(document as any).msExitFullscreen()
      }
    }
  }

  return (
    <button
      onClick={toggleFullscreen}
      className='rounded bg-[#4a3f35] px-4 py-2 font-semibold text-white transition duration-200 ease-in-out hover:bg-[#8b4513]'
    >
      Enter Fullscreen
    </button>
  )
}

export default FullscreenButton
