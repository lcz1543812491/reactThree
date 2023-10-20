uniform float uTime;
attribute float aScale;
attribute vec3 aDirection;
uniform float uSize;

void main()
{
  
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  modelPosition.xyz += aDirection * uTime * 8.0;
 
  vec4 viewPosition = viewMatrix * modelPosition;

  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position =  projectionPosition;
  gl_PointSize = uSize * aScale - uTime * 5.0;
}