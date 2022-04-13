#version 300 es
precision highp float;
 precision highp sampler2DArray;
#define PI 3.1415926538

uniform float uTime;
uniform sampler2DArray u_image;
uniform int width;
uniform int height;

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

void drawTiles(){
    vec2    uv = gl_PointCoord.xy; 
    uv = rotateUV(uv , rotation,vec2(0.5) ) ;
    uv/=0.5;
    uv-=0.5;

    if(uv.x < 0. || uv.x > 0. + 0.99999 || uv.y < 0. || uv.y > 0. + 0.99999) {
         discard;
         return;
    }

    vec2 spriteSize = vec2(32.,32.);
    
    float spnum =float(vid);
  

    float dx = spriteSize.x / float(width);
    float dy = spriteSize.y / float(height);
    
    float cols = float(width) / spriteSize.x;
    
    float index = mod(spnum  , cols*cols);
    // From linear index to row/col pair
    float col = mod(index, cols);
    float row = floor(index / cols);
    uv = vec2(dx * uv.x + (col/cols) ,   dy * uv.y + (row/cols) );
    int indx = int(texture(u_image, vec3(uv,floor(spnum/(cols*cols)))).a * 255.0) ;
    if(indx == 0 )discard;
    color=  vec4(palette[indx],1.0);
}


void main() {
    drawTiles();
}

