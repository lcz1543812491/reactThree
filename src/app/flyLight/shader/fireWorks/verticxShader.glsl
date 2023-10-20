uniform float uTime;
attribute vec3 uStep;

void main()
{
  
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  modelPosition.xyz += uStep * uTime;
 
  vec4 viewPosition = viewMatrix * modelPosition;

  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position =  projectionPosition;
  gl_PointSize = 100.0;
}