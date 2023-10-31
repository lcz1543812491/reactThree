import * as THREE from 'three'
import gsap from 'gsap'
// @ts-ignore
import FragmentShader from './shader/fragment.glsl'
// @ts-ignore
import VertexShader from './shader/verticxShader.glsl'
import { uniform } from 'three/examples/jsm/nodes/Nodes.js'
// console.log('FragmentShader', FragmentShader)
// console.log('VertexShader', VertexShader)

interface CreateFlylineShader {
    scene: THREE.Scene
}

export function createFlylineShader(props: CreateFlylineShader) {

  const { scene } = props

  const linePoints = [
    new THREE.Vector3(0, 0, 0), 
    new THREE.Vector3(-5, 4, 0), 
    new THREE.Vector3(-10, 0, 0)
  ]

  const lineCurve = new THREE.CatmullRomCurve3(linePoints)

  const points = lineCurve.getPoints(1000)
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  

  const sizeArray = new Float32Array(points.length)

  for(let i = 0; i < points.length; i++){
    sizeArray[i] = i
  }

  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizeArray, 1))

  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(0xffff00) },
      uLength: { value: sizeArray.length }
    },
    vertexShader: VertexShader,
    fragmentShader: FragmentShader,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    // blending: THREE.AdditiveBlending,
  })

  const meshs = new THREE.Points(geometry, shaderMaterial)
  scene.add(meshs)

  gsap.to(shaderMaterial.uniforms.uTime, {
    duration: 3,
    value: 1000,
    repeat: -1,
    ease: 'none'
  })
}
