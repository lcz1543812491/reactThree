import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

// @ts-ignore
import fireVertexShader from './shader/firefly/verticxShader.glsl'
// @ts-ignore
import fireFragmentShader from './shader/firefly/fragment.glsl'

// @ts-ignore
import portVertexShader from './shader/portal/verticxShader.glsl'
// @ts-ignore
import portFragmentShader from './shader/portal/fragment.glsl'



export function initPortal() {

//    const SPECTOR = require("spectorjs");

//    const spector = new SPECTOR.Spector();
//    spector.displayUI();

    /**
     * Base
     */

    
    // Canvas
    const canvas = document.querySelector('canvas.webgl')
    
    // Scene
    const scene = new THREE.Scene()
    
    /**
     * Loaders
     */
    // Texture loader
    const textureLoader = new THREE.TextureLoader()
    
    // Draco loader
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('draco/')
    
    // GLTF loader
    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)

    const bakedTexture = textureLoader.load('/model/portal/baked.jpg')
    bakedTexture.flipY = false
    bakedTexture.colorSpace = THREE.SRGBColorSpace

 
    const baseMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })
    const lightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 })

    const lightMaterial1 = new THREE.ShaderMaterial({ 
        vertexShader: portVertexShader,
        fragmentShader: portFragmentShader,
        uniforms: {
            uTime: {value: 0},
            colorStart: { value: '#ff0000' },
            colorEnd: { value: '#0000ff' }
        }
     })

    gltfLoader.load('/model/portal/portal.glb', (model) => {
    //   model.scene.traverse((child: any) => {
    //     console.log(child)
    //     child.material = baseMaterial
    //   })

      const baked: any = model.scene.children.find(item => item.name === 'baked')

      baked.material = baseMaterial
      const poleLightA: any = model.scene.children.find(item => item.name === 'poleLightA')
      const poleLightB: any = model.scene.children.find(item => item.name === 'poleLightB')
      const portalLight: any = model.scene.children.find(item => item.name === 'portalLight')
      poleLightA.material = lightMaterial
      poleLightB.material = lightMaterial
      portalLight.material = lightMaterial1

      scene.add(model.scene)
    })

    const fireCount = 50 
    const fireGeometry = new THREE.BufferGeometry()

    const positionArray = new Float32Array(fireCount * 3)
    const scaleArr = new Float32Array(fireCount)

    for(let i = 0; i < fireCount * 3; i ++) {
        positionArray[i * 3 + 0] = (Math.random() - 0.5) * 4
        positionArray[i * 3 + 1] =  (Math.random() - 0.5) * 4
        positionArray[i * 3 + 2] =  (Math.random() - 0.5) * 4

        scaleArr[i] = Math.random() * 4
    }

    fireGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positionArray, 3))
    fireGeometry.setAttribute('aScale', new THREE.Float32BufferAttribute(scaleArr, 1))

    const fireMaterial = new THREE.ShaderMaterial({ 
        uniforms: {
            pixelRation: { value: Math.min(window.devicePixelRatio, 2) },
            uTime: { value: 0 }
        },
        vertexShader: fireVertexShader,
        fragmentShader: fireFragmentShader,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
     })
    const points = new THREE.Points(fireGeometry, fireMaterial)

    scene.add(points)

    
    /**
     * Object
     */
    // const cube = new THREE.Mesh(
    //     new THREE.BoxGeometry(1, 1, 1),
    //     new THREE.MeshBasicMaterial()
    // )
    
    // scene.add(cube)
    
    /**
     * Sizes
     */
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }
    
    window.addEventListener('resize', () =>
    {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
    
        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()
    
        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        fireMaterial.uniforms.pixelRation.value = Math.min(window.devicePixelRatio, 2)
    })
    
    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
    camera.position.x = 4
    camera.position.y = 2
    camera.position.z = 4
    scene.add(camera)
    
    // Controls
    const controls = new OrbitControls(camera, document.getElementById('galaxy') as HTMLCanvasElement,)
    controls.enableDamping = true
    
    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('galaxy') as HTMLCanvasElement,
        antialias: true
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    /**
     * Animate
     */
    const clock = new THREE.Clock()
    
    const tick = () =>
    {
        const elapsedTime = clock.getElapsedTime()
        fireMaterial.uniforms.uTime.value = elapsedTime
        lightMaterial1.uniforms.uTime.value = elapsedTime
    
        // Update controls
        controls.update()
    
        // Render
        renderer.render(scene, camera)
    
        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }
    
    tick()

}