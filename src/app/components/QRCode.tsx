'use client'
import { useQRCode } from 'next-qrcode'

interface props {
  IdForURL: string
}

function QRCode({ IdForURL }: props) {
  const { Canvas } = useQRCode()
  return (
    <section className='QrCode'>
      <h1>{'/card/' + IdForURL}</h1>
      <Canvas
        text={'http://localhost:3000/card/' + IdForURL}
        options={{
          errorCorrectionLevel: 'M',
          margin: 3,
          scale: 4,
          width: 200,
          color: {
            dark: '#010599FF',
            light: '#FFBF60FF',
          },
        }}
      />
    </section>
  )
}
export default QRCode
