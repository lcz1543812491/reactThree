'use client'
import { initEditFurniture } from './utils'
import { useEffect, useRef } from 'react'

export default function Three() {
  useEffect(() => {
    initEditFurniture()

    return () => {
      const guiTag = document.getElementsByClassName('dg ac')
      if(guiTag[0]){
        document.body.removeChild(guiTag[0])
      }
    }
  }, [])

  return <canvas id="galaxy" style={{ width: '100vw', height: '100vh', background: 'black' }}></canvas>
}
