/* eslint-disable immutable/no-mutation */


import { Renderer,Transform,Program,Vec2,Texture} from 'ogl'

import {Texture3D } from '../texture3D';

export const renderer = new Renderer({ dpr: 0.75})
export const scene = new Transform()

import vertex from "../shaders/main.vert"
import fragment from "../shaders/main.frag"
import Stats from "stats.js"

const gl = renderer.gl
document.body.appendChild(gl.canvas)
gl.clearColor(1, 1, 1, 1);

const zoom = { value: 0.5 }
const pan = { value: new Vec2(0,0)}
const uTime = { value: 0.0 }

function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight)
}

resize()
window.addEventListener('resize', resize, false)

var stats = new Stats();
stats.showPanel(0); 
document.body.appendChild( stats.dom );


const images = [ 
    
    {

        wa:11,
        data:new Uint8Array([
        0,0,1,1,1,1,0,0,0,1,1,
        0,1,0,0,0,0,1,0,0,1,1,
        1,0,0,0,0,0,0,1,0,1,1,
        1,0,2,0,0,2,0,1,0,1,1,
        1,0,0,0,0,0,0,1,0,1,1,
        1,0,3,3,3,3,0,1,0,1,1,
        0,1,0,0,0,0,1,0,0,1,1,
        0,0,1,1,1,1,0,0,0,1,1,
        0,0,1,1,1,1,0,0,1,1,0,
        0,0,1,1,1,1,0,0,0,1,1,
        0,1,0,0,0,0,1,0,0,1,1,
        1,0,0,0,0,0,0,1,0,1,1,
        1,0,2,0,0,2,0,1,0,1,1,
        1,0,0,0,0,0,0,1,0,1,1,
        1,0,3,3,3,3,0,1,0,1,1,
        0,1,0,0,0,0,1,0,0,1,1,
        0,0,1,1,1,1,0,0,0,1,1,
        0,0,1,1,1,1,0,0,1,1,0
    ])
    
    },
    {
    
    wa:8,
    data:new Uint8Array([
    0,0,1,1,1,1,0,0,
    0,1,0,0,0,0,1,0,
    1,0,0,0,0,0,0,1,
    1,0,2,0,0,2,0,1,
    1,0,0,0,0,0,0,1,
    1,0,3,3,3,3,0,1,
    0,1,0,0,0,0,1,0,
    0,0,1,1,1,1,0,0
])

}]


for (let i = 0; i < 10000; i++) {
    images.push({
        wa:32,
       
        data:new Uint8Array(32 * 32).fill(0).map(() =>Math.floor(Math.random() *7 ))
    })
}


const width =   1024 ;
const height = width;

const cols = Math.floor(width / 32);
const layers = Math.ceil(images.length / (cols*cols) );

const c = new Uint8Array((width*height) * layers );
   let indx = 0;
  
   
    for(const image of images){
       for (let y = 0; y < 32 ; y++) {
            for (let x = 0; x < image.wa ; x++) { 
                        c[x+(y+(Math.floor(indx/cols ) *32))*width+((indx%cols)*32 ) ] = image.data[x+y*image.wa];    
                        
            }
        }
        indx++;    
    }

  
const tex3D = new Texture3D(gl,{target:gl.TEXTURE_2D_ARRAY,image:c,generateMipmaps:false,format:gl.ALPHA,type:gl.UNSIGNED_BYTE,width:width,layers,magFilter:gl.NEAREST,minFilter:gl.NEAREST})
let params = (new URL(document.location)).searchParams;
let numparticles = Number(params.get("particles")) || 100000;
const numQuads =numparticles;
const program = new Program(gl, {
    vertex,
    fragment, 
    depthTest:true,
    transparent:false,
    cullFace:false,
    uniforms: {
        uTime,   
        zoom,
        pan,
        width:{value   :width},
        height:{value  :height},
     
        u_image: { value: tex3D },
        numQuads:{value:numQuads}
    }
})

if(!gl.getProgramParameter(program.program, gl.LINK_STATUS)){
    throw new Error("shader compile error ^^^^^")
}

requestAnimationFrame(update)

function update() {

    
    stats.begin();
    uTime.value += 0.01;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    program.use();
   
    gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, numQuads)
    stats.end();

    requestAnimationFrame(update);
}
