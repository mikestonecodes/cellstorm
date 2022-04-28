const canvas = document.querySelector('#renderer');
const offscreenCanvas = canvas.transferControlToOffscreen();

const worker = new Worker(
    new URL('src/world/index.js', import.meta.url),
    { type: 'module' }
);

worker.postMessage({ msg: 'offscreen', canvas: offscreenCanvas }, [offscreenCanvas]);

function resize() {
    console.log("yo");
   
    worker.postMessage({ msg: 'resize', width:window.innerWidth,height:window.innerHeight });

}

resize()
window.addEventListener('resize', resize, false)