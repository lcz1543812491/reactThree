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


export interface VrData {
    cameraLocation: []
    housePic: string
    objData: {roomList: Array<RoomListItem>; walls: []}
    panoramaLocation: []
    segments: []
    wallRelation: []
}