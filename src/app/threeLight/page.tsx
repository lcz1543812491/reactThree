'use client'

import { inintThreeLight } from './utils';
import { useEffect } from 'react'

export default function Three() {
 
  useEffect(() => {
    inintThreeLight()
    return () => {
      const canvasTag = document.getElementsByTagName('canvas')
      document.body.removeChild(canvasTag[0])
    }
  }, [])

    return (
      <div className="">
      </div>
    )
};