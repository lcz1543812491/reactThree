'use client'
import { vrDataHouse } from './utils'
import { useEffect, useRef } from 'react'
import { VrData } from './interface'

export function VrDataHouse(props: { vrdata: VrData }) {
  useEffect(() => {
    // console.log('VrDataHouse', props.vrdata)
    vrDataHouse({ vrdata: props.vrdata })
  }, [])


  return <canvas id="galaxy" style={{ width: '100vw', height: '100vh', background: 'black' }}></canvas>
}
