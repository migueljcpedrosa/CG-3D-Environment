#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;   
uniform sampler2D uSampler2;  
uniform float timeFactor;    

void main() {
    vec2 animatedCoord = vTextureCoord + vec2(timeFactor * 0.005);

    vec4 color = texture2D(uSampler, animatedCoord);

    gl_FragColor = color;
}
