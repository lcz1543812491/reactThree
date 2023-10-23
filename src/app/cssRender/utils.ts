import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

const EARTH_RADIUS = 1
const MOON_RADIUS = 0.27

interface InitCssRenderProps {
  earthRef: HTMLElement
  moonRef: HTMLElement
  labelRender: HTMLElement
}

export function initCssRender(props: InitCssRenderProps) {
  const { earthRef, labelRender: labelRenderRef, moonRef } = props

  const scene = new THREE.Scene()

  const dirLight = new THREE.DirectionalLight(0xffffff)
  dirLight.position.set(0, 0, 1)
  scene.add(dirLight)
  const light = new THREE.AmbientLight(0xffffff, 0.5) // soft white light
  scene.add(light)

  const textureLoader = new THREE.TextureLoader()

  const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS, 16, 16)
  const earthMaterial = new THREE.MeshPhongMaterial({
    specular: 0x333333,
    shininess: 5,
    map: textureLoader.load('/texture/planets/earth_atmos_2048.jpg'),
    specularMap: textureLoader.load('/texture/planets//earth_specular_2048.jpg'),
    normalMap: textureLoader.load('/texture/planets/earth_normal_2048.jpg'),
    normalScale: new THREE.Vector2(0.85, 0.85)
  })

  const earth = new THREE.Mesh(earthGeometry, earthMaterial)
  //earth.rotation.y = Math.PI
  scene.add(earth)

  const moonGeometry = new THREE.SphereGeometry(MOON_RADIUS, 16, 16)
  const moonMaterial = new THREE.MeshPhongMaterial({
    shininess: 5,
    map: textureLoader.load('/texture/planets/moon_1024.jpg')
  })
  const moon = new THREE.Mesh(moonGeometry, moonMaterial)
  scene.add(moon)

  // const earthLabel = new CSS2DObject(earthRef)
  // earthLabel.position.set(-0.3, 0.5, -0.9)
  // earth.add(earthLabel)

  const chinaDiv = document.createElement('div')
  chinaDiv.className = 'label1 text-white'
  chinaDiv.innerHTML = '中国'
  const chinaLabel = new CSS2DObject(chinaDiv)
  chinaLabel.position.set(-0.3, 0.5, -0.9)
  earth.add(chinaLabel)
  // console.log(chinaLabel)

  const moonLabel = new CSS2DObject(moonRef)
  moonLabel.position.set(0, 1, 0)
  moon.add(moonLabel)

  const labelRender = new CSS2DRenderer({ element: labelRenderRef })
  // console.log(labelRender)
  labelRender.setSize(window.innerWidth, window.innerHeight)
  //document.appendChild(labelRender.domElement)

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200)
  camera.position.set(0, 5, -10)

  const axisHelper = new THREE.AxesHelper(100)
  scene.add(axisHelper)

  const render = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById('galaxy') as HTMLCanvasElement })
  render.setSize(window.innerWidth, window.innerHeight)
  //   render.shadowMap.enabled = true
  //   render.shadowMap.type = THREE.PCFSoftShadowMap
  render.outputColorSpace = THREE.SRGBColorSpace
  render.toneMapping = THREE.ACESFilmicToneMapping
  //render.toneMappingExposure = 0.1

  const controls = new OrbitControls(camera, labelRender.domElement)
  controls.enableDamping = true
  // controls.autoRotate = true
  // controls.autoRotateSpeed = 0.5
  // controls.maxPolarAngle = Math.PI
  // controls.minPolarAngle = (Math.PI / 4) * 2

  const clock = new THREE.Clock()
  const raycaster = new THREE.Raycaster()

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    render.setSize(window.innerWidth, window.innerHeight)
    labelRender.setSize(window.innerWidth, window.innerHeight)
  })

  function tick() {
    requestAnimationFrame(tick)
    const elapsed = clock.getElapsedTime()
    moon.position.set(Math.sin(elapsed) * 5, 0, Math.cos(elapsed) * 5)
    render.render(scene, camera)
    controls.update()
    labelRender.render(scene, camera)

    const chinaPosition = chinaLabel.position.clone()
    const labelDistance = chinaPosition.distanceTo(camera.position)
    chinaPosition.project(camera)

    raycaster.setFromCamera(chinaPosition as any, camera)
    const intersects = raycaster.intersectObjects(scene.children)
    // console.log('intersects', intersects)
    const minDistance = intersects[0].distance
    // console.log(minDistance, labelDistance)
    // for (let i = 0; i < intersects.length; i++) {
    //   intersects[i].object.material.color.set(0xff0000)
    // }

    if (minDistance < labelDistance) {
      //console.log('none', chinaLabel.element.style)
      chinaLabel.element.style.display = 'none'
    } else {
      // console.log('visible')
      chinaLabel.element.style.display = 'block'
    }
  }

  tick()
}
