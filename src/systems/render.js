import { Renderer,Transform,Triangle,Program,Mesh} from 'ogl'

export const renderer = new Renderer({ dpr: 1.0})
export const scene = new Transform()

import vertex from "../shaders/main.vert"
import fragment from "../shaders/main.frag"

const gl = renderer.gl
document.body.appendChild(gl.canvas)
gl.clearColor(0.5, 0.5, 0.5, 1)

const aspectRatio = { value: 1.0 }

function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight)
    aspectRatio.value = gl.canvas.width / gl.canvas.height
}

resize()

window.addEventListener('resize', resize, false)

const geometry = new Triangle(gl)


const program = new Program(gl, {
    vertex,
    fragment,
    uniforms: {
        uTime: { value: 0 },
        aspectRatio
    },
})

if(!gl.getProgramParameter(program.program, gl.LINK_STATUS)){
    throw new Error("shader compile error ^^^^^")
}

const mesh = new Mesh(gl, { geometry, program })

export const renderSystem = (() => {
    
   renderer.render({ scene:mesh})
})