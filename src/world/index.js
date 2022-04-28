/* eslint-disable immutable/no-mutation */

import { Renderer, Program, Vec2, Geometry } from 'ogl'

import { Texture3D } from '../texture3D';

import vertex from "../shaders/main.vert"
import fragment from "../shaders/main.frag"

let gl;
let timeUniformLoc;

const numparticles = 2000000;
const numQuads = numparticles;

const zoom = { value: 0.5 }
const pan = { value: new Vec2(0, 0) }
const uTime = { value: 0.0 }


self.onmessage = function (ev) {
    if (ev.data.msg === 'offscreen') {
        ev.data.canvas.style = {w:1000,h:1000};
        init(ev.data.canvas);
    }
    if(ev.data.msg === 'resize'){
        gl.canvas.width = ev.data.width *0.75;
        gl.canvas.height = ev.data.height *0.75;
    }
}

function init(canvas) {
    const renderer = new Renderer({ canvas})
    gl = renderer.gl

    gl.clearColor(1, 1, 1, 1);


    const images = [

        {

            wa: 11,
            data: new Uint8Array([
                0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1,
                0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1,
                1, 0, 2, 0, 0, 2, 0, 1, 0, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1,
                1, 0, 3, 3, 3, 3, 0, 1, 0, 1, 1,
                0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1,
                0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1,
                0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0,
                0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1,
                0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1,
                1, 0, 2, 0, 0, 2, 0, 1, 0, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1,
                1, 0, 3, 3, 3, 3, 0, 1, 0, 1, 1,
                0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1,
                0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1,
                0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0
            ])

        },
        {

            wa: 8,
            data: new Uint8Array([
                5, 5, 5, 5, 5, 5, 5, 5,
                5, 5, 5, 5, 5, 5, 5, 5,
                5, 5, 5, 5, 5, 5, 5, 5,
                5, 5, 5, 5, 5, 5, 5, 5,
                5, 5, 5, 5, 5, 5, 5, 5,
                5, 5, 5, 5, 5, 5, 5, 5,
                5, 5, 5, 5, 5, 5, 5, 5
            ])

        }]


    for (let i = 0; i < 10000; i++) {
        images.push({
            wa: 32,
            data: new Uint8Array(32 * 32).fill(0).map(() => Math.floor(Math.random() * 7))
        })
    }


    const width = 1024;
    const height = width;

    const cols = Math.floor(width / 32);
    const layers = Math.ceil(images.length / (cols * cols));

    const c = new Uint8Array((width * height) * layers);
    let indx = 0;
    for (const image of images) {
        for (let y = 0; y < 32; y++) {
            for (let x = 0; x < image.wa; x++) {
                c[x + (y + (Math.floor(indx / cols) * 32)) * width + ((indx % cols) * 32)] = image.data[x + y * image.wa];
            }
        }
        indx++;
    }

    const tex3D = new Texture3D(gl, { target: gl.TEXTURE_2D_ARRAY, image: c, generateMipmaps: false, format: gl.ALPHA, type: gl.UNSIGNED_BYTE, width: width, layers, magFilter: gl.NEAREST, minFilter: gl.NEAREST })

    const program = new Program(gl, {
        vertex,
        fragment,
       
        transparent: true,
        cullFace: false,
        uniforms: {
            uTime,
            zoom,
            pan,
            width: { value: width },
            height: { value: height },
            u_image: { value: tex3D },
            numQuads: { value: numQuads }
        }
    })

    if (!gl.getProgramParameter(program.program, gl.LINK_STATUS)) {
        throw new Error("shader compile error ^^^^^")
    }

    //0 ... numparticles
    const data = new Float32Array([...Array(numparticles).keys()]);

    const geometry = new Geometry(gl, {
        ivid: { data, instanced: 1 },
    });

    geometry.bindAttributes(program);
    program.use();

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
