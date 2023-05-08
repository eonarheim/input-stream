import robotPNG from '../img/robot.png';
import { Clock } from './clock';
import { FpsSampler } from './fps-sampler';
import { Keyboard } from './keyboard';
import { Sprite } from './sprite';

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.width = 600;
canvas.height = 400;
const context = canvas.getContext('2d');
if (!context) {
    throw Error("No graphics context");
}
// pixel art
context.imageSmoothingEnabled = false;

function clear(context: CanvasRenderingContext2D) {
    context.fillStyle = '#176baadd';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

let keyboard: Keyboard;
let sprite: Sprite;
let spriteX = 100;
let spriteY = 100;
let oldSpriteX = 100;
let oldSpriteY = 100;
let spriteVelX = 100; // pixels/sec
let spriteVelY = 0;
function init(resources: { [key: string]: HTMLImageElement }) {
    keyboard = new Keyboard();

    const { robotImg } = resources;
    const spriteIndex = 3;
    const spriteWidth = 32;
    const spriteHeight = 32;
    sprite = new Sprite({
        img: robotImg,
        view: {
            x: spriteIndex * spriteWidth,
            y: 0,
            width: spriteWidth,
            height: spriteHeight
        }
    })
}

async function load() {
    const robotImg = document.createElement('img');
    robotImg.src = robotPNG;
    await robotImg.decode();
    return { robotImg }
}

// Update the game every frame
function update(elapsedMs: number) {
    const seconds = elapsedMs / 1000;

    spriteVelX = 0;
    spriteVelY = 0;
    if (keyboard.isPressed('ArrowRight')) {
        spriteVelX = 100;
    }
    if (keyboard.isPressed('ArrowLeft')) {
        spriteVelX = -100;
    }
    if (keyboard.isPressed('ArrowUp')) {
        spriteVelY = -100;
    }
    if (keyboard.isPressed('ArrowDown')) {
        spriteVelY = 100;
    }


    oldSpriteX = spriteX;
    oldSpriteY = spriteY;

    // basic euler integration
    spriteX += spriteVelX * seconds;
    spriteY += spriteVelY * seconds;
}
let fpsSampler = new FpsSampler({
    initialFps: 60,
    nowFn: () => performance.now()
});
let clock: Clock;

/**
 * 
 * @param a value
 * @param b value
 * @param time Between 0 and 1
 * @returns 
 */
function lerp(a: number, b: number, time: number) {
    return a * (1.0 - time) + b * time;
}

let currentFrameLag = 0;
let fixedUpdateIntervalMs = 1000 / 120; // 50 fps update
// Draw the game every frame
function draw(context: CanvasRenderingContext2D) {

    const blend = currentFrameLag / fixedUpdateIntervalMs;

    const newX = lerp(oldSpriteX, spriteX, blend);
    const newY = lerp(oldSpriteY, spriteY, blend);

    sprite.draw(context, newX, newY, 100, 100);
    context.font = '40px sans-serif';
    context.fillStyle = 'yellow';
    context.fillText('Draw FPS:' + clock.fpsSampler.fps.toFixed(2), 10, 40);
    context.font = '40px sans-serif';
    context.fillStyle = 'lime';
    context.fillText('Update FPS:' + fpsSampler.fps.toFixed(2), 10, 80);


}

async function main(context: CanvasRenderingContext2D) {
    const resources = await load();
    init(resources);
    let lagMs = 0;
    clock = new Clock((elapsedMs) => {
        fpsSampler.start();
        lagMs += elapsedMs;
        while (lagMs >= fixedUpdateIntervalMs) {
            update(fixedUpdateIntervalMs);
            lagMs -= fixedUpdateIntervalMs;
            fpsSampler.end();
        }
        currentFrameLag = lagMs;
        clear(context);
        draw(context);
    }, 60);
    clock.start();
}
main(context);