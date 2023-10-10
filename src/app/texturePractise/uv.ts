import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

export function texturePractise() {
  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight)
  camera.position.set(0, 0, 6)

  scene.add(camera)

  const axisHelper = new THREE.AxesHelper()
  scene.add(axisHelper)

  const render = new THREE.WebGL1Renderer({ antialias: true, canvas: document.getElementById('galaxy') as HTMLCanvasElement })
  render.shadowMap.enabled = true
  render.shadowMap.type = THREE.PCFSoftShadowMap
  render.setSize(window.innerWidth, window.innerHeight)

  const controls = new OrbitControls(camera, render.domElement)
  controls.enableDamping = true

  const uvTexture = new THREE.TextureLoader().load('/texture/texture/uv_grid_opengl.jpg')

  // // 创建平面几何体
  const planeGeometry = new THREE.PlaneGeometry(2, 2)
  // // 创建材质
  const planeMaterial = new THREE.MeshBasicMaterial({
    map: uvTexture
  })

  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.position.x = -2
  scene.add(plane)

  const geometry = new THREE.BufferGeometry()
  // 创建顶点数据,顶点是有序的,每三个为一个顶点，逆时针为正面
  // const vertices = new Float32Array([
  //   -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0,

  //   1.0, 1.0, 0, -1.0, 1.0, 0, -1.0, -1.0, 0,
  // ]);
  // // 创建顶点属性
  // geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

  // 使用索引绘制
  const vertices = new Float32Array([-1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, -1.0, 1.0, 0])

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

  // 创建索引
  const indices = new Uint16Array([0, 1, 2, 2, 3, 0])
  // 创建索引属性
  geometry.setIndex(new THREE.BufferAttribute(indices, 1))

  // 设置uv坐标
  const uv = new Float32Array([
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    1 // 正面
  ])
  // 创建uv属性
  geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2))
  geometry.computeVertexNormals()
  const plane1Material = new THREE.MeshBasicMaterial({ map: uvTexture })

  const plane1 = new THREE.Mesh(geometry, plane1Material)
  plane1.position.x = 3
  scene.add(plane1)

  const rgbLoader = new RGBELoader()
  rgbLoader.load('/texture/texture/Alex_Hart-Nature_Lab_Bones_2k.hdr', (map)  => {
    map.mapping = THREE.EquirectangularReflectionMapping
    scene.background = map
    planeMaterial.envMap = map
    plane1Material.envMap = map
  })

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    render.setSize(window.innerWidth, window.innerHeight)
  })

  const clock = new THREE.Clock()

  function tick() {
    render.render(scene, camera)
    controls.update()
    requestAnimationFrame(tick)
  }
  tick()
}
