import * as THREE from 'three'

interface CreateSpace {
  scene: THREE.Scene
  materialIndex: number
  path: string
  position?: THREE.Vector3
  euler?: THREE.Euler
  manager?: THREE.LoadingManager
}

export function createSpace(props: CreateSpace) {
  const { manager, scene, materialIndex, path, position = new THREE.Vector3(0), euler = new THREE.Euler(0,0,0) } = props
  const roomArr = [`${materialIndex}_l`, `${materialIndex}_r`, `${materialIndex}_u`, `${materialIndex}_d`, `${materialIndex}_b`, `${materialIndex}_f`]

  const boxGeometry = new THREE.BoxGeometry(10, 10, 10)
  boxGeometry.scale(1, 1, -1)

  const materialArr: THREE.MeshBasicMaterial[] = []
  const textureLoader = new THREE.TextureLoader(manager)

  roomArr.forEach(item => {
    const texture = textureLoader.load(`${path}${item}.jpg`)
    if (item === `${materialIndex}_d` || item === `${materialIndex}_u`) {
      texture.rotation = Math.PI
      texture.center = new THREE.Vector2(0.5, 0.5)
    }
    materialArr.push(new THREE.MeshBasicMaterial({ map: texture }))
  })

  const box = new THREE.Mesh(boxGeometry, materialArr)
  box.position.set(position.x, position.y, position.z)
  box.rotation.set(euler.x, euler.y, euler.z)
  scene.add(box)
}
