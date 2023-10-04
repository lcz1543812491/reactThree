import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// @ts-ignore
import testVertexShader from './shader/verticxShader.glsl'
// @ts-ignore
import testFragmentShader from './shader/fragment.glsl'

export function initShader() {

  const scene = new THREE.Scene()
  const dat = require('dat.gui')


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
  camera.position.set(-0.6, 1.0, 1.6)
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

  const debugColor = {
    deepColor: '#186691',
    surfaceColor: '#f27cc9'
  }


  const material = new THREE.ShaderMaterial(
    {
      vertexShader: testVertexShader,
      fragmentShader: testFragmentShader,
      uniforms: {
        time: { value: 0 },
        waveSpeed: { value: 0.75 },
        waveProps: {value: 0.2},
        frequencyProps: { value: new THREE.Vector2(4.0, 1.5) },
        deepColor: { value: new THREE.Color(debugColor.deepColor) },
        surfaceColor: { value: new THREE.Color(debugColor.surfaceColor) },
        colorOffset: { value: 0.08 },
        colorMultiple: { value: 5.0 }
      }
    }
  )


  const guiElements = document.getElementsByClassName('dg ac')
  if(guiElements.length === 0){
    const gui = new dat.GUI();
    gui.add(material.uniforms.waveProps, 'value').min(0.0).max(1.0).step(0.01).name('wave')
    gui.add(material.uniforms.frequencyProps.value, 'x').min(1.0).max(10.0).step(0.01).name('frequencyX')
    gui.add(material.uniforms.frequencyProps.value, 'y').min(1.0).max(10.0).step(0.01).name('frequencyY')
    gui.add(material.uniforms.waveSpeed, 'value').min(0.0).max(10.0).step(0.01).name('waveSpeed')
    gui.addColor(debugColor, 'deepColor').name('deepColor').onChange(() => {
        material.uniforms.deepColor.value = new THREE.Color(debugColor.deepColor)
    })

    gui.addColor(debugColor, 'surfaceColor').name('surfaceColor').onChange(() => {
        material.uniforms.surfaceColor.value = new THREE.Color(debugColor.surfaceColor)
    })

    gui.add(material.uniforms.colorOffset, 'value').min(0.0).max(10.0).step(0.01).name('colorOffset')
    gui.add(material.uniforms.colorMultiple, 'value').min(1.0).max(10.0).step(0.01).name('colorMultiple')
  }


  const planeGeometry = new THREE.PlaneGeometry(4, 4, 512, 512)

  const mesh = new THREE.Mesh(planeGeometry, material)
  mesh.rotation.x = -Math.PI * 0.5
  scene.add(mesh)

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    render.setSize(window.innerWidth, window.innerHeight)
  })

  function tick() {
    const time = clock.getElapsedTime()
    material.uniforms.time.value = time

    render.render(scene, camera)
    controls.update()
    requestAnimationFrame(tick)
  }

  tick()
}
