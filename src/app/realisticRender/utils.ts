import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { mod } from 'three/examples/jsm/nodes/Nodes.js';


export function realisticRender() {

  const scene = new THREE.Scene()


  const ambentLight = new THREE.AmbientLight(0xffffff, 0.2)
  const directLight = new THREE.DirectionalLight(0xffffff, 1)
  directLight.position.set(0.25, 3, -2.25)
  directLight.castShadow = true

  directLight.shadow.mapSize.width = 1024
  directLight.shadow.mapSize.height = 1024

  directLight.shadow.camera.top = 2
  directLight.shadow.camera.bottom = -2
  directLight.shadow.camera.left = -2
  directLight.shadow.camera.right = 2

  directLight.shadow.camera.near = 1
  directLight.shadow.camera.far = 9

  directLight.shadow.radius = 10

  const directLightShadowHelper = new THREE.CameraHelper( directLight.shadow.camera );
  directLightShadowHelper.visible = false
  scene.add(directLightShadowHelper);

  const guiElements = document.getElementsByClassName('dg ac')
  let gui: any;
  if(guiElements.length === 0){
    // console.log(guiElements)
    const dat = require('dat.gui')
    gui = new dat.GUI();
    gui.add(directLight, 'intensity').min(0).max(10).step(0.001)
    gui.add(directLight.position, 'x').min(-5).max(5).name('x')
    gui.add(directLight.position, 'y').min(-5).max(5).name('y')
    gui.add(directLight.position, 'z').min(-5).max(5).name('z')
  }

  //scene.add(ambentLight)
  scene.add(directLight)


  const testSphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32), 
    new THREE.MeshStandardMaterial()
  )

  scene.add(testSphere)

  const camera = new THREE.PerspectiveCamera(90, (window as Window).innerWidth / (window as Window).innerHeight)
  camera.position.z = 4
  scene.add(camera)

  const axisHelper = new THREE.AxesHelper()
  scene.add(axisHelper)

  const render = new THREE.WebGLRenderer({ antialias:true, canvas: document.getElementById('galaxy') as HTMLCanvasElement })
  render.setSize(window.innerWidth, window.innerHeight)
  render.shadowMap.enabled = true
  render.shadowMap.type = THREE.PCFSoftShadowMap
  // render.physicallyCorrectLights = true
  // console.log('render', render.physicallyCorrectLights)


  const controls = new OrbitControls(camera, render.domElement)
  controls.enableDamping = true


  const clock = new THREE.Clock()

  const gltfLoader = new GLTFLoader()

  gltfLoader.load('/model/FlightHelmet/glTF/FlightHelmet.gltf', (model) => {
    model.scene.scale.set(10, 10, 10)
    model.scene.position.set(0, -4, 0)
    scene.add(model.scene)
    if(gui){
        gui.add(model.scene.rotation, 'y').min(-Math.PI).max(Math.PI).step(0.01)
    }
  })
 

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    render.setSize(window.innerWidth, window.innerHeight)
  })

  function tick() {
    const time = clock.getElapsedTime()
    render.render(scene, camera)
    controls.update()
    requestAnimationFrame(tick)
  }

  tick()
}