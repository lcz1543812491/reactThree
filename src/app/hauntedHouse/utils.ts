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

export function inintHauntedHouse() {
  const scene = new THREE.Scene()
  scene.fog = new THREE.Fog('#262837', 1, 15)

  const ambentLight = new THREE.AmbientLight('#b9d5ff', 0.12)
  const directionalLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
  directionalLight.position.set(4, 5, -2)

  scene.add(ambentLight)
  scene.add(directionalLight)

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)
  camera.position.z = 3
  camera.position.y = 8
  camera.position.x = 8
  scene.add(camera)

  const axisHelper = new THREE.AxesHelper()
  scene.add(axisHelper)

  const house = new THREE.Group()
  scene.add(house)


  const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
  doorLight.position.set(0, 2.2, 2.7)
  house.add(doorLight)

  const walls = new THREE.Mesh(new THREE.BoxGeometry(4, 2.5, 4), new THREE.MeshStandardMaterial({ color: '#ac8e82' }))
  walls.position.y = 1.25
  house.add(walls)

  const roof = new THREE.Mesh(new THREE.ConeGeometry(3.5, 1, 4), new THREE.MeshStandardMaterial({color: '#b35f45'}))
  roof.position.y = 3
  roof.rotation.y = Math.PI * 0.25
  house.add(roof)

  const textureLoader = new THREE.TextureLoader()

  const door_alpha = textureLoader.load('/texture/hauntedHouse/door/alpha.jpg')
  const door_ambient = textureLoader.load('/texture/hauntedHouse/door/ambientOcclusion.jpg')
  const door_color = textureLoader.load('/texture/hauntedHouse/door/color.jpg')
  const door_height = textureLoader.load('/texture/hauntedHouse/door/height.jpg')
  const door_metalness = textureLoader.load('/texture/hauntedHouse/door/metalness.jpg')
  const door_normal = textureLoader.load('/texture/hauntedHouse/door/normal.jpg')
  const door_roughness = textureLoader.load('/texture/hauntedHouse/door/roughness.jpg')


  const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100), 
    new THREE.MeshStandardMaterial({ 
      map: door_color,
      transparent: true,
      alphaMap: door_alpha,
      aoMap: door_ambient,
      displacementMap: door_height,
      displacementScale: 0.1,
      normalMap: door_normal,
      metalnessMap: door_metalness,
      roughnessMap: door_roughness
     }))

  //door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2))   
  door.position.y = 1
  door.position.z = 2.001

  house.add(door)

  const bushmat = new THREE.MeshStandardMaterial({color: '#89c854'})
  const bushge = new THREE.SphereGeometry(1, 16, 16)

  const bush1 = new THREE.Mesh(bushge, bushmat)
  bush1.scale.set(0.5, 0.5, 0.5)
  bush1.position.set(0.8, 0.2, 2.2)

  const bush2 = new THREE.Mesh(bushge, bushmat)
  bush2.scale.set(0.25, 0.25, 0.25)
  bush2.position.set(1.4, 0.1, 2.1)

  house.add(bush1, bush2)


  const graves = new THREE.Group()
  scene.add(graves)

  const grave_material = new THREE.MeshStandardMaterial({ color: '#b2b6b1' })
  const grave_gem = new THREE.BoxGeometry(0.6, 0.8, 0.2)

  for(let i = 0; i < 50; i++){
    const angle = Math.PI * Math.random() * 2
    const radius = 3 + Math.random() * 6
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius
    const grave = new THREE.Mesh(grave_gem, grave_material)
    grave.position.set(x, 0, z)
    grave.rotation.y = Math.random()
    grave.rotation.z = (Math.random() - 0.5) * 0.6
    graves.add(grave)
  }

  const planeGeometry = new THREE.PlaneGeometry(20, 20)
  const planeMesh = new THREE.Mesh(planeGeometry, new THREE.MeshStandardMaterial({ color: '#a9c388' }))
  planeMesh.rotation.x = -Math.PI * 0.5
  planeMesh.position.y = 0

  scene.add(planeMesh)

  const render = new THREE.WebGL1Renderer({ antialias: true })
  render.setSize(window.innerWidth, window.innerHeight)
  render.setClearColor('#262837')
  document.body.appendChild(render.domElement)

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
