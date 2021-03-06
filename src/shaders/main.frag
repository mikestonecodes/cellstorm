#version 300 es
precision highp float;
 precision highp sampler2DArray;
#define PI 3.1415926538

uniform float uTime;
uniform sampler2DArray u_image;
uniform sampler2D u_imagetest;
uniform highp int width;
uniform highp int height;

flat in int vid;
out vec4 color;

in vec2 vemu_PointCoord;

#pragma glslify: palette = require('./palette.glsl')



void drawTiles(){
    vec2    uv = vemu_PointCoord.xy; 
    color = vec4(0.5);
    if(uv.x < 0. || uv.x > 0. + 1.|| uv.y < 0. || uv.y > 0. + 1.) {
       color = vec4(0.0,0.0,0.0,0.0);
       return;
    }


    vec2 spriteSize = vec2(32.,32.);
    
    float spnum = float(vid );
  
    float dx = spriteSize.x / float(width);
    float dy = spriteSize.y / float(height);
    
    float cols = float(width) / spriteSize.x;
    
    float index = mod(spnum  , cols*cols);
    // From linear index to row/col pair
    float col = mod(index, cols);
    float row = floor(index / cols);
    uv = vec2(dx * uv.x + (col/cols) ,   dy * uv.y + (row/cols) );
    int currentLayer = int(floor(spnum / (cols*cols)));
    vec3 currentPos = vec3(uv, float(currentLayer));
    int indx = int(texture(u_image, currentPos).a * 255.0) ;
    if(indx == 0 ){
          color = vec4(0.0,0.0,0.0,0.0);
       return;
    }
    color=  vec4(palette[indx],1.0);
    
    }


void main() {
    drawTiles();
}

