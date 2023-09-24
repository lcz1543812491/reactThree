import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// @ts-ignore
import testVertexShader from './shader/verticxShader.glsl'
// @ts-ignore
import testFragmentShader from './shader/fragment.glsl'

export function initShader() {

  const scene = new THREE.Scene()


  const ambentLight = new THREE.AmbientLight(0xffffff, 0.2)
  const directLight = new THREE.DirectionalLight(0xffffff, 1)
  directLight.position.set(0.25, 3, -2.25)
  directLight.castShadow = true

  directLight.shadow.mapSize.width = 1024
  directLight.shadow.mapSize.height = 1024

  directLight.shadow.camera.top = 2
  directLight.shadow.camera.bottom = -2
  directLight.shadow.camera.left = -2
  directLight.shadow.camera.right = 2

  directLight.shadow.camera.near = 1
  directLight.shadow.camera.far = 15

  directLight.shadow.radius = 10

  const directLightShadowHelper = new THREE.CameraHelper( directLight.shadow.camera );
  directLightShadowHelper.visible = false
  scene.add(directLightShadowHelper);


  scene.add(ambentLight)
  //scene.add(directLight)



  const camera = new THREE.PerspectiveCamera(45, (window as Window).innerWidth / (window as Window).innerHeight)
  camera.position.z = 2
  scene.add(camera)

  const axisHelper = new THREE.AxesHelper()
  scene.add(axisHelper)

  const render = new THREE.WebGLRenderer({ antialias:true, canvas: document.getElementById('galaxy') as HTMLCanvasElement })
  render.setSize(window.innerWidth, window.innerHeight)
  render.shadowMap.enabled = true
  render.shadowMap.type = THREE.PCFSoftShadowMap
  render.outputColorSpace = THREE.SRGBColorSpace
  render.toneMapping = THREE.ACESFilmicToneMapping
  render.toneMappingExposure = 2


  const controls = new OrbitControls(camera, render.domElement)
  controls.enableDamping = true


  const clock = new THREE.Clock()


  const material = new THREE.ShaderMaterial(
    {
      vertexShader: testVertexShader,
      fragmentShader: testFragmentShader,
    }
  )

  const planeGeometry = new THREE.PlaneGeometry(1, 1, 128, 128)

  const mesh = new THREE.Mesh(planeGeometry, material)
  scene.add(mesh)

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
