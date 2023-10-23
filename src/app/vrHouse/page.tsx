'use client'
import { vrHouse } from './utils'
import { useEffect } from 'react'

export default function Three() {
  useEffect(() => {
    vrHouse()
  }, [])

  return <canvas id="galaxy" style={{ width: '100vw', height: '100vh', background: 'black' }}></canvas>
}
