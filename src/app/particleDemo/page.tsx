'use client'
import { initParticleDemo } from './utils'
import { useEffect } from 'react'

export default function Three() {

  useEffect(() => {
    initParticleDemo()
  }, [])

  return <canvas id="galaxy" style={{ width: '100vw', height: '100vh', background: 'black' }}></canvas>
}
