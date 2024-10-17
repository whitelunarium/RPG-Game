import GameEnv from './GameEnv.js';
import Player from './Player.js';

// Define non-mutable constants as defaults
const SCALE_FACTOR = 25; // 1/nth of the height of the canvas
const STEP_FACTOR = 100; // 1/nth, or N steps up and across the canvas
const ANIMATION_RATE = 1; // 1/nth of the frame rate

/**
 * Player is a dynamic class that manages the data and events for a player object.
 * 
 * The focus of this class is to handle the player's state, rendering, and key events.
 * 
 * This class uses a classic Java class pattern which is nice for managing object data and events.
 * 
 * The classic Java class pattern provides a structured way to define the properties and methods
 * associated with the player. This approach helps encapsulate the player's state and behavior,
 * making the code more modular and easier to maintain. By using this pattern, we can create
 * multiple instances of the Player class, each with its own state and behavior.
 * 
 * @class Player
 * @property {Object} position - The current position of the player.
 * @property {Object} velocity - The current velocity of the player.
 * @property {Object} scale - The scale of the player based on the game environment.
 * @property {number} size - The size of the player.
 * @property {number} width - The width of the player.
 * @property {number} height - The height of the player.
 * @property {number} xVelocity - The velocity of the player along the x-axis.
 * @property {number} yVelocity - The velocity of the player along the y-axis.
 * @property {Image} spriteSheet - The sprite sheet image for the player.
 * @property {number} frameIndex - The current frame index for animation.
 * @property {number} frameCount - The total number of frames for each direction.
 * @property {Object} spriteData - The data for the sprite sheet.
 * @property {number} frameCounter - Counter to control the animation rate.
 * @method resize - Resizes the player based on the game environment.
 * @method draw - Draws the player on the canvas.
 * @method update - Updates the player's position and ensures it stays within the canvas boundaries.
 * @method bindEventListeners - Binds key event listeners to handle player movement.
 * @method handleKeyDown - Handles key down events to change the player's velocity.
 * @method handleKeyUp - Handles key up events to stop the player's velocity.
 */
class Fish extends Player {
    /**
     * The constructor method is called when a new Player object is created.
     * 
     * @param {Object|null} sprite - The sprite data for the player. If null, a default red square is used.
     */
    constructor(sprite = null) {
        super(sprite);
        this.position = { x: GameEnv.innerWidth - this.size, y: GameEnv.innerHeight - this.size };
        this.direction = 'left'; // Initial direction
    }

    isColliding(player) {
        return (this.position.x < player.position.x + player.width &&
                this.position.x + this.width > player.position.x &&
                this.position.y < player.position.y + player.height &&
                this.position.y + this.height > player.position.y);
    }

    reset() {
        this.position = { x: GameEnv.innerWidth - this.size, y: GameEnv.innerHeight - this.size };
        this.resize()
    }

    /**
     * Handles key down events to change the player's velocity.
     * 
     * This method updates the player's velocity based on the key pressed.
     * 
     * @param {Object} event - The keydown event object.
     */
    handleKeyDown({ keyCode }) {
        switch (keyCode) {
            case 38: // 'Arrow up' key
                this.velocity.y -= this.yVelocity;
                this.direction = 'up';
                break;
            case 37: // 'Arrow left' key
                this.velocity.x -= this.xVelocity;
                this.direction = 'left';
                break;
            case 40: // 'Arrow down' key
                this.velocity.y += this.yVelocity;
                this.direction = 'down';
                break;
            case 39: // 'Arrow right' key
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
            case 38: // 'Arrow up' key
                this.velocity.y = 0;
                break;
            case 37: // 'Arrow left' key
                this.velocity.x = 0;
                break;
            case 40: // 'Arrow down' key
                this.velocity.y = 0;
                break;
            case 39: // 'Arrow right' key
                this.velocity.x = 0;
                break;
        }
    }
}

export default Fish;
