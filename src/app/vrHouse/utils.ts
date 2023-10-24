import * as THREE from 'three'
import { createSpace } from './createSpace'
import { createSprite } from './createSprite'
import gsap from 'gsap'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

let isMouseDown = false

export function vrHouse(canvasRef: HTMLElement) {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200)
  camera.position.set(0, 0, 0)

  const axisHelper = new THREE.AxesHelper(100)
  scene.add(axisHelper)

  const render = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.getElementById('galaxy') as HTMLCanvasElement,
    alpha: true,
    logarithmicDepthBuffer: true
  })
  render.setSize(window.innerWidth, window.innerHeight)
  //   render.shadowMap.enabled = true
  //   render.shadowMap.type = THREE.PCFSoftShadowMap
  render.outputColorSpace = THREE.SRGBColorSpace
  //render.toneMapping = THREE.ACESFilmicToneMapping
  //render.toneMappingExposure = 0.1

  // const controls = new OrbitControls(camera, render.domElement)
  // controls.enableDamping = true
  // controls.autoRotate = true
  // controls.autoRotateSpeed = 0.5
  // controls.maxPolarAngle = Math.PI
  // controls.minPolarAngle = (Math.PI / 4) * 2

  // const clock = new THREE.Clock()
  const raycaster = new THREE.Raycaster()

  createSpace({ scene, materialIndex: 0, path: '/texture/livingroom/' })

  const kitchenPosition = new THREE.Vector3(-5, 0, -10)
  createSpace({ euler: new THREE.Euler(0, -Math.PI / 2, 0), scene, materialIndex: 3, path: '/texture/kitchen/', position: kitchenPosition })
  const clickCalback = () => {
    //console.log('click')
    gsap.to(camera.position, {
      duration: 1,
      x: kitchenPosition.x,
      y: kitchenPosition.y,
      z: kitchenPosition.z
    })
  }

  const balconyClickCalback = () => {
    gsap.to(camera.position, {
      duration: 1,
      x: 0,
      y: 0,
      z: 15
    })
  }

  createSprite({ clickCalback: [balconyClickCalback], scene, camera, text: '阳台', position: new THREE.Vector3(0, 0, 3), raycaster })
  createSprite({ clickCalback: [clickCalback], scene, camera, text: '厨房', position: new THREE.Vector3(-1.5, 0, -4), raycaster })

  const livingroomClickCalback = () => {
    // 让相机移动到客厅
    // console.log("客厅");
    gsap.to(camera.position, {
      duration: 1,
      x: 0,
      y: 0,
      z: 0
    })
  }

  createSprite({ clickCalback: [livingroomClickCalback], scene, camera, text: '客厅', position: new THREE.Vector3(-4, 0, -6), raycaster })

  const balconyTolivingroomClickCalback = () => {
    gsap.to(camera.position, {
      duration: 1,
      x: 0,
      y: 0,
      z: 0
    })
  }

  createSprite({ clickCalback: [balconyTolivingroomClickCalback], scene, camera, text: '客厅', position: new THREE.Vector3(-2, 0, 12), raycaster })


  createSpace({ scene, materialIndex: 8, path: '/texture/balcony/', position: new THREE.Vector3(0, 0, 15)  })

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    render.setSize(window.innerWidth, window.innerHeight)
  })
  canvasRef.addEventListener(
    'mouseup',
    () => {
      isMouseDown = false
    },
    false
  )

  canvasRef.addEventListener(
    'mousedown',
    () => {
      isMouseDown = true
    },
    false
  )

  canvasRef.addEventListener(
    'mouseout',
    () => {
      isMouseDown = false
    },
    false
  )

  canvasRef.addEventListener('mousemove', e => {
    // console.log('e', e)
    if (isMouseDown) {
      camera.rotation.y += e.movementX * 0.002
      camera.rotation.x += e.movementY * 0.002
      camera.rotation.order = 'YXZ'
    }
  })

  function tick() {
    requestAnimationFrame(tick)
    // const elapsed = clock.getElapsedTime()

    render.render(scene, camera)
    // controls.update()
  }

  tick()
}
