'use client'

import { inintPhysics } from './utils';
import { useEffect } from 'react'

export default function Three() {
 
  useEffect(() => {
    inintPhysics()
  }, [])

    return (
      <canvas id="galaxy" style={{width: '100vw', height: '100vh', background: 'black'}}>
      </canvas>
    )
};