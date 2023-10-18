uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
uniform float uTime;

void main()
{
  
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
 
  vec4 viewPosition = viewMatrix * modelPosition;

  viewPosition.x += sin(viewPosition.y + uTime);

  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position =  projectionPosition;
  gl_PointSize = 1000.0 / -viewPosition.z;
}