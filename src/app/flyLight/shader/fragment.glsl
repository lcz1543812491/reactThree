precision mediump float;
varying vec4 localPosition;
varying vec4 vPosition;

void main()
{

    vec4 mixColor = mix(vec4(1.0, 1.0, 0.0, 1.0), vec4(1.0, 0.0, 0.0, 1.0), localPosition.y / 3.0);

    gl_FragColor = mixColor;

    // gl_FragColor = gl_FrontFacing? vec4(mixColor.xyz - vPosition.y * 0.2, 1.0): mixColor;
}