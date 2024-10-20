// At the very top of your JavaScript file
console.log("Starting script execution...");
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
        console.log("Drawing background...");
        const ctx = GameEnv.ctx;
        const width = GameEnv.innerWidth;
        const height = GameEnv.innerHeight;
    
        if (this.image) {
            console.log("Drawing first image");
            ctx.drawImage(this.image, 0, 0, width, height);
        } else {
            ctx.fillStyle = '#87CEEB';
            ctx.fillRect(0, 0, width, height);
        }
    
        if (this.image2) {
            console.log("Drawing second image");
            ctx.drawImage(this.image2, 0, 0, width, height);
        }
    }
}

export default Background;
