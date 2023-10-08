'use client'

// import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'

export default function initPortfolio() {
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 2000,
        position: [-3, 1.5, 4]
      }}
    >
      <Experience />
    </Canvas>
  )
}
