import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import * as Cannon from 'cannon'

let world: any
let sphereBody: any

function createCannonWorld(){
  world = new Cannon.World()
  world.gravity.set(0, -9.82, 0)

  const concreteMaterial = new Cannon.Material('concrete')
  const plasticMaterial = new Cannon.Material('plastic')

  const contactMaterial = new Cannon.ContactMaterial(
    concreteMaterial, 
    plasticMaterial, 
    {
      friction: 0.3,
      restitution: 0.8
    }
  )

  world.addContactMaterial(contactMaterial)


  const sphereShape = new Cannon.Sphere(0.5)
  sphereBody = new Cannon.Body({ 
    mass: 1, 
    position: new Cannon.Vec3(0, 3, 0),
    shape: sphereShape,
    material: plasticMaterial
  })
  world.addBody(sphereBody)

  const planeShape = new Cannon.Plane()
  const planeBody = new Cannon.Body({mass: 0, material: concreteMaterial})
  planeBody.addShape(planeShape)
  planeBody.quaternion.setFromAxisAngle(new Cannon.Vec3(-1, 0, 0), Math.PI * 0.5)
  planeBody.position.y = -0.5
  world.addBody(planeBody)
}


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
  // camera.position.z = 4
  // camera.position.y = 6
  // camera.rotation.x = Math.PI * 0.5
  camera.position.set(-5, 4, 3)
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


  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    render.setSize(window.innerWidth, window.innerHeight)
  })

  const clock = new THREE.Clock()
  let prevTime = 0

  createCannonWorld()

  function tick() {

    const time = clock.getElapsedTime();
    const deltaTime = time - prevTime;
    prevTime = time;
    
    (world as any).step( 1/ 60, deltaTime, 3)
    sphere.position.x = sphereBody.position.x
    sphere.position.y = sphereBody.position.y
    sphere.position.z = sphereBody.position.z

    //console.log(camera.position)

    render.render(scene, camera)
    controls.update()
    requestAnimationFrame(tick)
  }
  tick()
}
