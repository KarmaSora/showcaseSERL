'use client'
import { useQRCode } from 'next-qrcode'

interface props {
  IdForURL: string
}

function QRCode({ IdForURL }: props) {
  const { Canvas } = useQRCode()
  return (
    <Canvas
      text={IdForURL}
      options={{
        errorCorrectionLevel: 'M',
        margin: 3,
        scale: 4,
        width: 200,
        color: {
          dark: '#4a3f35',
          light: '#FFFFFF00',
        },
      }}
    />
  )
}

export default QRCode
