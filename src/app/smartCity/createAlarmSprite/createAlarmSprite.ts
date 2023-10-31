import * as THREE from 'three'

interface CreateAlarmSprite {
  scene: THREE.Scene
  camera: THREE.Camera
  callBack: Function
}

const callBackArray = [] as Function[]
const mouse = new THREE.Vector2()

export function createAlarmSprite(props: CreateAlarmSprite) {
  const { scene, camera, callBack } = props
  const textureLoader = new THREE.TextureLoader()
  const map = textureLoader.load('/texture/texture/warning.png')

  const material = new THREE.SpriteMaterial({ map: map })

  const sprite = new THREE.Sprite(material)

  sprite.position.set(-4.2, 3.5, -1)
  scene.add(sprite)

  callBackArray.push(callBack)

  const raycaster = new THREE.Raycaster()

  window.addEventListener('click', (e: MouseEvent) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = -((e.clientY / window.innerHeight) * 2 - 1)

    raycaster.setFromCamera(mouse, camera)

    const intersets = raycaster.intersectObject(sprite)
    if (intersets.length > 0) {
      callBackArray.forEach(item => {
        item(e)
      })
    }
  })
}
