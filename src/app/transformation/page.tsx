'use client'
import { transformation } from './utils'
import { useEffect } from 'react'

export default function Three() {

  useEffect(() => {
    transformation()
  }, [])

  return <canvas id="galaxy" style={{ width: '100vw', height: '100vh', background: 'black' }}></canvas>
}
