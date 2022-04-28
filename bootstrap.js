const canvas = document.querySelector('#renderer');
const offscreenCanvas = canvas.transferControlToOffscreen();

const worker = new Worker(
    new URL('src/world/index', import.meta.url),
    { type: 'module' }
);

const numparticles = 5000;

worker.postMessage({ msg: 'offscreen', canvas: offscreenCanvas, numparticles }, [offscreenCanvas]);

function resize() {
    worker.postMessage({ msg: 'resize', width: window.innerWidth, height: window.innerHeight });
}
resize()

window.addEventListener('resize', resize, false)

const images = [
    {
        width: 11,
        id:50,
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
        width: 8,
        id:51,
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

for (let i = 0; i < 0; i++) {
    images.push({
        wa: 32,
        idx:i+55,
        data: new Uint8Array(32 * 32).fill(0).map(() => Math.floor(Math.random() * 7))
    })
}

worker.postMessage({ msg: 'uploadTextureBatch', images });

// 0...numparticles in array
//const data = new Float32Array([...Array(numparticles).keys()]);
const textureIds = new Float32Array(numparticles*2).fill(0);

for (let i = 0; i < numparticles; i++) {
    textureIds.set([50 + (Math.random() > 0.5?0:1),i],i*2)
}

worker.postMessage({ msg: 'updateAttribute', key: "textureId", data:textureIds });