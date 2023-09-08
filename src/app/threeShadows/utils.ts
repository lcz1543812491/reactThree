import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import * as dat from 'dat.gui'
import sphereImage from '../assets/texture1/1/MetalBronzeWorn001_Sphere.png'
import sphereMetalImage from '../assets/texture1/1/MetalBronzeWorn001_METALNESS_2K_METALNESS.png'
import font1 from 'three/examples/fonts/helvetiker_regular.typeface.json'
import { Inter, Roboto_Mono } from 'next/font/google'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'


export function inintThreeShadows() {
  const gui = new dat.GUI();

  const common_material = new THREE.MeshStandardMaterial({color: 0xffffff, side: THREE.DoubleSide})
  common_material.roughness = 0.3

  const scene = new THREE.Scene()


  const ambentLight = new THREE.AmbientLight(0xffffff, 0.2)
  gui.add(ambentLight, 'intensity').min(0).max(1).step(0.001)


  const directLight = new THREE.DirectionalLight(0xffffff, 0.4)
  directLight.position.set(2, 3, 4)
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

  const spotLight = new THREE.SpotLight(0xffffff, 4, 5, Math.PI * 0.4)
  spotLight.castShadow = true
  spotLight.shadow.mapSize.width = 1024
  spotLight.shadow.mapSize.height =  1024
  spotLight.shadow.camera.fov = 40
  spotLight.shadow.camera.near = 0.7
  spotLight.shadow.camera.far = 9
  spotLight.position.set(0, 3, 2)


  const spotLightHelper = new THREE.CameraHelper(spotLight.shadow.camera)

  scene.add(ambentLight)
  scene.add(directLight)
  scene.add(spotLight)
  scene.add(spotLight.target)
  scene.add(spotLightHelper)


  const camera = new THREE.PerspectiveCamera(90, (window as Window).innerWidth / (window as Window).innerHeight)
  camera.position.z = 4
  scene.add(camera)

  const axisHelper = new THREE.AxesHelper()
  scene.add(axisHelper)

  const render = new THREE.WebGL1Renderer({ antialias:true })
  render.setSize(window.innerWidth, window.innerHeight)
  render.shadowMap.enabled = true
  render.shadowMap.type = THREE.PCFSoftShadowMap
  document.body.appendChild(render.domElement)


  const controls = new OrbitControls(camera, render.domElement)
  controls.enableDamping = true



  const geometry1 = new THREE.SphereGeometry( 0.8, 64, 32 ); 
  const sphere = new THREE.Mesh( geometry1, common_material );
  sphere.castShadow = true
  sphere.position.y = 1
  scene.add(sphere)

  const geometry = new THREE.PlaneGeometry( 10, 10 );
  const plane = new THREE.Mesh( geometry, common_material );
  plane.receiveShadow = true
  plane.rotation.x = Math.PI * 0.5
  scene.add( plane );


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
