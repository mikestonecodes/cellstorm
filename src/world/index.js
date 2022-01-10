import { createWorld } from 'bitecs'

import {renderSystem} from '../systems/render'

export const world = createWorld();

requestAnimationFrame(update);

function update() {
    requestAnimationFrame(update);
    renderSystem(world);
}
