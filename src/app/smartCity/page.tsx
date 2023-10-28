'use client'
import { smartCity } from './utils'
import { useEffect } from 'react'

export default function Three() {

  useEffect(() => {
    smartCity()
  }, [])

  return <canvas id="galaxy" style={{ width: '100vw', height: '100vh', background: 'black' }}></canvas>
}
