import { secureHeapUsed } from 'crypto'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export function initPerformance() {
  const scene = new THREE.Scene()

  const ambentLight = new THREE.AmbientLight(0xffffff, 0.2)
  const directLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directLight.position.set(0, 5, 0)
  directLight.castShadow = true

  directLight.shadow.mapSize.width = 1024
  directLight.shadow.mapSize.height = 1024

  directLight.shadow.camera.top = 6
  directLight.shadow.camera.bottom = -6
  directLight.shadow.camera.left = -6
  directLight.shadow.camera.right = 6

  directLight.shadow.camera.near = 1
  directLight.shadow.camera.far = 15

  directLight.shadow.radius = 10

  const directLightShadowHelper = new THREE.CameraHelper(directLight.shadow.camera)
  directLightShadowHelper.visible = true
  scene.add(directLightShadowHelper)

  scene.add(ambentLight)
  scene.add(directLight)

  const camera = new THREE.PerspectiveCamera(90, (window as Window).innerWidth / (window as Window).innerHeight)
  camera.position.set(-0.1, 8, 13)
  scene.add(camera)

  const axisHelper = new THREE.AxesHelper()
  scene.add(axisHelper)




  const cube = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshStandardMaterial({ roughness: 0.3, metalness: 0.4 }))
  cube.castShadow = true
  cube.receiveShadow = true
  cube.position.set(-5, 0, 0)
  scene.add(cube)

  const torusKnot = new THREE.Mesh(new THREE.TorusKnotGeometry(1, 0.4, 128, 32), new THREE.MeshStandardMaterial({ roughness: 0.3, metalness: 0.4 }))
  torusKnot.castShadow = true
  torusKnot.receiveShadow = true
  scene.add(torusKnot)

  const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshStandardMaterial({ roughness: 0.3, metalness: 0.4 }))
  sphere.position.set(5, 0, 0)
  sphere.castShadow = true
  sphere.receiveShadow = true
  scene.add(sphere)

  const plane = new THREE.PlaneGeometry(20, 20, 64, 64)
  const planeMaterial = new THREE.MeshStandardMaterial({ roughness: 1, color: 0xffffff })

  const planeMesh = new THREE.Mesh(plane, planeMaterial)
  planeMesh.receiveShadow = true
  planeMesh.position.set(0, -3, 0)
  planeMesh.rotation.x = -Math.PI * 0.5
  scene.add(planeMesh)

  const render = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById('galaxy') as HTMLCanvasElement })
  render.setSize(window.innerWidth, window.innerHeight)
  render.shadowMap.enabled = true
  render.shadowMap.type = THREE.PCFSoftShadowMap
  render.outputColorSpace = THREE.SRGBColorSpace
  render.toneMapping = THREE.ACESFilmicToneMapping
  render.toneMappingExposure = 2

  const controls = new OrbitControls(camera, render.domElement)
  controls.enableDamping = true

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    render.setSize(window.innerWidth, window.innerHeight)
  })

  const clock = new THREE.Clock()

  function tick() {
    const time = clock.getElapsedTime()
    //console.log(camera.position)
    render.render(scene, camera)
    controls.update()
    requestAnimationFrame(tick)
  }

  tick()
}
