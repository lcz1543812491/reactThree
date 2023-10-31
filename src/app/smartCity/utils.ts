import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { createCity } from './createCity'
import { createFlyLine } from './createFlyLine'
import { createFlylineShader } from './createFlylineShader/createFlylineShader'
import { createLightWall } from './createLightWall/createLightWall'
import { createRadar } from './createRadar/createRadar'
import { createAlarmSprite } from './createAlarmSprite/createAlarmSprite'

export function smartCity() {
  const scene = new THREE.Scene()
  // const manager = new THREE.LoadingManager()

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 50000)
  camera.position.set(-20, 11, 11)

  const axisHelper = new THREE.AxesHelper(100)
  scene.add(axisHelper)

  const render = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.getElementById('galaxy') as HTMLCanvasElement
    // alpha: true,
    // logarithmicDepthBuffer: true
  })
  render.setSize(window.innerWidth, window.innerHeight)
  render.shadowMap.enabled = true
  render.shadowMap.type = THREE.PCFSoftShadowMap
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
  createFlyLine({ scene })

  createFlylineShader({ scene })

  createLightWall({ scene })

  createRadar({ scene })

  createAlarmSprite({
    scene,
    camera,
    callBack: (e: MouseEvent) => {
      console.log('警告')
    }
  })

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    render.setSize(window.innerWidth, window.innerHeight)
  })

  function tick() {
    requestAnimationFrame(tick)
    // const elapsed = clock.getElapsedTime()
    // console.log(camera.position)
    render.render(scene, camera)
    controls.update()
  }

  tick()
}
