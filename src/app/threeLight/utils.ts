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


export function inintThreeLight() {
  const gui = new dat.GUI();

  const common_material = new THREE.MeshStandardMaterial({color: 0xffffff, side: THREE.DoubleSide})
  common_material.roughness = 0.3


  const scene = new THREE.Scene()


  const ambentLight = new THREE.AmbientLight(0xffffff, 0.5)
  gui.add(ambentLight, 'intensity').min(0).max(1).step(0.001)


  const directLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directLight.position.set(2, 3, 4)

  const light = new THREE.HemisphereLight( 0xff0000, 0x0000ff, 0.8 );

  const pointLight = new THREE.PointLight( 0xff9000, 2, 1 ); 
  pointLight.position.set( 1, 0.5, 1 ); 

  scene.add(pointLight);
  scene.add(light);
  scene.add(ambentLight)
  scene.add(directLight)

  const camera = new THREE.PerspectiveCamera(90, (window as Window).innerWidth / (window as Window).innerHeight)
  camera.position.z = 4
  scene.add(camera)

  const axisHelper = new THREE.AxesHelper()
  scene.add(axisHelper)

  const render = new THREE.WebGL1Renderer({ antialias:true })
  render.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(render.domElement)


  const controls = new OrbitControls(camera, render.domElement)
  controls.enableDamping = true


  const geometry = new THREE.PlaneGeometry( 10, 10 );
  const plane = new THREE.Mesh( geometry, common_material );
  plane.rotation.x = Math.PI * 0.5
  scene.add( plane );


  const geometry1 = new THREE.SphereGeometry( 0.8, 32, 16 ); 
  const sphere = new THREE.Mesh( geometry1, common_material );
  sphere.position.y = 1
  scene.add(sphere)

  const geometry2 = new THREE.BoxGeometry( 1, 1, 1 ); 
  const cube = new THREE.Mesh( geometry2, common_material ); 
  cube.position.y =  1
  cube.position.x = -2
  scene.add( cube );


  const geometry3 = new THREE.TorusGeometry( 0.5, 0.4, 16, 100 ); 
  const torus = new THREE.Mesh( geometry3, common_material ); 
  torus.position.y = 1
  torus.position.x = 2
  scene.add( torus );


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
