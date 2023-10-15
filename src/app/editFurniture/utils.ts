import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';


export function initEditFurniture() {

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xcccccc)

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


  
  const render = new THREE.WebGLRenderer({ antialias:true, canvas: document.getElementById('galaxy') as HTMLCanvasElement })
  render.shadowMap.enabled = true
  render.shadowMap.type = THREE.PCFSoftShadowMap
  render.setSize(window.innerWidth, window.innerHeight)


  const controls = new OrbitControls(camera, render.domElement)
  controls.enableDamping = true


  let basicScene: THREE.Group = null as unknown as THREE.Group

  const loader = new GLTFLoader()

  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('draco/')
  loader.setDRACOLoader(dracoLoader)
  loader.load('/model/editFurniture/house-scene-min.glb', (model) => {

    //console.log(model.scene)
    // scene.add(model.scene)
    basicScene = model.scene
    const guiElements = document.getElementsByClassName('dg ac')
    if(guiElements.length === 0){
      const dat = require('dat.gui')
      const gui = new dat.GUI();
      gui.add(eventObj, 'addScene')
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
