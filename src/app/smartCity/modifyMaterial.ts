import * as THREE from 'three'

interface ModifyMaterial {
  mesh: THREE.Mesh
}

export function modifyMaterial(props: ModifyMaterial) {
  const { mesh } = props
  // console.log('mesh', mesh)
  mesh.geometry.computeBoundingBox()
  // console.log(mesh.geometry.boundingBox)

  const { min, max } = mesh.geometry.boundingBox as any

  const uHeight = max.y - min.y
  //console.log('uHeight', uHeight)

  ;(mesh as any).material.onBeforeCompile = (shader: any) => {
    console.log(shader.vertexShader)
    console.log(shader.fragmentShader)

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
      '#include <dithering_fragment>',
      `
          #include <dithering_fragment>
          
          vec4 distGradColor = gl_FragColor;
    
          // 设置混合的百分比
          float gradMix = (vPosition.y+uHeight/2.0)/uHeight;
          // 计算出混合颜色
          vec3 gradMixColor = mix(distGradColor.xyz,uTopColor,gradMix);
          gl_FragColor = vec4(gradMixColor.xyz,1.0);
          `
    )
  }
}
