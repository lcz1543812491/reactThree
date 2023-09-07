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

export function inintThreeFont() {
  const scene = new THREE.Scene()
  const ambentLight = new THREE.AmbientLight(0xfff, 0.1)

  const pointLight = new THREE.PointLight(0xfff, 0.8)
  pointLight.position.set(2, 3, 4)

  scene.add(ambentLight)

  scene.add(pointLight)

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)
  camera.position.z = 3

  scene.add(camera)

  const axisHelper = new THREE.AxesHelper()
  scene.add(axisHelper)

  const render = new THREE.WebGL1Renderer()

  render.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(render.domElement)

  const fontLoader = new FontLoader()

  const textureLoader = new THREE.TextureLoader()

  const texture1 = textureLoader.load('/texture/texture-1.png')
  console.log('texture1', texture1)

  //   console.log('font1', font1)
  // console.log('inter', Inter)

  fontLoader.load('/helvetiker_regular.typeface.json', font => {
    console.log('font', font)
    const geometry = new TextGeometry('Hello three.js!', {
      font,
      size: 0.5,
      height: 0.2,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5
    })

    console.log('geometry.computeBoundingBox', geometry)
    geometry.center()

    const material3 = new THREE.MeshMatcapMaterial({ matcap: texture1 })
    // material3.wireframe = true

    const text = new THREE.Mesh(geometry, material3)
    const dotsge = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
    // const dotmat = new THREE.MeshMatcapMaterial({ matcap: texture1 })

    for (let i = 0; i < 90; i++) {
      const dotmesh = new THREE.Mesh(dotsge, material3)

      dotmesh.position.x = (Math.random() - 0.5) * 10
      dotmesh.position.y = (Math.random() - 0.5) * 10
      dotmesh.position.z = (Math.random() - 0.5) * 10

      dotmesh.rotation.x = Math.random() * Math.PI
      dotmesh.rotation.y = Math.random() * Math.PI

      const scale = Math.random()
      dotmesh.scale.x = scale
      dotmesh.scale.y = scale
      dotmesh.scale.z = scale

      scene.add(dotmesh)
    }

    scene.add(text)
  })

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
