'use client'

import { inintThreeShadows } from './utils';
import { useEffect } from 'react'

export default function Three() {
 
  useEffect(() => {
    inintThreeShadows()
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