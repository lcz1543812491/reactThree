import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { TransformControls } from 'three/addons/controls/TransformControls.js'

export function initEditFurniture() {
  const scene = new THREE.Scene()

  const gridhelper = new THREE.GridHelper(50, 50)
  gridhelper.material.opacity = 0.25
  gridhelper.material.transparent = true

  scene.add(gridhelper)

  const ambentLight = new THREE.AmbientLight(0xffffff, 2)
  scene.add(ambentLight)

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)
  camera.position.set(8, 2.5, 3)
  camera.lookAt(0, 1.2, 0)

  scene.add(camera)

  const axisHelper = new THREE.AxesHelper()
  scene.add(axisHelper)

  const render = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById('galaxy') as HTMLCanvasElement })
  // render.shadowMap.enabled = true
  // render.shadowMap.type = THREE.PCFSoftShadowMap
  render.toneMapping = THREE.ReinhardToneMapping
  render.toneMappingExposure = 1
  render.setSize(window.innerWidth, window.innerHeight)

  const controls = new OrbitControls(camera, render.domElement)
  controls.enableDamping = true

  const transformControls = new TransformControls(camera, render.domElement)
  transformControls.addEventListener('change', tick)
  transformControls.addEventListener('dragging-changed', event => {
    console.log('event', event)
    controls.enabled = !event.value
  })

  scene.add(transformControls)

  let rgbeLoader = new RGBELoader()
  rgbeLoader.load('/model/editFurniture/Alex_Hart-Nature_Lab_Bones_2k.hdr', envMap => {
    // 设置球形贴图
    // envMap.mapping = THREE.EquirectangularReflectionMapping;
    envMap.mapping = THREE.EquirectangularRefractionMapping
    // 设置环境贴图
    // scene.background = envMap;
    scene.background = new THREE.Color(0xcccccc)
    // 设置环境贴图
    scene.environment = envMap
  })

  let basicScene: THREE.Group = null as unknown as THREE.Group

  const loader = new GLTFLoader()

  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('draco/')
  loader.setDRACOLoader(dracoLoader)
  loader.load('/model/editFurniture/house-scene-min.glb', model => {
    basicScene = model.scene
    const guiElements = document.getElementsByClassName('dg ac')
    if (guiElements.length === 0) {
      const dat = require('dat.gui')
      const gui = new dat.GUI()
      gui.add(eventObj, 'addScene')

      const meshList = [
        { name: '盆栽', path: '/model/editFurniture/plants-min.glb', addMesh: () => {} },
        { name: '单人沙发', path: '/model/editFurniture/sofa_chair_min.glb', addMesh: () => {} }
      ]
      const modelList = []
      meshList.forEach(item => {
        item.addMesh = () => {
          loader.load(item.path, model => {
            modelList.push({ ...item, object3d: model.scene })
            scene.add(model.scene)
            transformControls.attach(model.scene)
          })
        }
        gui.add(item, 'addMesh').name(item.name)
      })
    }
  })

  const eventObj = {
    addScene: () => {
      scene.add(basicScene)
    }
  }

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    render.setSize(window.innerWidth, window.innerHeight)
  })

  const clock = new THREE.Clock()

  function tick() {
    // console.log(camera.position)
    // const current_time = clock.getElapsedTime()

    render.render(scene, camera)
    controls.update()
    requestAnimationFrame(tick)
  }
  tick()
}
