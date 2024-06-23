const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

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

const TILE_SIZE = 64;
const FOV = Math.PI / 3;
const NUM_RAYS = canvas.width;

const player = {
    x: TILE_SIZE * 1.5,
    y: TILE_SIZE * 1.5,
    angle: 0,
    speed: 2
};

document.addEventListener('keydown', handleKeyDown);

function handleKeyDown(event) {
    switch (event.key) {
        case 'ArrowUp':
            player.x += Math.cos(player.angle) * player.speed;
            player.y += Math.sin(player.angle) * player.speed;
            break;
        case 'ArrowDown':
            player.x -= Math.cos(player.angle) * player.speed;
            player.y -= Math.sin(player.angle) * player.speed;
            break;
        case 'ArrowLeft':
            player.angle -= 0.1;
            break;
        case 'ArrowRight':
            player.angle += 0.1;
            break;
    }
}

function castRay(angle) {
    let x = player.x;
    let y = player.y;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    while (true) {
        const mapX = Math.floor(x / TILE_SIZE);
        const mapY = Math.floor(y / TILE_SIZE);

        if (map[mapY][mapX] === 1) {
            const dist = Math.sqrt((x - player.x) ** 2 + (y - player.y) ** 2);
            return { dist, angle };
        }

        x += cos;
        y += sin;
    }
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < NUM_RAYS; i++) {
        const rayAngle = player.angle - FOV / 2 + (FOV / NUM_RAYS) * i;
        const { dist } = castRay(rayAngle);

        const wallHeight = (TILE_SIZE * canvas.height) / dist;
        ctx.fillStyle = `rgb(${255 - dist * 0.1}, ${255 - dist * 0.1}, ${255 - dist * 0.1})`;
        ctx.fillRect(i, (canvas.height - wallHeight) / 2, 1, wallHeight);
    }
}

function gameLoop() {
    render();
    requestAnimationFrame(gameLoop);
}

gameLoop();