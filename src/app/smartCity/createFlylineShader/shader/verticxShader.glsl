attribute float aSize;
varying float vSize;
uniform float uTime;
uniform vec3 uColor;
uniform float uLength;

void main()
{
  
  vec4 viewPosition = viewMatrix * modelMatrix *vec4(position,1);
  gl_Position = projectionMatrix * viewPosition;

  vSize = aSize - uTime;

  if(vSize < 0.0){
    vSize = vSize + uLength;
  }

  vSize = (vSize - 500.0) * 0.3;

  gl_PointSize = -vSize/viewPosition.z;

}