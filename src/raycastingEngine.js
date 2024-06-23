class RaycastingEngine {
    constructor(canvas, map, textures) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.map = map;
        this.textures = textures;
        this.width = canvas.width;
        this.height = canvas.height;
        this.fov = Math.PI / 3; // Field of view
        this.maxDepth = 20;
    }

    castRay(angle, posX, posY, dirX, dirY) {
        let sin = Math.sin(angle);
        let cos = Math.cos(angle);
        let distance = 0;
        let hit = false;
        let wallX;

        while (!hit && distance < this.maxDepth) {
            distance += 0.1;
            let x = posX + cos * distance;
            let y = posY + sin * distance;

            if (this.map[Math.floor(y)][Math.floor(x)] > 0) {
                hit = true;
                wallX = x;
            }
        }

        return { distance, wallX };
    }

    render(posX, posY, dirX, dirY) {
        this.context.clearRect(0, 0, this.width, this.height);

        for (let i = 0; i < this.width; i++) {
            let angle = (i / this.width - 0.5) * this.fov;
            let ray = this.castRay(angle, posX, posY, dirX, dirY);
            let distance = ray.distance * Math.cos(angle); // Correct fisheye effect
            let wallHeight = Math.min(this.height / distance, this.height);

            this.context.fillStyle = 'gray';
            this.context.fillRect(i, (this.height - wallHeight) / 2, 1, wallHeight);
        }
    }
}

export default RaycastingEngine;