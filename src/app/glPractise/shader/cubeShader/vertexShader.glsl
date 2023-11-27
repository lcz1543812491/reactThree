attribute vec3 vPosition;
attribute vec3 vColor;
varying vec4 color;
uniform mat4 u_rotateMatrix;

void main()
{
    gl_Position = u_rotateMatrix * vec4(vPosition, 1.0);
    //gl_Position = vec4(vPosition, 1.0);
    color = vec4(vColor, 1.0);
}