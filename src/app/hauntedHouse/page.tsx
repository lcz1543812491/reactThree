'use client'

import { inintHauntedHouse } from './utils';
import { useEffect } from 'react'

export default function Three() {
 
  useEffect(() => {
    inintHauntedHouse()

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