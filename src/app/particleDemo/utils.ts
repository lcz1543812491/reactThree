import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
// @ts-ignore
import testVertexShader from './shader/verticxShader.glsl'
// @ts-ignore
import testFragmentShader from './shader/fragment.glsl'
import { shaderMaterial } from '@react-three/drei'

export function initParticleDemo() {
  const scene = new THREE.Scene()

  const ambentLight = new THREE.AmbientLight(0xffffff, 1)

  //scene.add(ambentLight)
  //scene.add(directLight)

  const camera = new THREE.PerspectiveCamera(75, (window as Window).innerWidth / (window as Window).innerHeight)
  camera.position.z = 15
  scene.add(camera)

  const axisHelper = new THREE.AxesHelper()
  scene.add(axisHelper)

  const render = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById('galaxy') as HTMLCanvasElement })
  render.setSize(window.innerWidth, window.innerHeight)
  //   render.shadowMap.enabled = true
  //   render.shadowMap.type = THREE.PCFSoftShadowMap
  render.outputColorSpace = THREE.SRGBColorSpace
//   render.toneMapping = THREE.ACESFilmicToneMapping
//   render.toneMappingExposure = 0.1

  const controls = new OrbitControls(camera, render.domElement)
  controls.enableDamping = true
  //   controls.autoRotate = true
  //   controls.autoRotateSpeed = 0.5
  //   controls.maxPolarAngle = Math.PI
  //   controls.minPolarAngle = Math.PI / 4 * 2

  const clock = new THREE.Clock()

  const texture = new THREE.TextureLoader().load('/texture/texture/11.png')

  const pointsMaterial = new THREE.RawShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    depthWrite: false,
    transparent: true,
    // blending: THREE.AdditiveBlending,
    uniforms: {
      texture: {
        value: texture
      },
      uTime: {
        value: 0
      }
    }
  })

  const countsOfcount = 300
  const positionArray = new Float32Array(countsOfcount * 3)
 

  for(let i = 0; i < countsOfcount; i++){
    const current = i * 3;
    positionArray[current] = (Math.random() - 0.5) * 100;
    positionArray[current + 1] = (Math.random() - 0.5) * 100;
    positionArray[current + 2] = (Math.random() - 0.5) * 100;
    // if( positionArray[i] === 0 &&  positionArray[i+ 1] === 0 &&  positionArray[i +2] === 0){
    //   console.log('@@@@@')
    // }
  }

  // console.log('positionArray', positionArray)
  

  const pointGeometry = new THREE.BufferGeometry()
  pointGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))

  const point = new THREE.Points(pointGeometry, pointsMaterial)
  scene.add(point)

  const textureLoader = new THREE.TextureLoader()

  //   const rgbLoader = new RGBELoader()
  //   rgbLoader.load('/texture/2k.hdr', map => {
  //     map.mapping = THREE.EquirectangularReflectionMapping
  //     scene.environment = map
  //     scene.background = map
  //   })

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    render.setSize(window.innerWidth, window.innerHeight)
  })

  function tick() {
    const time = clock.getElapsedTime()
    pointsMaterial.uniforms.uTime.value = time;

    render.render(scene, camera)
    controls.update()
    requestAnimationFrame(tick)
  }

  tick()
}
