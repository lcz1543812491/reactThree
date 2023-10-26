export interface AreasItem {
  x: number
  y: number
}

export interface RoomListItem {
  areas: AreasItem[]
  roomId: number
  roomName: string
  usageId: number
}

interface PanoramaLocationPoint {
  floor: number
  id: number
  panoramaUrl: string
  parentroomid: number
  thumbnailUrl: string
  x: number
  x_direction: number
  y: number
  y_direction: number
  z: number
  z_direction: number
}
export interface PanoramaLocationItem {
  point: PanoramaLocationPoint[]
  roomId: number
  roomName: string
  roomOldUsageName: string
  roomUsageName: string
  usageId: number
}


export interface FaceRelationItem {
    index: number[]
    roomId: number
}

export interface WallPointsItem {
    x: number
    y: number
    z: number
}
    

interface WallRelationItem {
    faceRelation: FaceRelationItem[]
    wallPoints: WallPointsItem[]
}


export interface VrData {
  cameraLocation: []
  housePic: string
  objData: { roomList: Array<RoomListItem>; walls: [] }
  panoramaLocation: PanoramaLocationItem[]
  segments: []
  wallRelation: WallRelationItem[]
}
