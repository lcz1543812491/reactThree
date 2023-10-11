import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export function texturePractise() {
  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight)
  camera.position.set(0, 2, 6)

  scene.add(camera)

  const axisHelper = new THREE.AxesHelper()
  scene.add(axisHelper)

  const ambentLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambentLight)

  const boxgeometry = new THREE.BoxGeometry(2, 2, 2)
  const boxmaterial = new THREE.MeshPhysicalMaterial({
    transparent: true,
    reflectivity: 1,
    // transmission: 0.8,
    roughness: 0,
    clearcoat: 20,
    color: 0xffff00,
    clearcoatRoughness: 0
    // thickness: 2,
    // attenuationColor: new THREE.Color('#376789'),
    // attenuationDistance: 10
  })

  const box = new THREE.Mesh(boxgeometry, boxmaterial)
  scene.add(box)

  const render = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById('galaxy') as HTMLCanvasElement })
  render.shadowMap.enabled = true
  render.shadowMap.type = THREE.PCFSoftShadowMap
  render.setSize(window.innerWidth, window.innerHeight)

  const controls = new OrbitControls(camera, render.domElement)
  controls.enableDamping = true

  const rgbLoader = new RGBELoader()
  rgbLoader.load('/texture/texture/Alex_Hart-Nature_Lab_Bones_2k.hdr', map => {
    map.mapping = THREE.EquirectangularReflectionMapping
    scene.background = map
    boxmaterial.envMap = map
  })

  const loader = new GLTFLoader()

  // Optional: Provide a DRACOLoader instance to decode compressed mesh data
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('draco/')
  loader.setDRACOLoader(dracoLoader)


  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    render.setSize(window.innerWidth, window.innerHeight)
  })

  const clock = new THREE.Clock()

  function tick() {
    render.render(scene, camera)
    controls.update()
    requestAnimationFrame(tick)
  }
  tick()
}
