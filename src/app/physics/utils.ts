import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import * as cannon from 'cannon'



export function inintPhysics() {
  // const gui = new dat.GUI();

  const common_material = new THREE.MeshStandardMaterial({color: 0xffffff, side: THREE.DoubleSide})
  common_material.roughness = 0.3

  const scene = new THREE.Scene()


  const ambentLight = new THREE.AmbientLight(0xffffff, 0.2)
  // gui.add(ambentLight, 'intensity').min(0).max(1).step(0.001)


  const directLight = new THREE.DirectionalLight(0xffffff, 0.4)
  const directLightHelper = new THREE.DirectionalLightHelper( directLight, 2 );
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
  scene.add(directLightHelper)


  scene.add(ambentLight)
  scene.add(directLight)


  const camera = new THREE.PerspectiveCamera(90, (window as Window).innerWidth / (window as Window).innerHeight)
  camera.position.z = 4
  scene.add(camera)

  const axisHelper = new THREE.AxesHelper()
  //scene.add(axisHelper)

  const render = new THREE.WebGL1Renderer({ 
    antialias:true, 
    canvas: document.getElementById('galaxy') as HTMLCanvasElement 
  })

  render.setSize(window.innerWidth, window.innerHeight)
  render.shadowMap.enabled = true
  render.shadowMap.type = THREE.PCFSoftShadowMap


  const controls = new OrbitControls(camera, render.domElement)
  controls.enableDamping = true



  const geometry1 = new THREE.SphereGeometry( 0.5, 128, 64 ); 
  const sphere = new THREE.Mesh( geometry1, common_material );
  sphere.castShadow = true
//   sphere.position.y = 1
  scene.add(sphere)

  const geometry = new THREE.PlaneGeometry( 10, 10 );
  const plane = new THREE.Mesh( geometry, common_material );
  plane.receiveShadow = true
  plane.rotation.x = Math.PI * 0.5
  plane.position.y = -0.5
  scene.add( plane );

  console.log(plane.position)

  const clock = new THREE.Clock()


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
