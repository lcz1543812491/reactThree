'use client'
import { initCssRender } from './utils'
import { useEffect, useRef } from 'react'

export default function Three() {
  const earth = useRef(null)
  const labelRender = useRef(null)
  const moonRef = useRef(null)

  useEffect(() => {
    initCssRender({
      earthRef: earth.current as unknown as HTMLElement,
      labelRender: labelRender.current as unknown as HTMLElement,
      moonRef: moonRef.current  as unknown as HTMLElement,
    })
  }, [])

  return (
    <>
      <canvas id="galaxy" style={{ width: '100vw', height: '100vh', background: 'black' }}></canvas>
      <div className="earth-label text-white" ref={earth}>
        中国
      </div>
      <div className="moon-label text-white" ref={moonRef}>
        月球
      </div>
      <div className="label-render fixed h-screen w-screen top-0 right-0" ref={labelRender}></div>
    </>
  )
}
