#version 300 es
precision highp float;

#define PI 3.1415926538

uniform float uTime;
uniform sampler2D u_image;

flat in int vid;
flat in float rotation;

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
    vec2 uv = rotateUV(gl_PointCoord.xy ,rotation + PI,vec2(0.5) );
    uv/=0.5;
    uv-=0.5;
    vec2 offset = vec2(size ) ; 
    vec2 tilePos = vec2( (uv + offset) / size * tiles );
     int indx = int(texture(u_image, uv).a * 255.0);
     if(uv.x < 0. || uv.x > 0. + size || uv.y < 0. || uv.y > 0. + size || indx == 0) {
         discard;
    }
   
    color=  vec4(palette[indx],1.0);
}


void main() {
    color=vec4(0.0);
    drawTiles(8.,1.0);
}

