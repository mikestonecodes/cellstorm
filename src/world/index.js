/* eslint-disable immutable/no-mutation */

import { Renderer, Program, Vec2, Geometry } from 'ogl'

import { Texture3D } from '../texture3D';

import vertex from "../shaders/main.vert"
import fragment from "../shaders/main.frag"

let gl;
let timeUniformLoc;
let program;
let geometry;
let  numQuads;

const zoom = { value: 0.5 }
const pan = { value: new Vec2(0, 0) }
const uTime = { value: 0.0 }

const texSize = 32;
const texWidth = 1024;
const texHeight = texWidth;
const texCols = Math.floor(texWidth / texSize);
const layers = 20;

self.onmessage = function (ev) {
    if (ev.data.msg === 'offscreen') {
        ev.data.canvas.style = {};
        init(ev.data.canvas,ev.data.numparticles);
    }
    if(ev.data.msg === 'resize'){
        gl.canvas.width = ev.data.width *0.75;
        gl.canvas.height = ev.data.height *0.75;
    }
    if(ev.data.msg === 'uploadTexture'){
        uploadTexture(ev.data.images);
    }
    if(ev.data.msg === 'updateBuffer'){
        updateBuffer(ev.data.key,ev.data.data);
    }

}
function uploadTexture(images){
    
    const layers = Math.ceil(images.length / (texCols * texCols));

    const c = new Uint8Array((texWidth * texHeight) * layers);
    let indx = 0;
    for (const image of images) {
        for (let y = 0; y < texSize; y++) {
            for (let x = 0; x < image.wa; x++) {
                c[x + (y + (Math.floor(indx / texCols) * texSize)) * texWidth + ((indx % texCols) * 32)] = image.data[x + y * image.wa];
            }
        }
        indx++;
    }
    
    gl.texSubImage3D(gl.TEXTURE_2D_ARRAY, 0 /*level */, 0 /*x*/, 0 /*y*/, 0 /*z*/, 1024, 1024,layers, gl.ALPHA, gl.UNSIGNED_BYTE, c);

    return c;
}

function updateBuffer(key,data){
    geometry.attributes[key].data = data;
    geometry.updateAttribute(geometry.attributes[key]);
}

function init(canvas,numparticles = 10000) {
   
    numQuads = numparticles;
    const renderer = new Renderer({ canvas})
    gl = renderer.gl

    gl.clearColor(1, 1, 1, 1);


    const tex3D = new Texture3D(gl, { target: gl.TEXTURE_2D_ARRAY, image: new Uint8Array((texWidth * texHeight) * layers) , generateMipmaps: false, format: gl.ALPHA, type: gl.UNSIGNED_BYTE, width: texWidth, layers, magFilter: gl.NEAREST, minFilter: gl.NEAREST })

    program = new Program(gl, {
        vertex,
        fragment,
       
        transparent: true,
        cullFace: false,
        uniforms: {
            uTime,
            zoom,
            pan,
            width: { value: texWidth },
            height: { value: texHeight },
            u_image: { value: tex3D },
            numQuads: { value: numQuads }
        }
    })

    if (!gl.getProgramParameter(program.program, gl.LINK_STATUS)) {
        throw new Error("shader compile error ^^^^^")
    }

    program.use();

    geometry = new Geometry(gl, {
        ivid: { data:new Float32Array(), instanced: 1 },
    });

    geometry.bindAttributes(program);

  
    
    timeUniformLoc = gl.getUniformLocation(program.program, "uTime");
    requestAnimationFrame(update)
}
function update() {
  
    uTime.value += 0.01;
    gl.uniform1f(timeUniformLoc, uTime.value);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, numQuads)
    requestAnimationFrame(update);
}
