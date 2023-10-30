import * as THREE from 'three'
import gsap from 'gsap'

interface ModifyMaterial {
  mesh: THREE.Mesh
}

export function modifyMaterial(props: ModifyMaterial) {
  const { mesh } = props

  ;(mesh as any).material.onBeforeCompile = (shader: any) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <dithering_fragment>',
      `
          #include <dithering_fragment>
          //#end#
      `
    )
    addGradientColor({ mesh, shader })
    addSpread({ shader })
    addLine({ shader })
  }
}

interface AddGradientColor {
  mesh: THREE.Mesh
  shader: any
}

interface AddSpread {
  shader: any
}

export function addGradientColor(props: AddGradientColor) {
  const { mesh, shader } = props
  // console.log('mesh', mesh)
  mesh.geometry.computeBoundingBox()
  // console.log(mesh.geometry.boundingBox)

  const { min, max } = mesh.geometry.boundingBox as any

  const uHeight = max.y - min.y
  //console.log('uHeight', uHeight)

  // console.log(shader.vertexShader)
  // console.log(shader.fragmentShader)

  shader.uniforms.uTopColor = {
    value: new THREE.Color('#aaaeff')
  }

  shader.uniforms.uHeight = { value: uHeight }

  shader.vertexShader = shader.vertexShader.replace(
    '#include <common>',
    `
            #include <common>
            varying vec3 vPosition;
            `
  )

  shader.vertexShader = shader.vertexShader.replace(
    '#include <begin_vertex>',
    `
            #include <begin_vertex>
            vPosition = position;
        `
  )

  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <common>',
    `
            #include <common>
            
            uniform vec3 uTopColor;
            uniform float uHeight;
            varying vec3 vPosition;
      
              `
  )
  shader.fragmentShader = shader.fragmentShader.replace(
    '//#end#',
    `
            vec4 distGradColor = gl_FragColor;
      
            // 设置混合的百分比
            float gradMix = (vPosition.y+uHeight/2.0)/uHeight;
            // 计算出混合颜色
            vec3 gradMixColor = mix(distGradColor.xyz,uTopColor,gradMix);
            gl_FragColor = vec4(gradMixColor.xyz,1.0);
            //#end#
            `
  )
}

export function addSpread(props: AddSpread) {
  const { shader } = props
  shader.uniforms.uSpreadWidth = { value: 40 }
  shader.uniforms.uCenter = { value: new THREE.Vector2(0) }
  shader.uniforms.uTime = { value: 0 }

  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <common>',
    `
            #include <common>
            uniform float uSpreadWidth;
            uniform vec2 uCenter;
            uniform float uTime;
            `
  )

  shader.fragmentShader = shader.fragmentShader.replace(
    '//#end#',

    `
    vec4 preGlColor = gl_FragColor;

    float distance = distance(vec2(vPosition.xz), uCenter);

    float strength = - (distance - uTime) * (distance - uTime) + uSpreadWidth;

    vec4 mixColor = mix(preGlColor, vec4(1.0, 1.0, 1.0, 1.0), strength / uSpreadWidth);
    
    gl_FragColor = strength > 0.0?  mixColor: preGlColor;
    
    //#end#
    `
  )

  gsap.to(shader.uniforms.uTime, {
    value: 800,
    duration: 3,
    ease: 'none',
    repeat: -1
  })
}

export function addLine(props: AddSpread){
  const { shader } = props

  shader.uniforms.uLineWidth = { value: 40 }
  shader.uniforms.uTime1 = { value: 0 }

  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <common>',
    `
            #include <common>
            uniform float uLineWidth;
            uniform float uTime1;
            `
  )

  shader.fragmentShader = shader.fragmentShader.replace(
    '//#end#',

    `
     float distance1 = vPosition.x + vPosition.z* 0.2 - uTime1;

     float strength1 = - distance1 * distance1 + uLineWidth;

     vec4 mixColor1 = mix(gl_FragColor, vec4(1.0, 1.0, 1.0, 1.0), strength1 / uLineWidth);

     gl_FragColor = strength1 > 0.0 ? mixColor1: gl_FragColor;

    //#end#
    `
  )

  gsap.to(shader.uniforms.uTime1, {
    value: 800,
    duration: 3,
    ease: 'none',
    repeat: -1
  })
}
