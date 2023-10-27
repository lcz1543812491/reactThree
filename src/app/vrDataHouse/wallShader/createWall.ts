import * as THREE from 'three'
import { FaceRelationItem, WallPointsItem } from '../interface'

interface FaceRelationItemWall extends FaceRelationItem {
  panorama?: any
}

interface CreateWall {
  wallPoints: WallPointsItem[]
  faceRelation: FaceRelationItemWall[]
}

export function createWall(props: CreateWall) {
  const { wallPoints, faceRelation } = props
  // console.log('wallPoints', wallPoints)
  // console.log('faceRelation', faceRelation)

  wallPoints.forEach(item => {
    item.x = item.x / 100
    item.y = item.y / 100
    item.z = item.z / 100
  })

  const faceIndexs = [
    // 底面
    [0, 1, 2, 3],
    //   上面
    [4, 5, 6, 7],
    //   左面
    [0, 3, 6, 5],
    //   右面
    [2, 1, 4, 7],
    //   前面
    [1, 0, 5, 4],
    //   后面
    [3, 2, 7, 6]
  ]

  const mIndex: any[] = []
  faceIndexs.forEach(item => {
    //   根据面相关判断对应的全景图和材质
    const faceItem = faceRelation.filter(face => item.includes(face.index[0]) && item.includes(face.index[1]) && item.includes(face.index[2]) && item.includes(face.index[3]))
   
    // if(faceItem[0]){
    //   console.log('faceItem', faceItem[0]['panorama'], faceItem[0])
    //   // console.log(faceItem[0].panorama)
    // }
    if (faceItem[0]) {
      mIndex.push(faceItem[0].panorama)
    } else {
      mIndex.push(0)
    }
  })

  const faces = faceIndexs.map((item, index) => {
    return [
      [wallPoints[item[0]].x, wallPoints[item[0]].z, wallPoints[item[0]].y],
      [wallPoints[item[1]].x, wallPoints[item[1]].z, wallPoints[item[1]].y],
      [wallPoints[item[2]].x, wallPoints[item[2]].z, wallPoints[item[2]].y],
      [wallPoints[item[3]].x, wallPoints[item[3]].z, wallPoints[item[3]].y]
    ]
  })

  // console.log('face', faces)
  // console.log('mIndex', mIndex)

  const positions = []
  const uvs = []
  const indices = []
  const nomarls = []
  const faceNormals = [
    [0, -1, 0],
    [0, 1, 0],
    [-1, 0, 0],
    [1, 0, 0],
    [0, 0, 1],
    [0, 0, -1]
  ]
  const materialGroups = []

  for (let i = 0; i < faces.length; i++) {
    const point = faces[i]
    const facePositions = []
    const faceUvs = []
    const faceIndices = []

    facePositions.push(...point[0], ...point[1], ...point[2], ...point[3])
    faceUvs.push(0, 0, 1, 0, 1, 1, 0, 1)
    faceIndices.push(0 + i * 4, 2 + i * 4, 1 + i * 4, 0 + i * 4, 3 + i * 4, 2 + i * 4)

    // console.log('faceIndices', faceIndices)

    positions.push(...facePositions)
    uvs.push(...faceUvs)
    indices.push(...faceIndices)
    nomarls.push(...faceNormals[i], ...faceNormals[i], ...faceNormals[i], ...faceNormals[i])

    // 设置材质组
    materialGroups.push({
      start: i * 6,
      count: 6,
      materialIndex: i
    })
  }
  // console.log('positions', positions)
  // console.log('uvs', uvs)
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(nomarls, 3))
  geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(indices), 1))
  geometry.groups = materialGroups

  const material = mIndex.map(item => {
    if (item == 0) {
      return new THREE.MeshBasicMaterial({ color: 0x333333 })
    } else {
      return item.material
    }
  })

  // console.log('material', material)

  const wall = new THREE.Mesh(geometry, material)
  return wall
}
