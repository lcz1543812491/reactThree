'use client'
// import { texturePractise } from './utils'
// import { texturePractise } from './uv'
import { texturePractise } from './gtlf'
import { useEffect, useRef } from 'react'

export default function Three() {

  useEffect(() => {
    texturePractise()
  }, [])

  return <canvas id="galaxy" style={{ width: '100vw', height: '100vh', background: 'black' }}></canvas>
}
