import { Renderer,Transform} from 'ogl';

export const renderer = new Renderer({ dpr: 1.0});
export const scene = new Transform();

const gl = renderer.gl;
document.body.appendChild(gl.canvas);
gl.clearColor(0.5, 0.5, 0.5, 1);

function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
}

resize();

window.addEventListener('resize', resize, false);


export const renderSystem = (() => {
    renderer.render({ scene });
});