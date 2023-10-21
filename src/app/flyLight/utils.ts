import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { Fireworks } from './fireworks'
import gsap from 'gsap'
// @ts-ignore
import testVertexShader from './shader/verticxShader.glsl'
// @ts-ignore
import testFragmentShader from './shader/fragment.glsl'
// @ts-ignore
import { Water } from 'three/examples/jsm/objects/Water'
// console.log('testVertexShader', testVertexShader)
// console.log('testFragmentShader', testFragmentShader)
//console.log( Water)

export function initFlyLight() {
  const scene = new THREE.Scene()

  const ambentLight = new THREE.AmbientLight(0xffffff, 0.2)

  scene.add(ambentLight)
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
  render.toneMapping = THREE.ACESFilmicToneMapping
  render.toneMappingExposure = 0.1

  const controls = new OrbitControls(camera, render.domElement)
  controls.enableDamping = true
  // controls.autoRotate = true
  // controls.autoRotateSpeed = 0.5
  // controls.maxPolarAngle = Math.PI
  // controls.minPolarAngle = (Math.PI / 4) * 2

  const clock = new THREE.Clock()

  const shaderMaterial = new THREE.RawShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    side: THREE.DoubleSide,
    uniforms: {}
  })

  const textureLoader = new THREE.TextureLoader()

  const rgbLoader = new RGBELoader()
  rgbLoader.load('/texture/2k.hdr', map => {
    map.mapping = THREE.EquirectangularReflectionMapping
    scene.environment = map
    scene.background = map
  })

  const loader = new GLTFLoader()

  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('draco/')
  loader.setDRACOLoader(dracoLoader)

  loader.loadAsync('/model/flyLight/newyears_min.glb').then(model => {
    // model.scene.position.z = -10
    scene.add(model.scene)

    //   创建水面
    // const waterGeometry = new THREE.PlaneGeometry(100, 100)
    // let water = new Water(waterGeometry, {
    //   scale: 4,
    //   textureHeight: 1024,
    //   textureWidth: 1024
    // })
    // water.position.y = 2
    // water.rotation.x = -Math.PI / 2
    // scene.add(water)
  })

  loader.loadAsync('/model/flyLight/flyLight.glb').then(model => {
    // console.log(model.scene.children)
    ;(model.scene.children[0] as any).material = shaderMaterial
    // scene.add(model.scene)

    for (let i = 0; i < 30; i++) {
      const fly = model.scene.clone(true)
      fly.position.set((Math.random() - 0.5) * 300, (Math.random() - 0.5) * 60 + 25, (Math.random() - 0.5) * 300)
      gsap.to(fly.position, {
        x: '+=' + Math.random() * 5,
        y: '+=' + Math.random() * 20,
        yoyo: true,
        duration: 5 + Math.random() * 10,
        repeat: -1
      })
      scene.add(fly)
    }
  })

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    render.setSize(window.innerWidth, window.innerHeight)
  })

  const fireWorksArray = [] as Fireworks[]

  function createFireworks() {
    const color = `hsl(${Math.floor(Math.random() * 360)},100%, 80%)`

    const position = {
      x: (Math.random() - 0.5) * 30,
      z: (Math.random() - 0.5) * 30,
      y: 50 + Math.random() * 25
    }

    const fireworks = new Fireworks(color, position)
    fireworks.addScene(scene, camera)
    fireWorksArray.push(fireworks)
  }

  window.addEventListener('click', createFireworks)

  function tick() {
    // const time = clock.getElapsedTime()
    fireWorksArray.forEach((item, index) => {
      const res = item.update()
      //console.log(res)
      if(res === 'remove'){
        fireWorksArray.splice(index, 1)
      }

    })
    render.render(scene, camera)
    controls.update()
    requestAnimationFrame(tick)
  }

  tick()
}
