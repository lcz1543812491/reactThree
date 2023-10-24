import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const roomIndex = 0

const roomArr = [`${roomIndex}_l`, `${roomIndex}_r`, `${roomIndex}_u`, `${roomIndex}_d`, `${roomIndex}_b`, `${roomIndex}_f`]

let isMouseDown = false

export function vrHouse(canvasRef: HTMLElement) {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200)
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

  // const controls = new OrbitControls(camera, render.domElement)
  // controls.enableDamping = true
  // controls.autoRotate = true
  // controls.autoRotateSpeed = 0.5
  // controls.maxPolarAngle = Math.PI
  // controls.minPolarAngle = (Math.PI / 4) * 2

  const clock = new THREE.Clock()
  const raycaster = new THREE.Raycaster()

  const boxGeometry = new THREE.BoxGeometry(10, 10, 10)
  const boxmaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 })
  boxGeometry.scale(1, 1, -1)

  const materialArr: THREE.MeshBasicMaterial[] = []
  const textureLoader = new THREE.TextureLoader()

  roomArr.forEach(item => {
    const texture = textureLoader.load(`/texture/livingroom/${item}.jpg`)
    materialArr.push(new THREE.MeshBasicMaterial({ map: texture }))
  })

  const box = new THREE.Mesh(boxGeometry, materialArr)
  scene.add(box)

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    render.setSize(window.innerWidth, window.innerHeight)
  })
  canvasRef.addEventListener(
    'mouseup',
    () => {
      isMouseDown = false
    },
    false
  )

  canvasRef.addEventListener(
    'mousedown',
    () => {
      isMouseDown = true
    },
    false
  )

  canvasRef.addEventListener(
    'mouseout',
    () => {
      isMouseDown = false
    },
    false
  )

  canvasRef.addEventListener('mousemove', (e) => {
    if(isMouseDown){

    }
  })

  function tick() {
    requestAnimationFrame(tick)
    // const elapsed = clock.getElapsedTime()

    render.render(scene, camera)
    // controls.update()
  }

  tick()
}
