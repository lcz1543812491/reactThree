'use client'

import { inintBaseAnimate } from './utils'
import { useEffect } from 'react'

export default function Three() {
  useEffect(() => {
    inintBaseAnimate()
    //console.log('@@@',  document.body.style)
  }, [])

  return (
    <>
      <canvas id="galaxy" style={{ width: '100vw', height: '100vh' }} className="fixed top-0 right-0"></canvas>
      <div className='flex items-center h-screen w-screen bg-transparent text-white'>
        <div className='text-5xl' style={{ fontWeight: '800', paddingLeft: '30px' }}>Game Throne-1</div>
      </div>
      <div className='flex items-center justify-end h-screen w-screen bg-transparent text-white'>
        <div className='text-5xl' style={{ fontWeight: '800', paddingRight: '30px' }}>Game Throne-2</div>
      </div>
      <div className='flex items-center h-screen w-screen bg-transparent text-white'>
        <div className='text-5xl' style={{ fontWeight: '800', paddingLeft: '30px' }}>Game Throne-3</div>
      </div>
    </>
  )
}
