'use client'

import { inintBaseAnimate } from './utils';
import { useEffect } from 'react'

export default function Three() {
 
  useEffect(() => {
    inintBaseAnimate()
  }, [])

    return (
      <canvas id="galaxy" style={{width: '100vw', height: '100vh'}}>
      </canvas>
    )
};