import * as THREE from 'three'
import gsap from 'gsap'
// @ts-ignore
import FragmentShader from './shader/fragment.glsl'
// @ts-ignore
import VertexShader from './shader/verticxShader.glsl'

interface CreateLightWall {
  scene: THREE.Scene
  position?: THREE.Vector3
}

export function createLightWall(props: CreateLightWall) {
  const { scene, position = new THREE.Vector3(0.0, 0.0, 0.0) } = props

  const geometry = new THREE.CylinderGeometry(5, 5, 2, 32, 1, true)

  const shaderMaterial = new THREE.ShaderMaterial({
    fragmentShader: FragmentShader,
    vertexShader: VertexShader,
    transparent: true,
    side: THREE.DoubleSide,
    depthTest: false,
    depthWrite: true,
    // blending: THREE.AdditiveBlending
  })

  const mesh = new THREE.Mesh(geometry, shaderMaterial)
  mesh.position.set(0, 1, 0)

  mesh.position.set(position.x, 1, position.z)
  mesh.geometry.computeBoundingBox()
  // console.log(mesh.geometry.boundingBox);

  const { min, max } = mesh.geometry.boundingBox as any
  // 获取物体的高度差
  const uHeight = max.y - min.y
  shaderMaterial.uniforms.uHeight = {
    value: uHeight
  }
  scene.add(mesh)

  gsap.to(mesh.scale, {
    x: 2,
    z: 2,
    duration: 1,
    repeat: -1,
    yoyo: true,
  });
}
