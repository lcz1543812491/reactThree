import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { color } from 'three/examples/jsm/nodes/Nodes.js';

//const gui = new dat.GUI();
const parameter = {}



export function inintBaseAnimate() {

  const common_material = new THREE.MeshStandardMaterial({color: 0xffffff, side: THREE.DoubleSide})
  common_material.roughness = 0.3


  const scene = new THREE.Scene()


  const ambentLight = new THREE.AmbientLight(0xffffff, 1)


  const directLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directLight.position.set(2, 3, 4)


  const camera = new THREE.PerspectiveCamera(90, (window as Window).innerWidth / (window as Window).innerHeight)
  camera.position.z = 4
  scene.add(camera)

  const axisHelper = new THREE.AxesHelper()
  scene.add(axisHelper)

  const render = new THREE.WebGL1Renderer({ antialias:true, canvas: document.getElementById('galaxy') as HTMLCanvasElement })
  render.setSize(window.innerWidth, window.innerHeight)



  const controls = new OrbitControls(camera, render.domElement)
  controls.enableDamping = true


  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    render.setSize(window.innerWidth, window.innerHeight)
  })

  function tick() {
    render.render(scene, camera)
    controls.update()
    requestAnimationFrame(tick)
  }
  tick()
}
