import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';


export function inintModel() {
  const scene = new THREE.Scene()

  const ambentLight = new THREE.AmbientLight(0xffffff, 0.4)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(4, 0, 0)

  const directionalLightHelper = new THREE.DirectionalLightHelper( directionalLight, 5 );

  scene.add(directionalLightHelper);
  scene.add(ambentLight)
  scene.add(directionalLight)

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)
  camera.position.set(1, 1, 1)

  scene.add(camera)

  const axisHelper = new THREE.AxesHelper()
  scene.add(axisHelper)


  const planeGeometry = new THREE.PlaneGeometry(20, 20)
  const planeMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff, 
        roughness: 0.3, 
        metalness: 0.3
    })

  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = - Math.PI * 0.5
  scene.add(plane)

  const loader = new DRACOLoader();
  loader.setDecoderPath('/draco/')
  const gltfLoader = new GLTFLoader()
  gltfLoader.setDRACOLoader(loader)

  
  gltfLoader.load('/model/Duck/glTF-Draco/Duck.gltf', (model) => {
     console.log('model', model)
     model.scene.scale.set(2, 2, 2)
     const children = [...model.scene.children]
     for(let i = 0; i < children.length; i++ ){
        scene.add(children[i])
     }
  })

  

  const render = new THREE.WebGL1Renderer({ antialias:true, canvas: document.getElementById('galaxy') as HTMLCanvasElement })

  render.setSize(window.innerWidth, window.innerHeight)


  const controls = new OrbitControls(camera, render.domElement)
  controls.enableDamping = true

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    render.setSize(window.innerWidth, window.innerHeight)
  })

  function tick() {
    // console.log(camera.position)
    render.render(scene, camera)
    controls.update()
    requestAnimationFrame(tick)
  }
  tick()
}
