'use client'
import { vrHouse } from './utils'
import { useEffect, useRef } from 'react'

export default function Three() {

  const canvasRef = useRef(null as any)

  useEffect(() => {
    vrHouse(canvasRef.current as any)
  }, [])

  return <canvas ref={canvasRef} id="galaxy" style={{ width: '100vw', height: '100vh', background: 'black' }}></canvas>
}
