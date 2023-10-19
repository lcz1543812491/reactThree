import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export function vectorPractise() {
  const scene = new THREE.Scene()
  const ambentLight = new THREE.AmbientLight(0xffffff, 2)
  scene.add(ambentLight)

  const directLight = new THREE.PointLight(0xffffff, 15)
  directLight.position.set(4, 2, 5)
  scene.add(directLight)

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)
  camera.position.set(-100, 100, 126)
  camera.lookAt(0, 0, 0)

  scene.add(camera)

  const axisHelper = new THREE.AxesHelper(600)
  scene.add(axisHelper)

  const render = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById('galaxy') as HTMLCanvasElement })
  // render.shadowMap.enabled = true
  // render.shadowMap.type = THREE.PCFSoftShadowMap
  //   render.toneMapping = THREE.ReinhardToneMapping
  //   render.toneMappingExposure = 1
  render.setSize(window.innerWidth, window.innerHeight)

  const controls = new OrbitControls(camera, render.domElement)
  controls.enableDamping = true

  const dir = new THREE.Vector3(2, 2, 3)
  //normalize the direction vector (convert to vector of length 1)
  dir.normalize()
  const origin = new THREE.Vector3(1, 1, 1)
  const length = 1
  const hex = 0xffff00
  const arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex)
  // scene.add(arrowHelper)

  const A = new THREE.Vector3(5, 6, 7)
  const B = new THREE.Vector3(0, 0, 0)

  const AB = B.clone().sub(A)
  const dir1 = AB.clone().normalize()
  const length1 = AB.length()
  const hex1 = 0xff0000
  // console.log(dir1)

  const arrowHelper1 = new THREE.ArrowHelper(dir1, A, length1, hex1)
  // scene.add(arrowHelper1)

  //   const gemeory = new THREE.BoxGeometry(5, 5, 5)
  //   const material1 = new THREE.MeshPhysicalMaterial({ color: 0xff0000, roughness: 1, metalness: 0.2 })
  //   const mesh = new THREE.Mesh(gemeory, material1)
  //   scene.add(mesh)

  //   const p = mesh.geometry.attributes.position
  //   const n = mesh.geometry.attributes.normal
  //   //console.log(p)

  //   for(let i = 0; i < p.count; i++){
  //      const origin = new THREE.Vector3(p.getX(i), p.getY(i), p.getZ(i))
  //      const target = new THREE.Vector3(n.getX(i), n.getY(i), n.getZ(i))
  //      const arrowHelper2= new THREE.ArrowHelper(target, origin, 1, 0xffff00)
  //      scene.add(arrowHelper2)
  //   }

  //   const v = new THREE.Vector3(2, 1, 7)
  //   const o = new THREE.Vector3(0, 0, 0)
  //   const dir3 = v.clone().sub(o).normalize()

  //   const arrowHelper2= new THREE.ArrowHelper(dir3, o, 10, 0xffff00)
  //   scene.add(arrowHelper2)

  //   const gemeory = new THREE.BoxGeometry(5, 5, 5)
  //   const material1 = new THREE.MeshPhysicalMaterial({ color: 0x00ffff, roughness: 1, metalness: 0.2 })
  //   const mesh = new THREE.Mesh(gemeory, material1)
  //   mesh.position.set(-20, 0, -10)
  //   scene.add(mesh)

  const v = new THREE.Vector3(30, 40, 0)
  const g = new THREE.Vector3(0, -9.8, 0)
  const gemeory = new THREE.BoxGeometry(5, 5, 5)
  const material1 = new THREE.MeshPhysicalMaterial({ color: 0x00ffff, roughness: 1, metalness: 0.2 })
  const mesh = new THREE.Mesh(gemeory, material1)
  mesh.position.set(0, 50, 0)
  scene.add(mesh)

  const clock = new THREE.Clock()
  let start = 0
  const pre_position = mesh.position

  function tick() {
    //console.log(camera.position)
    if (mesh.position.y >= 0) {
      const delta = clock.getDelta()
      start += delta * 0.01

      // const new_position = v.clone().multiplyScalar(start)
      // mesh.position.copy(pre_position.clone().add(new_position))

      v.add(g.clone().multiplyScalar(delta))
      const new_position = v.clone().multiplyScalar(start)
      mesh.position.copy(pre_position.clone().add(new_position))
    }

    render.render(scene, camera)
    controls.update()
    requestAnimationFrame(tick)
  }

  tick()

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    render.setSize(window.innerWidth, window.innerHeight)
  })
}