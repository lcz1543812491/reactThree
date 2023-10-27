'use client'
import { vrDataHouse, changeRoom } from './utils'
import { useEffect } from 'react'
import { VrData } from './interface'

export function VrDataHouse(props: { vrdata: VrData }) {
  useEffect(() => {
    // console.log('VrDataHouse', props.vrdata)
    vrDataHouse({ vrdata: props.vrdata })
  }, [])

  return (
    <>
      <button onClick={changeRoom} className="fixed top-20 left-10 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 rounded">Change room</button>
      <canvas id="galaxy" style={{ width: '100vw', height: '100vh', background: 'black' }}></canvas>
    </>
  )
}
