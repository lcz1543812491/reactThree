import * as THREE from 'three'
// @ts-ignore
import testVertexShader from './shader/fireWorks/verticxShader.glsl'
// @ts-ignore
import testFragmentShader from './shader/fireWorks/fragment.glsl'

// @ts-ignore
import explodeVertexShader from './shader/explode/verticxShader.glsl'
// @ts-ignore
import explodeFragmentShader from './shader/explode/fragment.glsl'
import { time } from 'console'

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


    this.color = new THREE.Color(color)
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
        },
        uSize: {
            value: 20
        },
        color: { value: this.color }
      }
    })

    this.startPoint = new THREE.Points(this.fireStartGeometry, this.shaderMaterial)


    this.explodeFireworks = new THREE.BufferGeometry()
    this.explodeCount = 500 + Math.floor(Math.random() * 200)
    const explodePosition = new Float32Array(this.explodeCount * 3)
    const explodeSize = new Float32Array(this.explodeCount)
    const directionArray = new Float32Array(this.explodeCount * 3)

    for(let i = 0; i < this.explodeCount; i ++){
        explodePosition[i * 3] = position.x
        explodePosition[i * 3 + 1] = position.y
        explodePosition[i * 3 + 2] = position.z

        explodeSize[i] = Math.random()

        const theta = Math.random() * 2 * Math.PI
        const beta = Math.random() * 2 * Math.PI
        const r = Math.random()

        directionArray[i * 3] = r * Math.sin(beta)* Math.cos(theta)
        directionArray[i * 3 + 1] = r * Math.sin(beta)* Math.sin(theta)
        directionArray[i * 3 + 2] = r * Math.cos(beta)
        
    }

    //console.log(directionArray)

    this.explodeFireworks.setAttribute('position', new THREE.BufferAttribute(explodePosition, 3))
    this.explodeFireworks.setAttribute('aScale', new THREE.BufferAttribute(explodeSize, 1))
    this.explodeFireworks.setAttribute('aDirection', new THREE.BufferAttribute(directionArray, 3))
    this.explodeMaterial = new THREE.ShaderMaterial({
      vertexShader: explodeVertexShader,
      fragmentShader: explodeFragmentShader,
      uniforms: {
        uSize: {
          value: 0
        },
        uTime: {
          value: 0
        },
        color: { value: this.color }
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })

    this.explodeWorks = new THREE.Points(this.explodeFireworks, this.explodeMaterial)

  }

  addScene(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    //console.log(scene, camera)
    scene.add(this.startPoint)
    scene.add(this.explodeWorks)
  }

  update() {
    const time = this.clock.getElapsedTime()
    //console.log(time)
    if(time < 1){
      this.shaderMaterial.uniforms.uTime.value = time
    }else {
      const time1 = time - 1;  
      this.shaderMaterial.uniforms.uSize.value = 0
      this.startPoint.clear()
      this.fireStartGeometry.dispose()
      this.shaderMaterial.dispose()
      this.explodeMaterial.uniforms.uSize.value = 20.0
      this.explodeMaterial.uniforms.uTime.value = time1
      if(time1 > 5){
        this.explodeWorks.clear()
        this.explodeFireworks.dispose()
        this.explodeMaterial.dispose()
      }
    }
    
  }

  color: THREE.Color

  explodeWorks: THREE.Points<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.ShaderMaterial>

  explodeMaterial: THREE.ShaderMaterial

  explodeCount: number

  explodeFireworks: THREE.BufferGeometry<THREE.NormalBufferAttributes>

  clock: THREE.Clock = null as unknown as THREE.Clock

  fireStartGeometry: THREE.BufferGeometry<THREE.NormalBufferAttributes> = null as any

  shaderMaterial: THREE.ShaderMaterial = null as any

  startPoint: THREE.Points<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.ShaderMaterial> = null as any
}
