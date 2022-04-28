const canvas = document.querySelector('#renderer');
const offscreenCanvas = canvas.transferControlToOffscreen();

const worker = new Worker(
    new URL('src/world/index.js', import.meta.url),
    { type: 'module' }
);

const numparticles = 5000;

worker.postMessage({ msg: 'offscreen', canvas: offscreenCanvas , numparticles }, [offscreenCanvas]);


const images =  [

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

    }];

    for (let i = 0; i < 20000; i++) {
        images.push({
            wa: 32,
            data: new Uint8Array(32 * 32).fill(0).map(() => Math.floor(Math.random() * 7))
        })
    }

worker.postMessage({ msg: 'uploadTexture', images});

const data = new Float32Array([...Array(numparticles).keys()] );

worker.postMessage({ msg: 'updateBuffer', key:"ivid",data});

function resize() {
    worker.postMessage({ msg: 'resize', width:window.innerWidth,height:window.innerHeight });
}

resize()
window.addEventListener('resize', resize, false)