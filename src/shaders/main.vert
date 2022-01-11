#version 300 es

in vec2 uv;
in vec2 position;
uniform float aspectRatio;
out vec2 vUv;

void main() {
    vUv = vec2(mix(0.5, uv.x, aspectRatio),uv.y);
    gl_Position = vec4(position, 0, 1);
}