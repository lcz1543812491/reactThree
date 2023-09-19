'use client'
import { realisticRender } from './utils'
import { useEffect, useRef } from 'react'

export default function Three() {

  useEffect(() => {
    realisticRender()
  }, [])

  return <canvas id="galaxy" style={{ width: '100vw', height: '100vh', background: 'black' }}></canvas>
}
