'use client'
import { realisticRender } from './utils'
import { useEffect, useState } from 'react'

export default function Three() {

  const [loading, setLoading] = useState(0)

  useEffect(() => {
    realisticRender(setLoading as (res: number) => {})
    return () => {
      setLoading(0)
    }
  }, [])

  return (
    <> 
    <canvas id="galaxy" style={{ width: '100vw', height: '100vh', background: 'black' }}></canvas>
    {/* <div className='fixed h-1 w-full top-1/2 left-0 bg-white origin-left will-change-transform' style={{
       transform: `scaleX(${loading})`, 
       transition: 'transform 0.5s ease-in-out',
      }}></div> */}
    </>
  )
}
