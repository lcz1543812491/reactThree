import * as THREE from 'three'
// @ts-ignore
import testVertexShader from './shader/fireWorks/verticxShader.glsl'
// @ts-ignore
import testFragmentShader from './shader/fireWorks/fragment.glsl'

interface Position {
  x: number
  y: number
  z: number
}

export class Fireworks {
  constructor(color: string, position: Position, from: Position = { x: 0, y: 0, z: 0 }) {
    //console.log('Fireworks', color, position)
    this.clock = new THREE.Clock()
    this.fireStartGeometry = new THREE.BufferGeometry()
    const startPositionArray = new Float32Array(3)
    startPositionArray[0] = from.x
    startPositionArray[1] = from.y
    startPositionArray[2] = from.z
    
    const targetPosition = new THREE.Vector3(position.x, position.y, position.z)
    const fromPosition = new THREE.Vector3(from.x, from.y, from.z)

    const uStep = targetPosition.clone().sub(fromPosition)
    const path = new Float32Array([uStep.x, uStep.y, uStep.z])

 
    this.fireStartGeometry.setAttribute('uStep', new THREE.BufferAttribute(path, 3))
    this.fireStartGeometry.setAttribute('position', new THREE.BufferAttribute(startPositionArray, 3))

    this.shaderMaterial = new THREE.ShaderMaterial({
      vertexShader: testVertexShader,
      fragmentShader: testFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        uTime: {
          value: 0
        }
      }
    })

    this.startPoint = new THREE.Points(this.fireStartGeometry, this.shaderMaterial)
  }

  addScene(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    //console.log(scene, camera)
    scene.add(this.startPoint)
  }

  update() {
    this.shaderMaterial.uniforms.uTime.value = this.clock.getElapsedTime()
  }

  clock: THREE.Clock = null as unknown as THREE.Clock

  fireStartGeometry: THREE.BufferGeometry<THREE.NormalBufferAttributes> = null as any

  shaderMaterial: THREE.ShaderMaterial = null as any

  startPoint: THREE.Points<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.ShaderMaterial> = null as any
}
