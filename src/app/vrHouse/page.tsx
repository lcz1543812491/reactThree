'use client'
import { vrHouse } from './utils'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

export default function Three() {
  const canvasRef = useRef(null as any)
  const locationRef = useRef(null as any)

  useEffect(() => {
    vrHouse({ canvasRef: canvasRef.current as any, locationRef: locationRef.current as any })
  }, [])

  return (
    <>
      <div className="fixed bottom-0 left-0">
        <Image ref={locationRef} className="absolute z-20" width="30" height="30" alt="location" src="/texture/vrHouse/location.png" />
        <Image width="300" height="260" alt="map" src="/texture/vrHouse/map.gif" />
      </div>
      <canvas ref={canvasRef} id="galaxy" style={{ width: '100vw', height: '100vh', background: 'black' }}></canvas>
    </>
  )
}
