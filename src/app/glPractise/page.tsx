'use client'

import { inintGlPractise1 } from './utils';
import { inintTriangle } from './triangle'
import { useEffect, useRef } from 'react'

export default function Three() {

  const canvasRef = useRef(null)
 
  useEffect(() => {
    // inintGlPractise1({ canvasRef: canvasRef.current as unknown as HTMLCanvasElement })
    inintTriangle({ canvasRef: canvasRef.current as unknown as HTMLCanvasElement })
  }, [])

    return (
      <canvas ref={canvasRef} id="galaxy" style={{width: '100vw', height: '100vh', background: 'black'}}>
      </canvas>
    )
};