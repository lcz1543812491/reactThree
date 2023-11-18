import { mat4 } from 'gl-matrix'
import { initShaders } from '../../components/initShader'

interface InintGlPractise {
  canvasRef: HTMLCanvasElement
}

export function inintGlPractise(props: InintGlPractise) {
  const { canvasRef } = props
  const webgl = canvasRef.getContext('webgl')

  // webgl?.viewport(0, 0, window.innerWidth, window.innerHeight)
  // webgl?.viewport(0, 0, canvasRefDom?.clientWidth || 0, canvasRefDom?.clientHeight || 0);
  // console.log('@@@', webgl)
  // console.log('mat4', mat4)
  //   const projectMatrix = mat4.create()
  //   mat4.ortho(projectMatrix, 0, window.innerWidth, window.innerHeight, 0, -1, 1)

  const vertShader = `
  attribute vec4 a_position;
  uniform     mat4    proj;
  void main(){
      gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
      gl_PointSize = 40.0;
  }
  `

  const fragShader = `void main(){
    gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
  }`

  initShaders({ gl: webgl as WebGLRenderingContext, fragmentSource: fragShader, vertexSource: vertShader })

  webgl?.clearColor(0.0, 0.0, 0.0, 1.0)
  webgl?.clear(webgl.COLOR_BUFFER_BIT)
  webgl?.drawArrays(webgl.POINTS, 0, 1)
}
