import * as THREE from 'three'
import gsap from 'gsap'

interface CreateFlyLine {
  scene: THREE.Scene
}

export function createFlyLine(props: CreateFlyLine) {
  const { scene } = props

  const linePoints = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(4, 4, 0), new THREE.Vector3(8, 0, 0)]

  const lineCurve = new THREE.CatmullRomCurve3(linePoints)
  const geometry = new THREE.TubeGeometry(lineCurve, 100, 0.4, 2, false)

  const textureLoader = new THREE.TextureLoader()

  const texture = textureLoader.load('/texture/texture/z_11.png')
  texture.repeat.set(1, 2)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.MirroredRepeatWrapping

  const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true })

  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  gsap.to(texture.offset, {
    x: -1,
    duration: 2,
    ease: 'none',
    repeat: -1
  })
}
