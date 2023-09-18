import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';


export function inintModel() {
  const scene = new THREE.Scene()

  const ambentLight = new THREE.AmbientLight(0xffffff, 0.1)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.castShadow = true
  directionalLight.position.set(4, 2, 2)

  const directionalLightHelper = new THREE.DirectionalLightHelper( directionalLight, 5 );

  scene.add(directionalLightHelper);
  scene.add(ambentLight)
  scene.add(directionalLight)

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)
  camera.position.set(2, 2, 4)

  scene.add(camera)

  const axisHelper = new THREE.AxesHelper()
  scene.add(axisHelper)


  const planeGeometry = new THREE.PlaneGeometry(20, 20)
  const planeMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff, 
        roughness: 1, 
        metalness: 0.1
    })

  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = - Math.PI * 0.5
  plane.receiveShadow = true
  scene.add(plane)

  const loader = new DRACOLoader();
  loader.setDecoderPath('/draco/')
  const gltfLoader = new GLTFLoader()
  gltfLoader.setDRACOLoader(loader)

  let mixer = null as unknown as THREE.AnimationMixer

  gltfLoader.load('/model/Fox/glTF/Fox.gltf', (model) => {
     console.log('model', model)
     model.scene.castShadow = true
     model.scene.scale.set(0.025, 0.025, 0.025)
     mixer = new THREE.AnimationMixer(model.scene)
     const action = mixer.clipAction(model.animations[2])
     action.play()
     scene.add(model.scene)
    
    //  const children = [...model.scene.children]
    //  for(let i = 0; i < children.length; i++ ){
    //     scene.add(children[i])
    //  }
  })

  

  const render = new THREE.WebGL1Renderer({ antialias:true, canvas: document.getElementById('galaxy') as HTMLCanvasElement })
  render.shadowMap.enabled = true
  render.shadowMap.type = THREE.PCFSoftShadowMap
  render.setSize(window.innerWidth, window.innerHeight)


  const controls = new OrbitControls(camera, render.domElement)
  controls.enableDamping = true

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    render.setSize(window.innerWidth, window.innerHeight)
  })

  const clock = new THREE.Clock()
  let pre_time = 0

  function tick() {
    // console.log(camera.position) 
    const current_time = clock.getElapsedTime()
    const delta_time = current_time - pre_time
    pre_time = current_time

    if(!!mixer){
      mixer.update(delta_time)
    }
    render.render(scene, camera)
    controls.update()
    requestAnimationFrame(tick)
  }
  tick()
}
