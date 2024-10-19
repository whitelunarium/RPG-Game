
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

        // Draw the second stationary background image if it exists
        if (this.image2) {
            ctx.drawImage(this.image2, 0, 0, width, height);
        }
    }
}

export default Background;
