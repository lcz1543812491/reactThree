import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export function texturePractise() {
  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight)
  camera.position.set(0, 5, 5)

  scene.add(camera)

  const axisHelper = new THREE.AxesHelper()
  scene.add(axisHelper)

  const ambentLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambentLight)

  const render = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById('galaxy') as HTMLCanvasElement })
  render.shadowMap.enabled = true
  render.shadowMap.type = THREE.PCFSoftShadowMap
  render.setSize(window.innerWidth, window.innerHeight)

  const controls = new OrbitControls(camera, render.domElement)
  controls.enableDamping = true

  const loader = new GLTFLoader()

  // Optional: Provide a DRACOLoader instance to decode compressed mesh data
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('draco/')
  loader.setDRACOLoader(dracoLoader)

  const rgbLoader = new RGBELoader()
  rgbLoader.load('/texture/texture/Alex_Hart-Nature_Lab_Bones_2k.hdr', map => {
    map.mapping = THREE.EquirectangularRefractionMapping
    scene.background = map

    loader.load('/model/Duck/glTF-Binary/Duck.glb', model => {
      const duck = model.scene.getObjectByName('LOD3spShape')
      const prematerial = (duck as any).material

      ;(duck as any).material = new THREE.MeshPhongMaterial({
        map: prematerial.map,
        refractionRatio: 0.6,
        reflectivity: 0.9,
        envMap: map
      })
      scene.add(model.scene)
      // console.log('duck', duck)
    })
  })

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
