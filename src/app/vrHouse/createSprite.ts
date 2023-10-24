import * as THREE from 'three'

interface CreateSprite {
  camera: THREE.Camera
  text: string
  position?: THREE.Vector3
  euler?: THREE.Euler
  scene: THREE.Scene
  raycaster: THREE.Raycaster
  clickCalback?: Function[]
}

export function createSprite(props: CreateSprite) {
  const { camera, text, position = new THREE.Vector3(0, 0, 0), euler = new THREE.Euler(0, 0, 0), scene, raycaster, clickCalback = [] } = props

  // 创建canvas对象
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1024
  // canvas.style.position = "absolute";
  // canvas.style.top = "0px";
  // canvas.style.left = "0px";
  // canvas.style.zIndex = "1";
  // canvas.style.transformOrigin = "0 0";
  // canvas.style.transform = "scale(0.1)";
  const context = canvas.getContext('2d') as CanvasRenderingContext2D
  context.fillStyle = 'rgba(100,100,100,1)'
  context.fillRect(0, 256, 1024, 512)
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.font = 'bold 200px Arial'
  context.fillStyle = 'rgba(255,255,255,1)'
  context.fillText(text, canvas.width / 2, canvas.height / 2)

  let texture = new THREE.CanvasTexture(canvas)

  const material = new THREE.SpriteMaterial({
    map: texture,
    color: 0xffffff,
    alphaMap: texture,
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: true,
    depthTest: true
    // blending: THREE.AdditiveBlending,
  })
  const sprite = new THREE.Sprite(material)
  sprite.scale.set(0.5, 0.5, 0.5)
  sprite.position.copy(position)
  scene.add(sprite)
  // this.mesh.rotation.copy(euler);

  // 创建射线
  const mouse = new THREE.Vector2()

  // 事件的监听
  window.addEventListener('click', event => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -((event.clientY / window.innerHeight) * 2 - 1)
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObject(sprite)
    if (intersects.length > 0) {
      clickCalback.forEach(item => {
        item()
      })
    }
  })
}
