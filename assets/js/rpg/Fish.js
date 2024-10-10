import Player from './Player.js';

class Fish extends Player {
    constructor(data = null) {
        super(data);
    }

    update() {
        super.update();
    }

    resize() {
        super.resize();
    }

    handleKeyDown({ keyCode }) {
        switch (keyCode) {
            case 38: // 'UpArrow' key
                this.velocity.y -= this.yVelocity;
                this.direction = 'up';
                break;
            case 37: // 'LeftArrow' key
                this.velocity.x -= this.xVelocity;
                this.direction = 'left';
                break;
            case 40: // 'DownArrow' key
                this.velocity.y += this.yVelocity;
                this.direction = 'down';
                break;
            case 39: // 'RightArrow' key
                this.velocity.x += this.xVelocity;
                this.direction = 'right';
                break;
        }
    }

    /**
     * Handles key up events to stop the player's velocity.
     * 
     * This method stops the player's velocity based on the key released.
     * 
     * @param {Object} event - The keyup event object.
     */
    handleKeyUp({ keyCode }) {
        switch (keyCode) {
            case 38: // 'UpArrow' key
                this.velocity.y = 0;
                break;
            case 37: // 'LeftArrow' key
                this.velocity.x = 0;
                break;
            case 40: // 'DownArrow' key
                this.velocity.y = 0;
                break;
            case 39: // 'RightArrow' key
                this.velocity.x = 0;
                break;
        }
    }
}

export default Fish;
