/* eslint-disable immutable/no-mutation */

import potpack from 'potpack';

import { Renderer,Transform,Program,Vec2,Texture} from 'ogl'

export const renderer = new Renderer({ dpr: 0.75})
export const scene = new Transform()

import vertex from "../shaders/main.vert"
import fragment from "../shaders/main.frag"


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



const images = [ {
    w:8,
    h:8,
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

},
{
    w:8,
    h:8,
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

},
{
    w:8,
    h:8,
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

},
{
    w:8,
    h:8,
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

},
{
    w:8,
    h:8,
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

},
{
    w:8,
    h:8,
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

},
{
    w:8,
    h:8,
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

},
{
    w:8,
    h:8,
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

},
{
    w:8,
    h:8,
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

},
{
    w:8,
    h:8,
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

},
{
    w:8,
    h:8,
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

},
{
    w:8,
    h:8,
    data:new Uint8Array([
    5,5,5,5,5,5,5,5,
    5,5,5,5,5,5,5,5,
    5,5,5,5,5,5,5,5,
    5,5,2,5,5,2,5,5,
    5,5,5,5,5,5,5,5,
    5,5,3,3,3,3,5,5,
    5,5,5,5,5,5,5,5,
    5,5,5,5,5,5,5,5
])
}
,{
    w:8,
    h:13,
    data:new Uint8Array([
    6,6,2,6,6,2,6,6,
    6,6,6,6,6,6,6,6,
    6,6,3,3,3,3,6,6,
    6,6,6,6,6,6,6,6,
    6,6,6,6,6,6,6,6,
    6,6,6,6,6,6,6,6,
    6,6,6,6,6,6,6,6,
    6,6,6,6,6,6,6,6,
    6,6,2,6,6,2,6,6,
    6,6,6,6,6,6,6,6,
    6,6,3,3,3,3,6,6,
    6,6,6,6,6,6,6,6,
    6,6,6,6,6,6,6,6
])
}

]


const {w:width,h:height} =potpack(images);

const c = new Uint8Array(width*height);

    for(const image of images){
       for (let y = 0; y < image.h ; y++) {
            for (let x = 0; x < image.w ; x++) {
                        c[x+(y+image.y)*width+image.x] = image.data[x+y*image.w];        
            }
        } 
    }

  

const tex = new Texture(gl,{image:c,generateMipmaps:false,format:gl.ALPHA,width,height,magFilter:gl.NEAREST,minFilter:gl.NEAREST})

const program = new Program(gl, {
    vertex,
    fragment,
    uniforms: {
        uTime,   
        zoom,
        pan,
        u_image: { value: tex },
    },
    transparent: true,
    depthTest: false
})

if(!gl.getProgramParameter(program.program, gl.LINK_STATUS)){
    throw new Error("shader compile error ^^^^^")
}

requestAnimationFrame(update)

function update() {
    requestAnimationFrame(update);
    uTime.value += 0.01;
    program.use();
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.drawArrays(gl.POINTS, 0, 10);
}
