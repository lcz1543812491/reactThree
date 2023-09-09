'use client'

import { inintThreeLight } from './utils';
import { useEffect } from 'react'

export default function Three() {
 
  useEffect(() => {
    inintThreeLight()
    return () => {
      const canvasTag = document.getElementsByTagName('canvas')
      const guiElement = document.getElementsByClassName('dg ac')
      document.body.removeChild(canvasTag[0])
      document.body.removeChild(guiElement[0])
    }
  }, [])

    return (
      <div className="">
      </div>
    )
};