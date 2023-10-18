precision mediump float;
uniform sampler2D texture;


void main()
{

    // vec4 mixColor = mix(vec4(1.0, 1.0, 0.0, 1.0), vec4(1.0, 0.0, 0.0, 1.0), localPosition.y / 3.0);

    // gl_FragColor = mixColor;

    // gl_FragColor = gl_FrontFacing? vec4(mixColor.xyz - vPosition.y * 0.2, 1.0): mixColor;
    vec4 textureColor = texture2D(texture, gl_PointCoord);
    // gl_FragColor = vec4(textureColor.rgb, textureColor.r);
    gl_FragColor = vec4(gl_PointCoord, 1.0, textureColor.r);
}