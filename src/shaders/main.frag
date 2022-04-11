#version 300 es
precision highp float;

#define PI 3.1415926538

uniform float uTime;
flat in int vid;

out vec4 color;
#pragma glslify: palette = require('./palette.glsl')

vec2 rotateUV(vec2 uv, float rotation, vec2 mid)
{
    float cosAngle = cos(rotation);
    float sinAngle = sin(rotation);
    return vec2(
        cosAngle * (uv.x - mid.x) + sinAngle * (uv.y - mid.y) + mid.x,
        cosAngle * (uv.y - mid.y) - sinAngle * (uv.x - mid.x) + mid.y
    );
}

void drawTiles(float tiles,float size){
    vec2 uv = rotateUV(gl_PointCoord.xy ,float(vid)*0.3,vec2(0.5));
    uv/=0.5;
    uv-=0.5;
    vec2 offset = vec2(size ) ; 
    ivec2 tilePos = ivec2( (uv + offset) / size * tiles );
     if(uv.x < 0. || uv.x > 0. + size || uv.y < 0. || uv.y > 0. + size) {
         return;
    }
    color=  vec4(palette[(tilePos.x % 4) + (tilePos.y % 4)],1.0);
}


void main() {
    color=vec4(0.0);
    drawTiles(6.,1.0);
}

