import * as THREE from "three";

export function inintThreejs() {
    const scene = new THREE.Scene()

    const mycanvas = document.getElementById('my-canvas')
    
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: '#f00' })
    
    const cube = new THREE.Mesh(geometry, material)

    cube.position.set(1, -0.5, 1)
    cube.scale.set(2, 0.5, 0.5)

    cube.rotation.y = 1.7
    scene.add(cube)
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)
    camera.position.z = 3
    
    scene.add(camera)


    const axisHelper = new THREE.AxesHelper()
    scene.add(axisHelper)
    
    const render = new THREE.WebGL1Renderer()
    
    render.setSize(window.innerWidth, window.innerHeight)
    
    render.render(scene, camera)

    document.body.appendChild(render.domElement);
    
}