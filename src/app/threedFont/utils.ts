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

  //   console.log('font1', font1)
  // console.log('inter', Inter)

  fontLoader.load('/helvetiker_regular.typeface.json', font => {
    console.log('font', font)
    const geometry = new TextGeometry('Hello three.js!', {
      font,
      size: 0.5,
      height: 0.5,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5
    })

    const material3 = new THREE.MeshBasicMaterial()

    const text = new THREE.Mesh(geometry, material3)

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
