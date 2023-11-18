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
  attribute vec2 a_position;
  attribute float a_size;
  void main(){
      gl_Position = vec4(a_position, 0.0, 1.0);
      gl_PointSize = a_size;
  }
  `

  const fragShader = `void main(){
    gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
  }`

  const program = initShaders({ gl: webgl as WebGLRenderingContext, fragmentSource: fragShader, vertexSource: vertShader })



  // webgl?.vertexAttrib2f(attrLocation as number, -0.8, 0.0)
  webgl?.clearColor(0.0, 0.0, 0.0, 1.0)
  webgl?.clear(webgl.COLOR_BUFFER_BIT)

  let x = 0, y = 0;

  for(let i = 0; i < 1000; i++){
    const r = i/100
    x = r * Math.cos(i)
    y = r * Math.sin(i)

    const a_position = webgl?.getAttribLocation(program as WebGLProgram, 'a_position')
    webgl?.vertexAttrib2f(a_position as number, x, y)

    const a_size = webgl?.getAttribLocation(program as WebGLProgram, 'a_size')
    webgl?.vertexAttrib1f(a_size as number, r * 10)

    webgl?.drawArrays(webgl.POINTS, 0, 1)
    // webgl?.vertexAttrib2fv(attrLocation as number, new Float32Array([x, y]))
  }

}
