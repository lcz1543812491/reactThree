import * as THREE from 'three'
import gsap from 'gsap'
// @ts-ignore
import vertex from './shader/vertex.glsl'
// @ts-ignore
import fragment from './shader/fragment.glsl'

interface CreateRadar {
  scene: THREE.Scene
}

export function createRadar(props: CreateRadar) {
  const { scene } = props
  const geometry = new THREE.PlaneGeometry(4, 4)
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(0xff0000) },
      uTime: {
        value: 0
      }
    },
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    side: THREE.DoubleSide
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(-8, 1, 8)
  mesh.rotation.x = -Math.PI / 2

  scene.add(mesh)

  gsap.to(material.uniforms.uTime, {
    value: 1,
    duration: 1,
    repeat: -1,
    ease: 'none'
  })
}
