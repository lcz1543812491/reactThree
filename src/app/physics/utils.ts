import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import * as Cannon from 'cannon'

interface CreateSphereProps {
  world: any
  scene: any
  radius: number
  position: { x: number; y: number; z: number },
  audio: HTMLAudioElement
}

interface createBoxProps extends Pick<CreateSphereProps, 'world' | 'scene' | 'position'| 'audio'> {
  width: number;
  height: number;
  depth: number
}


const objectArr = [] as any[]
let gui: dat.GUI
// let sphereBody: any
// let sphere: any 

function createBox(props: createBoxProps){
  const { world, scene, position, width, height, depth, audio } = props
  const geometry1 = new THREE.BoxGeometry(width, height, depth)
  const box = new THREE.Mesh(
    geometry1, 
    new THREE.MeshStandardMaterial({
      color: 0xffffff, 
      metalness: 0.6, 
      roughness: 0.5
    })
  )

  box.castShadow = true
  box.position.copy(position as THREE.Vector3)
  scene.add(box)


  const boxShape = new Cannon.Box(new Cannon.Vec3( width * 0.5, height * 0.5, depth * 0.5 ))
  const boxBody = new Cannon.Body({mass: 1, shape: boxShape})
  boxBody.position.copy(position as any)
  boxBody.addEventListener('collide', (e: any) => {
    // console.log('e', e.contact.getImpactVelocityAlongNormal())
    if(e.contact.getImpactVelocityAlongNormal() > 2){
      audio.play.bind(audio)()
    }
  })
  world.addBody(boxBody)

  objectArr.push({sphere: box, sphereBody: boxBody})
}

function createSphere(props: CreateSphereProps) {
  const { world, scene, radius, position, audio } = props
 
  const geometry1 = new THREE.SphereGeometry(radius, 128, 64)
  const sphere = new THREE.Mesh(geometry1, new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.3, roughness: 0.5 }))
  sphere.castShadow = true
  sphere.position.copy(position as THREE.Vector3)
  scene.add(sphere)

  const sphereShape = new Cannon.Sphere(radius)
  const sphereBody = new Cannon.Body({
    mass: 1,
    shape: sphereShape,
  })
  sphereBody.position.copy(position as any)

  sphereBody.applyLocalForce(new Cannon.Vec3(150, 0, 0), new Cannon.Vec3(0, 0, 0))
  sphereBody.addEventListener('collide', (e: any) => {
    // console.log('e', e.contact.getImpactVelocityAlongNormal())
    if(e.contact.getImpactVelocityAlongNormal() > 2){
      audio.play.bind(audio)()
    }
  })

  world.addBody(sphereBody)


  objectArr.push({sphere, sphereBody})
}

export function inintPhysics(audioRef: any) {
  // console.log('audioRef', audioRef.current.children[1].play)
  // audioRef.current.children[1].play()

  const audio = new Audio('/physics/hit.mp3')
  console.log('audio', audio.play)
  audio.play.call(audio)

  const world = new Cannon.World()
  world.broadphase = new Cannon.SAPBroadphase(world)
  world.allowSleep = true
  world.gravity.set(0, -9.82, 0)

  const planeShape = new Cannon.Plane()
  const planeBody = new Cannon.Body({ mass: 0 })
  planeBody.addShape(planeShape)
  planeBody.quaternion.setFromAxisAngle(new Cannon.Vec3(-1, 0, 0), Math.PI * 0.5)
  planeBody.position.y = -0.5
  world.addBody(planeBody)

  const defaultMaterial = new Cannon.Material('default')

  const contactMaterial = new Cannon.ContactMaterial(defaultMaterial, defaultMaterial, {
    friction: 0.3,
    restitution: 0.5
  })

  world.addContactMaterial(contactMaterial)
  world.defaultContactMaterial = contactMaterial

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

  directLight.shadow.camera.top = 4
  directLight.shadow.camera.bottom = -4
  directLight.shadow.camera.left = -4
  directLight.shadow.camera.right = 4

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
    audio
  })

  const addSphere = {
    addSphere: () =>
      createSphere({
        world,
        scene,
        radius: Math.random() * 0.8,
        position: { x: (Math.random() - 0.5) * 6, y: 6, z: (Math.random() - 0.5) * 6 },
        audio
      })
  }

  const addBox = {
    addBox: () =>
      createBox({
        world,
        scene,
        width: Math.random(),
        height: Math.random(),
        depth: Math.random(),
        position: { x: (Math.random() - 0.5) * 6, y: 6, z: (Math.random() - 0.5) * 6 },
        audio
      })
  }

  if(!gui){
    gui = new dat.GUI()
    gui.add(addSphere, 'addSphere')
    gui.add(addBox, 'addBox')
  }

  function tick() {
    const time = clock.getElapsedTime()
    const deltaTime = time - prevTime
    prevTime = time;

    //console.log('sphereBody', sphereBody);
    // if (sphereBody) {
    //   sphereBody.applyForce(new Cannon.Vec3(-0.5, 0, 0), sphereBody.position)
    // }

    (world as any).step(1 / 60, deltaTime, 3)

    // sphere.position.copy(sphereBody.position)

    if(objectArr.length > 0){
      objectArr.forEach((item) => {
        // console.log('objectArr', item)
        item.sphere.position.copy(item.sphereBody.position)
        item.sphere.quaternion.copy(item.sphereBody.quaternion)
        item.sphereBody.applyForce(new Cannon.Vec3(-0.5, 0, 0), item.sphereBody.position)
      })
    }

    render.render(scene, camera)
    controls.update()
    requestAnimationFrame(tick)
  }
  tick()
}
