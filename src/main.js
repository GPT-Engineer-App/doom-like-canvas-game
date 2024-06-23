import RaycastingEngine from './raycastingEngine.js';

const canvas = document.getElementById('gameCanvas');
const map = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
];
const textures = {}; // Placeholder for textures

const engine = new RaycastingEngine(canvas, map, textures);

let posX = 3.5;
let posY = 3.5;
let dirX = -1;
let dirY = 0;

function gameLoop() {
    engine.render(posX, posY, dirX, dirY);
    requestAnimationFrame(gameLoop);
}

gameLoop();