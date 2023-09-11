import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { color } from 'three/examples/jsm/nodes/Nodes.js';


const parameter = {
  color: '#fe99ec',
  distance: 6
}

let scrll_y = window.scrollY



export function inintBaseAnimate() {

  const common_material = new THREE.MeshStandardMaterial(
    {
      color: parameter.color,
      metalness: 0.3,
      roughness: 0.6
    }
  )

//   const gui = new dat.GUI();

//   gui.addColor(parameter, 'color').onChange((value) =>  {
//     common_material.color.set(value)
//   })

  const scene = new THREE.Scene()

  const ambentLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambentLight)

  const directLight = new THREE.DirectionalLight(0xffffff, 2)
  directLight.position.set(4, 4, 4)
  scene.add(directLight)


  const directionalLightCamera = new THREE.CameraHelper(directLight.shadow.camera)
  // scene.add(directionalLightCamera)


  const camera = new THREE.PerspectiveCamera(60, (window as Window).innerWidth / (window as Window).innerHeight)
  camera.position.z = 7
  scene.add(camera)

  const axisHelper = new THREE.AxesHelper()
  scene.add(axisHelper)

  const render = new THREE.WebGL1Renderer({ 
    antialias:true, 
    canvas: document.getElementById('galaxy') as HTMLCanvasElement,
    alpha: true 
  })
  render.setSize(window.innerWidth, window.innerHeight)

  const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 60),
    common_material
  )

  const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 64, 128),
    common_material
  )

  const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 200, 32),
    common_material
  )

  mesh1.position.y = 0
  mesh2.position.y = - parameter.distance
  mesh3.position.y = - parameter.distance * 2

  scene.add(mesh1, mesh2, mesh3)



//   const controls = new OrbitControls(camera, render.domElement)
//   controls.enableDamping = true


  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    render.setSize(window.innerWidth, window.innerHeight)
  })

  window.addEventListener('scroll', () => {
    scrll_y = window.scrollY
    //console.log('scroll', scrll_y)
  })

  const clock = new THREE.Clock()

  function tick() {
    
    const time = clock.getElapsedTime()

    mesh1.rotation.x = time * 0.2
    mesh1.rotation.y = time * 0.12

    mesh2.rotation.x = time * 0.2
    mesh2.rotation.y = time * 0.12

    mesh3.rotation.x = time * 0.2
    mesh3.rotation.y = time * 0.12

    camera.position.y = - (scrll_y / window.innerHeight) * parameter.distance

    render.render(scene, camera)
    //controls.update()
    requestAnimationFrame(tick)
  }
  tick()
}
