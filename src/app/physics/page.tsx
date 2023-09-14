'use client'
import { inintPhysics } from './utils'
import { SeverPhysics } from './severPhysics'
import { useEffect, useRef } from 'react'

export default function Three() {
  const audio = useRef(null)

  useEffect(() => {
    inintPhysics(audio)
  }, [])

  return (
    <div>
      {/* <canvas id="galaxy" style={{ width: '100vw', height: '100vh', background: 'black' }}></canvas>
      <audio ref={audio} controls src="/physics/hit.mp3" style={{ position: 'fixed', zIndex: 100 }}>
        audio
      </audio> */}
      <SeverPhysics ref={audio} />
    </div>
  )
}
