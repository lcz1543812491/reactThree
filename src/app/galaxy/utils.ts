import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as dat from 'dat.gui'

const gui = new dat.GUI();
const parameter = {
    count: 9000,
    size: 0.02,
    radius: 5,
    branches: 3,
    spin: 1,
    random: 0.4,
    randomPower: 6
}

function createGalaxy(scene: any) {
   const geometry = new THREE.BufferGeometry()

   const positions = new Float32Array(parameter.count * 3)

   for(let i = 0; i < parameter.count; i++){
     const i3 = i *3
     
     const branch_angle = (i % parameter.branches) / parameter.branches * Math.PI * 2
     const radius = Math.random() * parameter.radius
     const spin_angle = radius * parameter.spin

     //console.log('@@@', i, branch_angle)
     const random_x = Math.pow(Math.random(), parameter.randomPower) * (Math.random() > 0.5 ? 1: -1)
     const random_y = Math.pow(Math.random(), parameter.randomPower) * (Math.random() > 0.5 ? 1: -1)
     const random_z = Math.pow(Math.random(), parameter.randomPower) * (Math.random() > 0.5 ? 1: -1)

     positions[i3] = Math.cos(branch_angle + spin_angle) * radius + random_x
     positions[i3 + 1] = random_y
     positions[i3 + 2] = Math.sin(branch_angle + spin_angle) * radius + random_z
   }

   geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

   const point_material = new THREE.PointsMaterial({
    size: parameter.size, 
    sizeAttenuation: true,
    depthWrite:false,
    blending: THREE.AdditiveBlending
   })

   const points = new THREE.Points(geometry, point_material)

   scene.add(points)
}

export function inintGalaxy() {

  const common_material = new THREE.MeshStandardMaterial({color: 0xffffff, side: THREE.DoubleSide})
  common_material.roughness = 0.3


  const scene = new THREE.Scene()


  const ambentLight = new THREE.AmbientLight(0xffffff, 1)


  const directLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directLight.position.set(2, 3, 4)

//   scene.add(ambentLight)
//   scene.add(directLight)

  const camera = new THREE.PerspectiveCamera(90, (window as Window).innerWidth / (window as Window).innerHeight)
  camera.position.z = 4
  scene.add(camera)

  const axisHelper = new THREE.AxesHelper()
  scene.add(axisHelper)

  const render = new THREE.WebGL1Renderer({ antialias:true, canvas: document.getElementById('galaxy') as HTMLCanvasElement })
  render.setSize(window.innerWidth, window.innerHeight)



  const controls = new OrbitControls(camera, render.domElement)
  controls.enableDamping = true


  createGalaxy(scene)


//   const geometry = new THREE.PlaneGeometry( 10, 10 );
//   const plane = new THREE.Mesh( geometry, common_material );
//   plane.rotation.x = Math.PI * 0.5
//   scene.add( plane );



  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    render.setSize(window.innerWidth, window.innerHeight)
  })

  function tick() {
    render.render(scene, camera)
    controls.update()
    requestAnimationFrame(tick)
  }
  tick()
}
