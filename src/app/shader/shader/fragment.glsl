precision mediump float;

varying float vRandom;

uniform sampler2D texture;

varying vec2  vuv;

varying float velevation;

void main()
{
    vec4 textureColor = texture2D(texture, vuv);
    // gl_FragColor = vec4(vRandom, vRandom * 0.2, 1.0, 1.0);
    textureColor.rgb *= velevation * 2.0 + 0.5;
    gl_FragColor = textureColor;
} 