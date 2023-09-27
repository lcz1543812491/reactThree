#define PI 3.1415926535897932384626433832795

precision mediump float;

uniform sampler2D texture;

varying vec2  vuv;

uniform vec3 deepColor;
uniform vec3 surfaceColor;

varying float wave;

uniform float colorOffset;
uniform float colorMultiple;



void main()
{
   
    float strength = (wave + colorOffset) * colorMultiple;

    vec3 color = mix(deepColor, surfaceColor, strength);

    gl_FragColor = vec4(color, 1.0);
}