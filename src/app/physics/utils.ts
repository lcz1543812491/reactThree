import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import * as Cannon from 'cannon'

interface CreateSphereProps {
  world: any
  scene: any
  radius: number
  position: { x: number; y: number; z: number }
  plasticMaterial: Cannon.Material
  concreteMaterial: Cannon.Material
}

let sphereBody: any
let sphere: any

function createSphere(props: CreateSphereProps) {
  const { world, scene, radius, position, plasticMaterial, concreteMaterial } = props

  const geometry1 = new THREE.SphereGeometry(radius, 128, 64)
  sphere = new THREE.Mesh(geometry1, new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.3, roughness: 0.5 }))
  sphere.castShadow = true
  sphere.position.copy(position as THREE.Vector3)
  scene.add(sphere)

  const sphereShape = new Cannon.Sphere(radius)
  sphereBody = new Cannon.Body({
    mass: 1,
    shape: sphereShape,
    material: plasticMaterial
  })
  sphereBody.position.copy(position)

  sphereBody.applyLocalForce(new Cannon.Vec3(150, 0, 0), new Cannon.Vec3(0, 0, 0))

  world.addBody(sphereBody)

  const planeShape = new Cannon.Plane()
  const planeBody = new Cannon.Body({ mass: 0, material: concreteMaterial })
  planeBody.addShape(planeShape)
  planeBody.quaternion.setFromAxisAngle(new Cannon.Vec3(-1, 0, 0), Math.PI * 0.5)
  planeBody.position.y = -0.5
  world.addBody(planeBody)
}

export function inintPhysics() {
  // const gui = new dat.GUI();
  const world = new Cannon.World()
  world.gravity.set(0, -9.82, 0)

  const concreteMaterial = new Cannon.Material('concrete')
  const plasticMaterial = new Cannon.Material('plastic')

  const contactMaterial = new Cannon.ContactMaterial(concreteMaterial, plasticMaterial, {
    friction: 0.3,
    restitution: 0.8
  })

  world.addContactMaterial(contactMaterial)



  const common_material = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide })
  common_material.roughness = 0.3
  const scene = new THREE.Scene()

  const ambentLight = new THREE.AmbientLight(0xffffff, 0.2)
  // gui.add(ambentLight, 'intensity').min(0).max(1).step(0.001)
  const directLight = new THREE.DirectionalLight(0xffffff, 0.4)
  const directLightHelper = new THREE.DirectionalLightHelper(directLight, 2)
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

  const directLightShadowHelper = new THREE.CameraHelper(directLight.shadow.camera)
  directLightShadowHelper.visible = false

  scene.add(directLightShadowHelper)
  scene.add(directLightHelper)
  scene.add(ambentLight)
  scene.add(directLight)




  const camera = new THREE.PerspectiveCamera(90, (window as Window).innerWidth / (window as Window).innerHeight)

  camera.position.set(-5, 4, 3)
  scene.add(camera)

  const axisHelper = new THREE.AxesHelper()
  //scene.add(axisHelper)

  const render = new THREE.WebGL1Renderer({
    antialias: true,
    canvas: document.getElementById('galaxy') as HTMLCanvasElement
  })

  render.setSize(window.innerWidth, window.innerHeight)
  render.shadowMap.enabled = true
  render.shadowMap.type = THREE.PCFSoftShadowMap

  const controls = new OrbitControls(camera, render.domElement)
  controls.enableDamping = true

  const geometry = new THREE.PlaneGeometry(10, 10)
  const plane = new THREE.Mesh(geometry, common_material)
  plane.receiveShadow = true
  plane.rotation.x = Math.PI * 0.5
  plane.position.y = -0.5
  scene.add(plane)

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    render.setSize(window.innerWidth, window.innerHeight)
  })

  const clock = new THREE.Clock()
  let prevTime = 0

  createSphere({
    world, 
    scene, 
    radius: 0.5, 
    position: { x: 0, y: 6, z: 0 }, 
    plasticMaterial, 
    concreteMaterial
  })

  function tick() {
    const time = clock.getElapsedTime()
    const deltaTime = time - prevTime
    prevTime = time

    //console.log('sphereBody', sphereBody);
    if (sphereBody) {
      sphereBody.applyForce(new Cannon.Vec3(-0.5, 0, 0), sphereBody.position)
    }

    (world as any).step(1 / 60, deltaTime, 3)
    sphere.position.copy(sphereBody.position)


    render.render(scene, camera)
    controls.update()
    requestAnimationFrame(tick)
  }
  tick()
}
