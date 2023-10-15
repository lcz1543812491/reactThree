'use client'
import { initEditFurniture } from './utils'
import { useEffect, useRef } from 'react'

export default function Three() {

  useEffect(() => {
    initEditFurniture()
  }, [])

  return <canvas id="galaxy" style={{ width: '100vw', height: '100vh', background: 'black' }}></canvas>
}
