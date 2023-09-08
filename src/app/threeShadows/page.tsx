'use client'

import { inintThreeShadows } from './utils';
import { useEffect } from 'react'

export default function Three() {
 
  useEffect(() => {
    inintThreeShadows()
  }, [])

    return (
      <div className="">
      </div>
    )
};