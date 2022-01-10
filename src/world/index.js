import { createWorld,addEntity,addComponent } from 'bitecs'

import {renderSystem} from '../systems/render'

export const world = createWorld();

const bot = addEntity(world)

requestAnimationFrame(update);

function update() {
    requestAnimationFrame(update);
    renderSystem(world);
}
