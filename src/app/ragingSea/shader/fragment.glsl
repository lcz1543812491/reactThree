#define PI 3.1415926535897932384626433832795

precision mediump float;

uniform sampler2D texture;

varying vec2  vuv;



void main()
{
    gl_FragColor = vec4(vec3(1.0, 0.5, 0.4), 1.0);
}