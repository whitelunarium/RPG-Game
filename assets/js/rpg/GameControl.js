import GameEnv from './GameEnv.js';
import Background from './Background.js';
import Player from './Player.js';

const GameControl = {
    start: function(assets = {}) {
        console.log("Game control initialized");
        GameEnv.create(); // Create the Game World
        this.background = new Background(assets.image[0], assets.image[1]); // Pass both images
        this.player = new Player(assets.sprite[0] || null);
        
        // Test drawing something to ensure the game is running
        GameEnv.ctx.fillStyle = 'blue'; // Change color for visibility
        GameEnv.ctx.fillRect(0, 0, GameEnv.innerWidth, GameEnv.innerHeight); // Fill background
        this.gameLoop(); // Start the game loop
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