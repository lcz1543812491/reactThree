import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// @ts-ignore
import testVertexShader from './shader/verticxShader.glsl'
// @ts-ignore
import testFragmentShader from './shader/fragment.glsl'
// @ts-ignore
// import glsl from 'glslify'
// console.log('testVertexShader', testVertexShader)
// console.log('testFragmentShader', testFragmentShader)

export function initShader() {

  // const glsl = require('glslify')
  // const noise = require('glsl-noise/simplex/3d.glsl');
  // console.log('glsl', glsl)
  //console.log('noise', noise)

  const scene = new THREE.Scene()


  const ambentLight = new THREE.AmbientLight(0xffffff, 1)
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



  const camera = new THREE.PerspectiveCamera(90, (window as Window).innerWidth / (window as Window).innerHeight)
  camera.position.z = 4
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


  const material = new THREE.ShaderMaterial(
    {
      vertexShader: testVertexShader,
      fragmentShader: testFragmentShader,
      uniforms:{
        color: { value: new THREE.Color('#ff0000') },
        time: { value: 0 },
      }
    }
  )

  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16), material)
  scene.add(mesh)

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    render.setSize(window.innerWidth, window.innerHeight)
  })

  const clock = new THREE.Clock()
  let pre_time = 0

  function tick() {
    const time = clock.getElapsedTime()
    // const delta_time = time - pre_time
    // pre_time = time

    material.uniforms.time.value = time

    render.render(scene, camera)
    controls.update()
    requestAnimationFrame(tick)
  }

  tick()
}
