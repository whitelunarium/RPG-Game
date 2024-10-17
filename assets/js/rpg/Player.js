import GameEnv from './GameEnv.js';

const SCALE_FACTOR = 25; // 1/nth of the height of the canvas
const STEP_FACTOR = 100; // 1/nth, or N steps up and across the canvas
const ANIMATION_RATE = 1; // 1/nth of the frame rate

class Player {
    constructor(sprite = null) {
        this.scale = { width: GameEnv.innerWidth, height: GameEnv.innerHeight };

        if (sprite) {
            this.scaleFactor = sprite.data.SCALE_FACTOR || SCALE_FACTOR;
            this.stepFactor = sprite.data.STEP_FACTOR || STEP_FACTOR;
            this.animationRate = sprite.data.ANIMATION_RATE || ANIMATION_RATE;

            this.spriteSheet = new Image();
            this.spriteSheet.src = sprite.src;

            this.frameIndex = 0;
            this.frameCounter = 0;
            this.direction = 'down';
            this.spriteData = sprite.data;
        } else {
            this.scaleFactor = SCALE_FACTOR;
            this.stepFactor = STEP_FACTOR;
            this.animationRate = ANIMATION_RATE;
            this.spriteSheet = null;
        }

        this.size = GameEnv.innerHeight / this.scaleFactor;
        this.position = { x: 0, y: GameEnv.innerHeight - this.size };
        this.velocity = { x: 0, y: 0 };

        this.resize();
        this.bindEventListeners();
    }

    resize() {
        const newScale = { width: GameEnv.innerWidth, height: GameEnv.innerHeight };
        this.position.x = (this.position.x / this.scale.width) * newScale.width;
        this.position.y = (this.position.y / this.scale.height) * newScale.height;
        this.scale = newScale;
        this.size = this.scale.height / this.scaleFactor;
        this.xVelocity = this.scale.width / this.stepFactor;
        this.yVelocity = this.scale.height / this.stepFactor;
        this.width = this.size;
        this.height = this.size;
    }

    draw() {
        if (this.spriteSheet) {
            const frameWidth = this.spriteData.pixels.width / this.spriteData.orientation.columns;
            const frameHeight = this.spriteData.pixels.height / this.spriteData.orientation.rows;
            const directionData = this.spriteData[this.direction];

            let frameX = (directionData.start + this.frameIndex) * frameWidth;
            let frameY = directionData.row * frameHeight;

            GameEnv.ctx.drawImage(
                this.spriteSheet,
                frameX, frameY, frameWidth, frameHeight,
                this.position.x, this.position.y, this.width, this.height
            );

        } else {
            GameEnv.ctx.fillStyle = 'red';
            GameEnv.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height > GameEnv.innerHeight) {
            this.position.y = GameEnv.innerHeight - this.height;
            this.velocity.y = 0;
        }
        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity.y = 0;
        }
        if (this.position.x + this.width > GameEnv.innerWidth) {
            this.position.x = GameEnv.innerWidth - this.width;
            this.velocity.x = 0;
        }
        if (this.position.x < 0) {
            this.position.x = 0;
            this.velocity.x = 0;
        }
    }

    bindEventListeners() {
        addEventListener('keydown', this.handleKeyDown.bind(this));
        addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    handleKeyDown({ keyCode }) {
        switch (keyCode) {
            case 87: // 'W' key
                this.velocity.y -= this.yVelocity;
                this.direction = 'up';
                break;
            case 65: // 'A' key
                this.velocity.x -= this.xVelocity;
                this.direction = 'left';
                break;
            case 83: // 'S' key
                this.velocity.y += this.yVelocity;
                this.direction = 'down';
                break;
            case 68: // 'D' key
                this.velocity.x += this.xVelocity;
                this.direction = 'right';
                break;
        }
    }

    handleKeyUp({ keyCode }) {
        switch (keyCode) {
            case 87: // 'W' key
                this.velocity.y = 0;
                break;
            case 65: // 'A' key
                this.velocity.x = 0;
                break;
            case 83: // 'S' key
                this.velocity.y = 0;
                break;
            case 68: // 'D' key
                this.velocity.x = 0;
                break;
        }
    }
}

export default Player;

// Set up the canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Update these paths based on your directory structure
const mazeImage = new Image();
mazeImage.src = './assets/images/maze.png';  // Correct path
const playerSprite = new Image();
playerSprite.src = './assets/images/player.png'; // Correct path


let player = {
    x: 50,
    y: 50,
    width: 40,
    height: 40,
    speed: 5
};

const goal = {
    x: 700,
    y: 500,
    width: 40,
    height: 40
};

let keys = {};
window.addEventListener("keydown", (e) => keys[e.key] = true);
window.addEventListener("keyup", (e) => keys[e.key] = false);

function detectCollision(newX, newY) {
    let mazeData = ctx.getImageData(newX, newY, player.width, player.height).data;
    for (let i = 0; i < mazeData.length; i += 4) {
        if (mazeData[i] === 0 && mazeData[i + 1] === 0 && mazeData[i + 2] === 0) {
            return true;  // Collision detected
        }
    }
    return false;  // No collision
}

function checkGoal() {
    if (
        player.x < goal.x + goal.width &&
        player.x + player.width > goal.x &&
        player.y < goal.y + goal.height &&
        player.y + player.height > goal.y
    ) {
        alert("You reached the goal! Congratulations!");
    }
}

function movePlayer() {
    let newX = player.x;
    let newY = player.y;

    if (keys["ArrowUp"]) newY -= player.speed;
    if (keys["ArrowDown"]) newY += player.speed;
    if (keys["ArrowLeft"]) newX -= player.speed;
    if (keys["ArrowRight"]) newX += player.speed;

    if (!detectCollision(newX, newY)) {
        player.x = newX;
        player.y = newY;
    }
}

function drawPlayer() {
    ctx.drawImage(playerSprite, player.x, player.y, player.width, player.height);
}

function drawGoal() {
    ctx.fillStyle = "green";
    ctx.fillRect(goal.x, goal.y, goal.width, goal.height);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(mazeImage, 0, 0);
    drawGoal();
    movePlayer();
    drawPlayer();
    checkGoal();
    requestAnimationFrame(gameLoop);
}

mazeImage.onload = () => {
    playerSprite.onload = () => {
        gameLoop();
    };
};
