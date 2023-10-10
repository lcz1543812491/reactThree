import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export function texturePractise() {
  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight)
  camera.position.set(0, 5, 30)

  scene.add(camera)

  const axisHelper = new THREE.AxesHelper()
  scene.add(axisHelper)

  const render = new THREE.WebGL1Renderer({ antialias: true, canvas: document.getElementById('galaxy') as HTMLCanvasElement })
  render.shadowMap.enabled = true
  render.shadowMap.type = THREE.PCFSoftShadowMap
  render.setSize(window.innerWidth, window.innerHeight)

  const controls = new OrbitControls(camera, render.domElement)
  controls.enableDamping = true

  const rgbLoader = new RGBELoader()
  rgbLoader.load('/texture/texture/Alex_Hart-Nature_Lab_Bones_2k.hdr', map => {
    map.mapping = THREE.EquirectangularReflectionMapping
    scene.background = map
  })

  const loader = new GLTFLoader()

  // Optional: Provide a DRACOLoader instance to decode compressed mesh data
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('draco/')
  loader.setDRACOLoader(dracoLoader)

  loader.load('/texture/texture/city.glb', model => {
    // console.log(model)
    //scene.add(model.scene)
    model.scene.traverse((child: any) => {
      if (child.isMesh) {
        // console.log(child.geometry)
        const geometrybuild = new THREE.EdgesGeometry(child.geometry)
        const materialbuild = new THREE.LineBasicMaterial({ color: 0xfffff })

        child.updateMatrixWorld(true)
        const line = new THREE.LineSegments(geometrybuild, materialbuild)
        line.matrix.copy(child.matrixWorld)
        line.matrix.decompose(line.position, line.quaternion, line.scale)
        scene.add(line)
      }
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
