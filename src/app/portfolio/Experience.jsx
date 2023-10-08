'use client'
import { OrbitControls, Html, useGLTF, PresentationControls, Float, Environment } from '@react-three/drei'

export default function Experience() {
  const computer = useGLTF('/model/portfolio/model.gltf')

  return (
    <>
      <OrbitControls makeDefault />
      {/* <Environment preset="city" /> */}
      <PresentationControls global rotation={[0.13, 0.1, 0]} polar={[-0.4, 0.2]} azimuth={[-1, 0.75]} config={{ mass: 2, tension: 400 }} snap={{ mass: 4, tension: 400 }}>
        <Float rotationIntensity={0.4}>
          <ambientLight intensity={1} />
          <rectAreaLight width={2.5} height={1.65} intensity={65} color={'#ffffff'} rotation={[-0.1, Math.PI, 0]} position={[0, 0.55, -1.15]} />

          <primitive object={computer.scene} position-y={-1.2} rotation-x={0.13}>
            <Html transform wrapperClass="htmlScreen" distanceFactor={1.17} position={[0, 1.56, -1.4]} rotation-x={-0.256}>
              <iframe src="https://bruno-simon.com/html/" />
            </Html>
          </primitive>
        </Float>
      </PresentationControls>
      {/* <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh> */}
    </>
  )
}
