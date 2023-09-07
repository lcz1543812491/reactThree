'use client'

import { inintThreejs } from './utils';
import { useEffect } from 'react'

export default function Three() {
 
  useEffect(() => {
    inintThreejs()
  }, [])

    return (
      <div className="">
        {/* <canvas id="my-canvas"></canvas> */}
      </div>
    )
};