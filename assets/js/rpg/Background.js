import GameEnv from './GameEnv.js';

export class Background {
    constructor(imageSrc = null, imageSrc2 = null) {
        if (imageSrc) {
            this.image = new Image();
            this.image.src = imageSrc.src;
        } else {
            this.image = null;
        }

        if (imageSrc2) {
            this.image2 = new Image();
            this.image2.src = imageSrc2.src;
        } else {
            this.image2 = null;
        }
    }

    draw() {
        const ctx = GameEnv.ctx;
        const width = GameEnv.innerWidth;
        const height = GameEnv.innerHeight;

        // Draw the first background image if it exists
        if (this.image) {
            ctx.drawImage(this.image, 0, 0, width, height);
        } else {
            // Fill the canvas with a default color if no first background image is provided
            ctx.fillStyle = '#87CEEB';
            ctx.fillRect(0, 0, width, height);
        }

        // Draw the second background image as a stationary sprite
        if (this.image2) {
            // Draw at a fixed position (adjust x, y as needed)
            const stationaryX = 0; // Set the desired x position
            const stationaryY = 0; // Set the desired y position
            ctx.drawImage(this.image2, stationaryX, stationaryY, this.image2.width, this.image2.height);
        }
    }
}

export default Background;
