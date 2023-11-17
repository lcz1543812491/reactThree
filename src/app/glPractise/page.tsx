'use client'

import { inintGlPractise } from './utils';
import { useEffect, useRef } from 'react'

export default function Three() {

  const canvasRef = useRef(null)
 
  useEffect(() => {
    inintGlPractise({ canvasRef: canvasRef.current as unknown as HTMLCanvasElement })
  }, [])

    return (
      <canvas ref={canvasRef} id="galaxy" style={{width: '100vw', height: '100vh', background: 'black'}}>
      </canvas>
    )
};