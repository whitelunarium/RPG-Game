import GameEnv from './GameEnv.js';
import Background from './Background.js';
import Player from './Player.js';

const GameControl = {
    start: function(assets = {}) {
        GameEnv.create(); // Create the Game World
        this.background = new Background(assets.image[0], assets.image[1]); // Pass both images
        this.player = new Player(assets.sprite || null);
        this.gameLoop();
    },

    gameLoop: function() {
        GameEnv.clear(); // Clear the canvas
        this.background.draw(); // Draw the background images
        this.player.update(); // Update the player
        requestAnimationFrame(this.gameLoop.bind(this));
    },

    resize: function() {
        GameEnv.resize(); // Resize the canvas and player
        this.player.resize();
        // add comment
    }
};

// Detect window resize events
window.addEventListener('resize', GameControl.resize.bind(GameControl));

export default GameControl;