#version 300 es
precision highp float;

#define PI 3.1415926538

uniform float uTime;
uniform sampler2D u_image;
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
    uv.y = 1.0 - uv.y;
    
    uv/=0.5;
    uv-=0.5;

     if(uv.x < 0. || uv.x > 0. + 0.99999 || uv.y < 0. || uv.y > 0. + 0.99999) {
         discard;
    }

    vec2 spriteSize = vec2(8.,8.);
    
    float index = 0.;
    float dx = spriteSize.x / float(width);
    float dy = spriteSize.y / float(height);
    
    float cols = float(width) / spriteSize.x;
    // From linear index to row/col pair
    float col = 0. / spriteSize.x;
    float row = 37. / spriteSize.y;
    // Finally to UV texture coordinates
    
    

    uv = vec2(dx * uv.x + col * dx, 1.0 - dy - row * dy + dy * uv.y);



     int indx = int(texture(u_image, uv).a * 255.0) ;
   
   
    color=  vec4(palette[indx],1.0);
}


void main() {
    drawTiles();
}

