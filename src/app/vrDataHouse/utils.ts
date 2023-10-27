import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import gsap from 'gsap'
import { VrData } from './interface'
import { createShape } from './createShape'
import { createWallShader } from './wallShader/wallShader'
import { createWall } from './wallShader/createWall'

export function vrDataHouse(props: { vrdata: VrData }) {
  const { vrdata } = props

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(75, (window as Window).innerWidth / (window as Window).innerHeight)
  //camera.position.z = 15
  camera.position.set(3, 7.8, -3)
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
  // const texture = textureloader.load('/texture/vrHouse/HdrSkyCloudy004_JPG_8K.jpg')
  // texture.mapping = THREE.EquirectangularReflectionMapping
  // scene.background = texture
  // scene.environment = texture

  // console.log('vrdata', vrdata.wallRelation)
  const idToPanorama: { [key: string]: any } = {}

  for (let i = 0; i < vrdata.objData.roomList.length; i++) {
    const roomitem = vrdata.objData.roomList[i]

    const room1 = createShape({ areaList: roomitem.areas })
    const room2 = createShape({ areaList: roomitem.areas, isTop: true })
    scene.add(room1, room2)

    for (let j = 0; j < vrdata.panoramaLocation.length; j++) {
      const panorama = vrdata.panoramaLocation[j]
      if (panorama.roomId === roomitem.roomId) {
        ;(panorama as any)['material'] = createWallShader(panorama)
        idToPanorama[panorama.roomId] = panorama
      }
    }

    // console.log('room1', room1.material.side)
    // console.log('room2', room2.material.side)

    room1.material = idToPanorama[roomitem.roomId].material
    room1.material.side = THREE.DoubleSide

    room2.material = idToPanorama[roomitem.roomId].material.clone()
    room2.material.side = THREE.FrontSide
  }

  for (let i = 0; i < vrdata.wallRelation.length; i++) {
    const wallPoints = vrdata.wallRelation[i].wallPoints
    const faceRelation = vrdata.wallRelation[i].faceRelation

    const faceRelation1 = faceRelation.map((item: any) => {
      // debugger
      return { ...item, panorama: idToPanorama[item.roomId] }
      // item['panorama'] = idToPanorama[item.roomId];
    })

    // console.log('faceRelation', faceRelation1)

    const mesh = createWall({ wallPoints, faceRelation: faceRelation1 })
    scene.add(mesh)
  }

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    render.setSize(window.innerWidth, window.innerHeight)
  })

  function tick() {
    // const time = clock.getElapsedTime()
    //console.log(camera.position)

    render.render(scene, camera)
    requestAnimationFrame(tick)
  }

  tick()
}
