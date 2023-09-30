import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass.js'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js'
import { gsap } from 'gsap'


export function realisticRender(setLoading: (res: number) => {}) {
  let gui: any;
  const scene = new THREE.Scene()

  const ambentLight = new THREE.AmbientLight(0xffffff, 0.5)
  const directLight = new THREE.DirectionalLight(0xffffff, 1)
  directLight.position.set(0.25, 8, -2.25)
  directLight.castShadow = true

  directLight.shadow.mapSize.width = 1024
  directLight.shadow.mapSize.height = 1024

  directLight.shadow.camera.top = 4
  directLight.shadow.camera.bottom = -4
  directLight.shadow.camera.left = -4
  directLight.shadow.camera.right = 4

  directLight.shadow.camera.near = 1
  directLight.shadow.camera.far = 15

  directLight.shadow.radius = 10

  const directLightShadowHelper = new THREE.CameraHelper( directLight.shadow.camera );
  directLightShadowHelper.visible = false
  scene.add(directLightShadowHelper);



  scene.add(ambentLight)
  scene.add(directLight)


  const testSphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32), 
    new THREE.MeshStandardMaterial()
  )

  // scene.add(testSphere)

  const camera = new THREE.PerspectiveCamera(90, (window as Window).innerWidth / (window as Window).innerHeight)
  camera.position.z = 12
  scene.add(camera)

  const axisHelper = new THREE.AxesHelper()
  scene.add(axisHelper)


  const planeGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
  const planeMaterial = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      uAlpha: { value:1 }
    },
    vertexShader: `
    void main()
    {
      gl_Position =  vec4(position, 1.0);
    }
    `,
    fragmentShader: `
    uniform float uAlpha;
    void main()
    {
      gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
    }
    `
  })

  const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
  // scene.add(planeMesh)

  const render = new THREE.WebGLRenderer({ antialias:true, canvas: document.getElementById('galaxy') as HTMLCanvasElement })
  render.setSize(window.innerWidth, window.innerHeight)
  render.shadowMap.enabled = true
  render.shadowMap.type = THREE.PCFSoftShadowMap
  render.outputColorSpace = THREE.SRGBColorSpace
  render.toneMapping = THREE.ACESFilmicToneMapping
  render.toneMappingExposure = 2
  render.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  // render.physicallyCorrectLights = true
  // console.log('render', render.physicallyCorrectLights)

  const renderTarget = new THREE.WebGLRenderTarget(100, 100, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBAFormat,
    encoding: THREE.SRGBColorSpace as any
  })

  const effectComposer = new EffectComposer(render, renderTarget)
  effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  effectComposer.setSize(window.innerWidth, window.innerHeight)

  const renderPass = new RenderPass(scene, camera)
  effectComposer.addPass(renderPass)
  
  const dotScreenPass = new DotScreenPass()
  dotScreenPass.enabled = false
  effectComposer.addPass(dotScreenPass)

  const glitchPass = new GlitchPass()
  glitchPass.goWild = false
  glitchPass.enabled = false
  effectComposer.addPass(glitchPass)


  // RGB Shift pass
  const rgbShiftPass = new ShaderPass(RGBShiftShader)
  rgbShiftPass.enabled = false
  effectComposer.addPass(rgbShiftPass)


  const controls = new OrbitControls(camera, render.domElement)
  controls.enableDamping = true


  const clock = new THREE.Clock()

  const loadingManager = new THREE.LoadingManager()

  const gltfLoader = new GLTFLoader(loadingManager)

  const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager)

  loadingManager.onProgress = (_, loaded, toatal) => {
    // console.log('value', loaded, toatal)
    setLoading(loaded / toatal)
  }

  loadingManager.onLoad = () => {
    // console.log('onLoad')
    gsap.to(planeMaterial.uniforms.uAlpha, { duration: 2, value: 0 })

    const guiElements = document.getElementsByClassName('dg ac')
    if(guiElements.length === 0){
      // console.log(guiElements)
      const dat = require('dat.gui')
      gui = new dat.GUI();
      gui.add(directLight, 'intensity').min(0).max(10).step(0.001)
      gui.add(directLight.position, 'x').min(-5).max(5).name('x')
      gui.add(directLight.position, 'y').min(-5).max(5).name('y')
      gui.add(directLight.position, 'z').min(-5).max(5).name('z')
    }
  }

  const environmentMap = cubeTextureLoader.load([
    '/environmentMaps/0/px.jpg', 
    '/environmentMaps/0/nx.jpg', 
    '/environmentMaps/0/py.jpg', 
    '/environmentMaps/0/ny.jpg', 
    '/environmentMaps/0/pz.jpg', 
    '/environmentMaps/0/nz.jpg', 
  ])

  environmentMap.colorSpace = THREE.SRGBColorSpace
  scene.background = environmentMap
  scene.environment = environmentMap
 

  gltfLoader.load('/model/DamagedHelmet/glTF/DamagedHelmet.gltf', (model) => {
    model.scene.scale.set(5, 5, 5)
    model.scene.position.set(0, 0, 0)
    scene.add(model.scene)
    if(gui){
        gui.add(model.scene.rotation, 'y').min(-Math.PI).max(Math.PI).step(0.01)
    }
    scene.traverse((child) => {
        if((child as THREE.Mesh).material instanceof THREE.MeshStandardMaterial){
            // (child as any).material.envMap = environmentMap;
            // (child as any).material.envMapIntensity = 3
            // child.castShadow = true
            // child.receiveShadow = true
            // console.log(child)
        }
    })
  })



  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    render.setSize(window.innerWidth, window.innerHeight)
  })

  function tick() {
    // const time = clock.getElapsedTime()
    // render.render(scene, camera)
    effectComposer.render()
    controls.update()
    requestAnimationFrame(tick)
  }

  tick()
}
