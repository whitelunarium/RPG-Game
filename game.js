// Set up the canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Load the maze and player sprite
const mazeImage = new Image();
mazeImage.src = './RPG.md/maze.png';  // Use your actual path
const playerSprite = new Image();
playerSprite.src = 'puzzlemaker-removebg-preview.png'; // Replace with actual sprite path

// Player's starting position
let player = {
    x: 50, // starting x-coordinate
    y: 50, // starting y-coordinate
    width: 40,  // player's width
    height: 40, // player's height
    speed: 5
};

// Goal (end point)
const goal = {
    x: 700,  // x-coordinate of the goal
    y: 500,  // y-coordinate of the goal
    width: 40,
    height: 40
};

// Event listener for player movement
let keys = {};
window.addEventListener("keydown", (e) => keys[e.key] = true);
window.addEventListener("keyup", (e) => keys[e.key] = false);

// Function to detect collision between player and maze walls
function detectCollision(newX, newY) {
    // Get pixel data where the player intends to move
    let mazeData = ctx.getImageData(newX, newY, player.width, player.height).data;
    for (let i = 0; i < mazeData.length; i += 4) {
        // Check if the pixel color is black (RGB 0, 0, 0 for walls)
        if (mazeData[i] === 0 && mazeData[i + 1] === 0 && mazeData[i + 2] === 0) {
            return true;  // Collision detected
        }
    }
    return false;  // No collision
}

// Function to check if player reached the goal
function checkGoal() {
    if (
        player.x < goal.x + goal.width &&
        player.x + player.width > goal.x &&
        player.y < goal.y + goal.height &&
        player.y + player.height > goal.y
    ) {
        alert("You reached the goal! Congratulations!");
        // Optionally: Stop the game or reset position
    }
}

// Function to move the player
function movePlayer() {
    let newX = player.x;
    let newY = player.y;

    if (keys["ArrowUp"]) newY -= player.speed;
    if (keys["ArrowDown"]) newY += player.speed;
    if (keys["ArrowLeft"]) newX -= player.speed;
    if (keys["ArrowRight"]) newX += player.speed;

    // Check for collisions before updating position
    if (!detectCollision(newX, newY)) {
        player.x = newX;
        player.y = newY;
    }
}

// Function to draw the player and the goal
function drawPlayer() {
    ctx.drawImage(playerSprite, player.x, player.y, player.width, player.height);
}

function drawGoal() {
    ctx.fillStyle = "green";
    ctx.fillRect(goal.x, goal.y, goal.width, goal.height);
}

// Main game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.drawImage(mazeImage, 0, 0);  // Draw the maze
    drawGoal();  // Draw the goal
    movePlayer();  // Update player position
    drawPlayer();  // Draw the player
    checkGoal();  // Check if the player has reached the goal
    requestAnimationFrame(gameLoop); // Continue the loop
}

// Start the game once maze and player images are loaded
mazeImage.onload = () => {
    playerSprite.onload = () => {
        gameLoop();  // Start the main loop
    };
};
