import { text } from 'stream/consumers'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';


export function texturePractise() {
  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight)
  camera.position.set(0, 0, 2)

  scene.add(camera)

  const axisHelper = new THREE.AxesHelper()
  scene.add(axisHelper)

  

  const render = new THREE.WebGL1Renderer({ antialias:true, canvas: document.getElementById('galaxy') as HTMLCanvasElement })
  render.shadowMap.enabled = true
  render.shadowMap.type = THREE.PCFSoftShadowMap
  render.setSize(window.innerWidth, window.innerHeight)


  const controls = new OrbitControls(camera, render.domElement)
  controls.enableDamping = true



  const textureLoader = new THREE.TextureLoader()
  const texture = textureLoader.load('/texture/texture/watercover/CityNewYork002_COL_VAR1_1K.png')

  const aomap = textureLoader.load('/texture/texture/watercover/CityNewYork002_AO_1K.jpg')
  const colormap = textureLoader.load('/texture/texture/colors.png')

  const lightMap1 = textureLoader.load('/texture/texture/watercover/CityNewYork002_GLOSS_1K.jpg')

  const rgbLoader = new RGBELoader()

  const planeMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    aoMap: aomap,
    aoMapIntensity: 2,
    transparent: true,
    reflectivity: 0.2,
    side: THREE.DoubleSide,
    specularMap: lightMap1
    // lightMap: colormap
  })

  rgbLoader.load('/texture/texture/Alex_Hart-Nature_Lab_Bones_2k.hdr', (map)  => {
    map.mapping = THREE.EquirectangularReflectionMapping
    scene.background = map
    planeMaterial.envMap = map
  })
  // const alphamap = textureLoader.load('/texture/texture/chain/ChainmailCopperRoundedThin001_Sphere.jpg')

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), planeMaterial)

  scene.add(plane)

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
