#version 300 es
precision mediump float;

in vec2 vTexCoord;
out vec4 fragColor;

uniform sampler2D uBaseTexture;
uniform sampler2D uCloudTexture;
uniform float uTime;

void main(void) {
    vec2 cloudTexCoord = vTexCoord;
    cloudTexCoord.x += uTime * 0.01; // Move the clouds over time

    vec4 baseColor = texture(uBaseTexture, vTexCoord);
    vec4 cloudColor = texture(uCloudTexture, cloudTexCoord);

    // Blend the base color and cloud color
    fragColor = mix(baseColor, cloudColor, cloudColor.a);
}
