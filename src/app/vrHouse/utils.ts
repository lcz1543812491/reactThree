import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export function vrHouse() {
  const scene = new THREE.Scene()

  const textureLoader = new THREE.TextureLoader()

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200)
  camera.position.set(0, 0, 10)

  const axisHelper = new THREE.AxesHelper(100)
  scene.add(axisHelper)

  const render = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.getElementById('galaxy') as HTMLCanvasElement
  })
  render.setSize(window.innerWidth, window.innerHeight)
  //   render.shadowMap.enabled = true
  //   render.shadowMap.type = THREE.PCFSoftShadowMap
  render.outputColorSpace = THREE.SRGBColorSpace
  render.toneMapping = THREE.ACESFilmicToneMapping
  //render.toneMappingExposure = 0.1

  const controls = new OrbitControls(camera, render.domElement)
  controls.enableDamping = true
  // controls.autoRotate = true
  // controls.autoRotateSpeed = 0.5
  // controls.maxPolarAngle = Math.PI
  // controls.minPolarAngle = (Math.PI / 4) * 2

  const clock = new THREE.Clock()
  const raycaster = new THREE.Raycaster()


  const boxGeometry = new THREE.BoxGeometry(2,2,2)
  const boxmaterial = new THREE.MeshBasicMaterial({color: 0xff0000})
  const box = new THREE.Mesh(boxGeometry, boxmaterial)
  box.geometry.scale(1, 1, -1)

  scene.add(box)

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    render.setSize(window.innerWidth, window.innerHeight)
  })

  function tick() {
    requestAnimationFrame(tick)
    // const elapsed = clock.getElapsedTime()

    render.render(scene, camera)
    controls.update()
  }

  tick()
}
