---
layout: base
title: RPG
permalink: /rpg/
---

<canvas id='gameCanvas'></canvas>

<script type="module">
    import GameControl from '{{site.baseurl}}/assets/js/rpg/GameControl.js';

    // Fullscreen toggle function
    function toggleFullScreen() {
        const canvas = document.getElementById('gameCanvas');
        if (!document.fullscreenElement) {
            if (canvas.requestFullscreen) {
                canvas.requestFullscreen();
            } else if (canvas.mozRequestFullScreen) { // Firefox
                canvas.mozRequestFullScreen();
            } else if (canvas.webkitRequestFullscreen) { // Chrome, Safari, and Opera
                canvas.webkitRequestFullscreen();
            } else if (canvas.msRequestFullscreen) { // IE/Edge
                canvas.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    // Adjust canvas size to fit the screen
    function resizeCanvas() {
        const canvas = document.getElementById('gameCanvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Listen for full-screen change events
    document.addEventListener('fullscreenchange', resizeCanvas);
    window.addEventListener('resize', resizeCanvas);

    // Call resizeCanvas initially to set the correct canvas size
    resizeCanvas();

    // Background data
    const image_src = "{{site.baseurl}}/images/rpg/41524.jpg";
    const image_data = {
        pixels: {height: 580, width: 1038}
    };
    const image = {src: image_src, data: image_data};

    // Sprite data
    const sprite_src = "{{site.baseurl}}/images/rpg/Bunny-Sprite.png";
    const sprite_data = {
        SCALE_FACTOR: 10,
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 50,
        pixels: {height: 175, width: 160},
        orientation: {rows: 4, columns: 3},
        down: {row: 0, start: 0, columns: 3},
        left: {row: 1, start: 0, columns: 3},
        right: {row: 2, start: 0, columns: 3},
        up: {row: 3, start: 0, columns: 3},
    };
    const sprite = {src: sprite_src, data: sprite_data};

    // Assets for game
    const assets = {image: image, sprite: sprite};

    // Start game engine
    GameControl.start(assets);

    // Optionally add a button to toggle full-screen mode
    const canvas = document.getElementById('gameCanvas');
    canvas.addEventListener('click', toggleFullScreen); // Click to enter full-screen

    // Define wall data - example
const walls = [
    { x: 100, y: 150, width: 200, height: 20 },
    { x: 400, y: 300, width: 20, height: 200 },
    // Add more walls as needed
];

// Character properties
let character = {
    x: 50,
    y: 50,
    width: sprite_data.pixels.width / sprite_data.orientation.columns * sprite_data.SCALE_FACTOR,
    height: sprite_data.pixels.height / sprite_data.orientation.rows * sprite_data.SCALE_FACTOR,
    speed: 5
};

// Function to detect collision
function detectCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

// Update character movement with collision detection
function updateCharacter(direction) {
    // Store original position
    let originalX = character.x;
    let originalY = character.y;

    // Move character based on direction
    if (direction === "up") character.y -= character.speed;
    if (direction === "down") character.y += character.speed;
    if (direction === "left") character.x -= character.speed;
    if (direction === "right") character.x += character.speed;

    // Check for collisions with walls
    for (let wall of walls) {
        if (detectCollision(character, wall)) {
            // Revert to original position if collision occurs
            character.x = originalX;
            character.y = originalY;
            break;
        }
    }
}

// Load background image
const backgroundImage = new Image();
backgroundImage.src = "{{site.baseurl}}/images/rpg/puzzlemaker-removebg-preview.png";

// Draw character, walls, and background (call this in your game loop)
function draw() {
    const ctx = document.getElementById('gameCanvas').getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background image when it's loaded
    if (backgroundImage.complete) {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    }

    // Draw walls
    ctx.fillStyle = 'black';
    for (let wall of walls) {
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    }

    // Draw character
    ctx.drawImage(
        sprite_img, // Your sprite image
        sprite_data.down.start * sprite_data.pixels.width,  // Adjust for correct sprite frame
        sprite_data.down.row * sprite_data.pixels.height, 
        sprite_data.pixels.width, sprite_data.pixels.height,
        character.x, character.y,
        character.width, character.height
    );

    // Repeat draw function for next frame
    requestAnimationFrame(draw);
}

// Call updateCharacter when key is pressed
window.addEventListener('keydown', function (event) {
    if (event.key === "ArrowUp") updateCharacter("up");
    if (event.key === "ArrowDown") updateCharacter("down");
    if (event.key === "ArrowLeft") updateCharacter("left");
    if (event.key === "ArrowRight") updateCharacter("right");
});

// Start drawing
draw();

</script>
