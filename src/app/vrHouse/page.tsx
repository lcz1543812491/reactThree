'use client'
import { vrHouse } from './utils'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function Three() {
  const canvasRef = useRef(null as any)
  const locationRef = useRef(null as any)

  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    vrHouse({ canvasRef: canvasRef.current as any, locationRef: locationRef.current as any, setisLoading })
  }, [])

  return (
    <>
      <div className="fixed bottom-0 left-0">
        <Image ref={locationRef} className="absolute z-20" width="30" height="30" alt="location" src="/texture/vrHouse/location.png" />
        <Image width="300" height="260" alt="map" src="/texture/vrHouse/map.gif" />
      </div>
      {isLoading && (
        <div className="fixed bottom-0 left-0 w-screen h-screen flex justify-center items-center" style={{ background: '#171b1f' }}>
          <Image width="400" height="300" alt="map" src="/texture/vrHouse/loading.gif" />
        </div>
      )}

      <canvas ref={canvasRef} id="galaxy" style={{ width: '100vw', height: '100vh', background: 'black' }}></canvas>
    </>
  )
}
