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
    // console.log('event', event)
    controls.enabled = !event.value
  })

  transformControls.addEventListener('change', () => {
    if(eventObj.isOnFloor && transformControls && transformControls.object){
        transformControls.object.position.y = 0
    }
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
      gui.add(eventObj, 'setTranslate')
      gui.add(eventObj, 'setScale')
      gui.add(eventObj, 'setRotate')
      gui.add(eventObj, 'toggleSpace')
      gui.add(eventObj, 'cancel')

      const furnitureList = gui.addFolder('家具列表')

      let snapFolder = gui.addFolder('固定设置')
      snapFolder
        .add(eventObj, 'translateSnapNum', {
          不固定: null,
          1: 1,
          0.1: 0.1,
          10: 10
        })
        .name('固定位移设置')
        .onChange(() => {
          transformControls.setTranslationSnap(eventObj.translateSnapNum)
        })

        snapFolder.add(eventObj, 'isOnFloor')

        
      const meshList = [
        { name: '盆栽', path: '/model/editFurniture/plants-min.glb', addMesh: () => {} },
        { name: '单人沙发', path: '/model/editFurniture/sofa_chair_min.glb', addMesh: () => {} }
      ]
      const modelList = []

      const meshesNum = {} as any

      meshList.forEach((item: any) => {
        item.addMesh = () => {
          loader.load(item.path, itemModel => {
            const object3d = itemModel.scene
            modelList.push({ ...item, object3d })
            scene.add(object3d)
            transformControls.attach(object3d)

            const select = {
              selectFun: () => {
                transformControls.attach(object3d)
              }
            }

            meshesNum[item.name] = meshesNum[item.name] ? meshesNum[item.name] + 1 : 1

            furnitureList.add(select, 'selectFun').name(item.name + meshesNum[item.name])
          })
        }
        gui.add(item, 'addMesh').name(item.name)
      })
    }
  })

  const eventObj = {
    addScene: () => {
      scene.add(basicScene)
    },
    setTranslate: () => {
      transformControls.setMode('translate')
    },
    setRotate: () => {
      transformControls.setMode('rotate')
    },
    setScale: () => {
      transformControls.setMode('scale')
    },
    toggleSpace: () => {
      transformControls.setSpace(transformControls.space === 'local' ? 'world' : 'local')
    },
    cancel: () => {
      transformControls.detach()
    },
    translateSnapNum: null,
    isOnFloor: false
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
