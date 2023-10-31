precision mediump float;
varying float vSize;
uniform vec3 uColor;


void main()
{

    float distanceCenter = distance(gl_PointCoord, vec2(0.5, 0.5));
    float strength = 1.0 - distanceCenter * 2.0;

    gl_FragColor = vSize > 0.0? vec4(uColor, strength): vec4(uColor, 0.0);
}