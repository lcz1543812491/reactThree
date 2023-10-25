import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import gsap from 'gsap'
import { VrData } from './interface'
import { createShape } from './createShape'

export function vrDataHouse(props: { vrdata: VrData }) {
  const { vrdata } = props

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(75, (window as Window).innerWidth / (window as Window).innerHeight)
  camera.position.z = 15
  scene.add(camera)

  //   const axisHelper = new THREE.AxesHelper()
  //   scene.add(axisHelper)

  const render = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById('galaxy') as HTMLCanvasElement })
  render.setSize(window.innerWidth, window.innerHeight)
  //   render.shadowMap.enabled = true
  //   render.shadowMap.type = THREE.PCFSoftShadowMap
  render.outputColorSpace = THREE.SRGBColorSpace
  //   render.toneMapping = THREE.ACESFilmicToneMapping
  //   render.toneMappingExposure = 0.1

  const controls = new OrbitControls(camera, render.domElement)
  controls.enableDamping = true

  const clock = new THREE.Clock()

  const loader = new GLTFLoader()

  //   const dracoLoader = new DRACOLoader()
  //   dracoLoader.setDecoderPath('draco/')
  //   loader.setDRACOLoader(dracoLoader)

  //   loader.loadAsync('/model/flyLight/newyears_min.glb').then(model => {
  //     // model.scene.position.z = -10
  //     scene.add(model.scene)
  //   })

  const textureloader = new THREE.TextureLoader()
  const texture = textureloader.load('/texture/vrHouse/HdrSkyCloudy004_JPG_8K.jpg')
  texture.mapping = THREE.EquirectangularReflectionMapping
  scene.background = texture
  scene.environment = texture

  console.log('vrdata', vrdata.objData.roomList)
  for (let i = 0; i < vrdata.objData.roomList.length; i++) {
    createShape({ areaList: vrdata.objData.roomList[i].areas, scene })
    createShape({ areaList: vrdata.objData.roomList[i].areas, scene, isTop: true })
  }

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    render.setSize(window.innerWidth, window.innerHeight)
  })

  function tick() {
    // const time = clock.getElapsedTime()

    render.render(scene, camera)
    requestAnimationFrame(tick)
  }

  tick()
}
