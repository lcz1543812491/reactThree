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
  const textureLoader = new THREE.TextureLoader()

  scene.fog = new THREE.Fog('#262837', 1, 25)

  const ambentLight = new THREE.AmbientLight('#b9d5ff', 0.05)
  const directionalLight = new THREE.DirectionalLight('#b9d5ff', 0.1)
  directionalLight.castShadow = true
  directionalLight.position.set(4, 5, -2)

  scene.add(ambentLight)
  scene.add(directionalLight)

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight)
  camera.position.z = 3
  camera.position.y = 6
  camera.position.x = -6
  scene.add(camera)

  const axisHelper = new THREE.AxesHelper()
  scene.add(axisHelper)

  const house = new THREE.Group()
  scene.add(house)


  const doorLight = new THREE.PointLight('#ff7d46', 2, 7)
  doorLight.position.set(0, 2.2, 2.7)
  doorLight.castShadow = true
  doorLight.shadow.mapSize.width = 256
  doorLight.shadow.mapSize.height = 256
  doorLight.shadow.camera.far = 7
  house.add(doorLight)

  const ghost = new THREE.PointLight('#ff00ff', 3, 3)
  ghost.castShadow = true
  ghost.shadow.mapSize.width = 256
  ghost.shadow.mapSize.height = 256
  ghost.shadow.camera.far = 7

  scene.add(ghost)


  const wall_color = textureLoader.load('/texture/hauntedHouse/bricks/color.jpg')
  const wall_ambient = textureLoader.load('/texture/hauntedHouse/bricks/ambientOcclusion.jpg')
  const wall_normal = textureLoader.load('/texture/hauntedHouse/bricks/normal.jpg')
  const wall_roughness = textureLoader.load('/texture/hauntedHouse/bricks/roughness.jpg')

  const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4), 
    new THREE.MeshStandardMaterial({ 
      map: wall_color,
      aoMap: wall_ambient,
      normalMap: wall_normal,
      roughnessMap: wall_roughness
    }))
  walls.position.y = 1.25
  walls.castShadow = true
  house.add(walls)

  const roof = new THREE.Mesh(new THREE.ConeGeometry(3.5, 1, 4), new THREE.MeshStandardMaterial({color: '#b35f45'}))
  roof.position.y = 3
  roof.rotation.y = Math.PI * 0.25
  house.add(roof)

  
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
  bush1.castShadow = true

  const bush2 = new THREE.Mesh(bushge, bushmat)
  bush2.scale.set(0.25, 0.25, 0.25)
  bush2.position.set(1.4, 0.1, 2.1)
  bush2.castShadow = true

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
    grave.castShadow = true
    graves.add(grave)
  }

  const floor_ambient = textureLoader.load('/texture/hauntedHouse/grass/ambientOcclusion.jpg')
  const floor_color = textureLoader.load('/texture/hauntedHouse/grass/color.jpg')
  const floor_normal = textureLoader.load('/texture/hauntedHouse/grass/normal.jpg')
  const floor_roughness = textureLoader.load('/texture/hauntedHouse/grass/roughness.jpg')

  floor_ambient.repeat.set(8, 8)
  floor_color.repeat.set(8, 8)
  floor_normal.repeat.set(8, 8)
  floor_roughness.repeat.set(8, 8)

  floor_ambient.wrapS = THREE.RepeatWrapping
  floor_color.wrapS = THREE.RepeatWrapping
  floor_normal.wrapS = THREE.RepeatWrapping
  floor_roughness.wrapS = THREE.RepeatWrapping

  floor_ambient.wrapT = THREE.RepeatWrapping
  floor_color.wrapT = THREE.RepeatWrapping
  floor_normal.wrapT = THREE.RepeatWrapping
  floor_roughness.wrapT = THREE.RepeatWrapping


  const planeGeometry = new THREE.PlaneGeometry(20, 20)
  const planeMesh = new THREE.Mesh(planeGeometry, 
    new THREE.MeshStandardMaterial(
      { 
        map: floor_color,
        aoMap: floor_ambient,
        normalMap: floor_normal,
        roughnessMap: floor_roughness
      }
      )
  )
  planeMesh.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(planeMesh.geometry.attributes.uv.array, 2))
  planeMesh.rotation.x = -Math.PI * 0.5
  planeMesh.position.y = 0
  planeMesh.receiveShadow = true

  scene.add(planeMesh)

  const render = new THREE.WebGL1Renderer({ antialias: true })
  render.setSize(window.innerWidth, window.innerHeight)
  render.setClearColor('#262837')
  render.shadowMap.enabled = true
  render.shadowMap.type = THREE.PCFSoftShadowMap
  document.body.appendChild(render.domElement)

  const controls = new OrbitControls(camera, render.domElement)
  controls.enableDamping = true

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    render.setSize(window.innerWidth, window.innerHeight)
  })


  const clock = new THREE.Clock()

  function tick() {
    
    const time = clock.getElapsedTime() * 0.6
    ghost.position.x = Math.cos(time) * 6
    ghost.position.z = Math.sin(time) * 6

    ghost.position.y = Math.abs(Math.sin(time) * 3)

    render.render(scene, camera)
    controls.update()
    requestAnimationFrame(tick)
  }
  tick()
}
