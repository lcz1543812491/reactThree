'use client'
import { realisticRender } from './utils'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'


export default function Three() {
  const [loading, setLoading] = useState(0)
  const [translate, setTranslate] = useState({x: 0, y: 0})
  const [visible, setVisible] = useState(1)

  useEffect(() => {
    realisticRender(
      setLoading as (res: number) => {}, 
      setTranslate as (res: object) => {}, 
      setVisible as (res: number) => {})
    return () => {
      setLoading(0)
    }
  }, [])

  return (
    <div>
      <canvas id="galaxy" style={{ width: '100vw', height: '100vh', background: 'black' }}></canvas>
      <div
        style={{transform: `scale(${visible}, ${visible}) translateX(${translate.x}px) translateY(${translate.y}px)`, transition: 'transform 0.1s'}}
        className={`cursor-pointer 
        absolute top-1/2 
        left-1/2 w-16 h-16 rounded-full
        flex items-center 
        text-white
        bg-gradient-to-r from-violet-500 to-fuchsia-500
        justify-center`}
      >
        <div>Demo</div>
      </div>
      {/* <div className='fixed h-1 w-full top-1/2 left-0 bg-white origin-left will-change-transform' style={{
       transform: `scaleX(${loading})`, 
       transition: 'transform 0.5s ease-in-out',
      }}></div> */}
    </div>
  )
}
