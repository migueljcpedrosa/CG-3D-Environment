#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;  // Grass texture sampler

void main() {
    // Fetch the grass texture color
    vec4 color = texture2D(uSampler, vTextureCoord);

    // Adjust the illumination based on the y-coordinate of the texture coordinate
    float illumination = mix(0.5, 1.0, vTextureCoord.y); // Darker at the base (0.5) and lighter at the top (1.0)
    
    // Adjust RGB values with illumination, keep alpha unchanged
    vec4 illuminatedColor = vec4(color.rgb * illumination, color.a);

    // Set the output color
    gl_FragColor = illuminatedColor;
}
