import * as React from 'react'

export const SeverPhysics = React.forwardRef((_, ref: any) => {
  return (
    <div ref={ref}>
      <canvas id="galaxy" style={{ width: '100vw', height: '100vh', background: 'black' }}></canvas>
      <audio src="/physics/hit.mp3" style={{ position: 'fixed', zIndex: 100 }}>
        audio
      </audio>
    </div>
  )
})

SeverPhysics.displayName = 'SeverPhysics'
