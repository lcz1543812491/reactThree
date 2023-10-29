import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { createCity } from './createCity'

export function smartCity() {
  const scene = new THREE.Scene()
  // const manager = new THREE.LoadingManager()

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 50000)
  camera.position.set(0, 0, 10)

  const axisHelper = new THREE.AxesHelper(100)
  scene.add(axisHelper)

  const render = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.getElementById('galaxy') as HTMLCanvasElement,
    alpha: true,
    logarithmicDepthBuffer: true
  })
  render.setSize(window.innerWidth, window.innerHeight)
  //   render.shadowMap.enabled = true
  //   render.shadowMap.type = THREE.PCFSoftShadowMap
  render.outputColorSpace = THREE.SRGBColorSpace
  //render.toneMapping = THREE.ACESFilmicToneMapping
  //render.toneMappingExposure = 0.1

  const controls = new OrbitControls(camera, render.domElement)
  controls.enableDamping = true
  // controls.autoRotate = true
  // controls.autoRotateSpeed = 0.5
  // controls.maxPolarAngle = Math.PI
  // controls.minPolarAngle = (Math.PI / 4) * 2

  // const clock = new THREE.Clock()
  // const raycaster = new THREE.Raycaster()

  const ambentLight = new THREE.AmbientLight(0xffffff, 2)
  //scene.add(ambentLight)

  createCity({ scene })

  function tick() {
    requestAnimationFrame(tick)
    // const elapsed = clock.getElapsedTime()

    render.render(scene, camera)
    controls.update()
  }

  tick()
}
