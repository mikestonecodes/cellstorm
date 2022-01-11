#version 300 es
precision highp float;

#define PI 3.1415926538

uniform float uTime;


in vec2 vUv;
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

vec3 drawTiles(float tiles,float size, vec2 pos,float angle,vec2 uv){

    if(angle != 0. ) uv = rotateUV(uv,angle,pos);
   
    pos -= size/2.;

    if( uv.x  < pos.x )return vec3(0.);
    if( uv.x  > size + pos.x )return vec3(0.);

    if( uv.y <   pos.y )return vec3(0.);
    if( uv.y > size + pos.y )return vec3(0.);

    vec2 offset = (size - pos) ; 

    ivec2 tilePos = ivec2( (uv + offset) / size * tiles );

    return color.rgb = palette[(tilePos.x % 4) + (tilePos.y % 4)];
}

void main() {
    color.rgb = drawTiles(4.,0.2,vec2(0.5,0.45),0.7,vUv);
    color.a = 1.0;
}