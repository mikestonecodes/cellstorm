/* eslint-disable immutable/no-mutation */
import { Renderer,Transform,Geometry,Program,Mesh,Vec2} from 'ogl'

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


const program = new Program(gl, {
    vertex,
    fragment,
    uniforms: {
        uTime,   
        zoom,
        pan
    },
    transparent: true,
    depthTest: false
})

if(!gl.getProgramParameter(program.program, gl.LINK_STATUS)){
    throw new Error("shader compile error ^^^^^")
}

requestAnimationFrame(update)

function update() {
    requestAnimationFrame(update)
    program.use();
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.drawArrays(gl.POINTS, 0, 4000);
}
