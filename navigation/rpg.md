---
layout: base
title: RPG
permalink: /rpg/
---

<canvas id='gameCanvas'></canvas>

<script type="module">
    import GameControl from '{{site.baseurl}}/assets/js/rpg/GameControl.js';

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

    // Background data for the first image
    const image_src = "{{site.baseurl}}/images/rpg/41524.jpg";
    const image_data = {
        pixels: {height: 580, width: 1038}
    };
    const image = {src: image_src, data: image_data};

    // Background data for the second image (stationary sprite)
    const image_src2 = "{{site.baseurl}}/images/rpg/SimpleMaze.png"; // Replace with your second image path
    const image_data2 = {
        pixels: {height: 580, width: 1038} // Adjust dimensions as needed
    };
    const image2 = {src: image_src2, data: image_data2};

    const sprite_src = "{{site.baseurl}}/images/rpg/Bunny-Sprite.png";
    const sprite_data = {
        SCALE_FACTOR: 10,
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 50,
        pixels: {height: 159, width: 119},
        orientation: {rows: 4, columns: 3},
        down: {row: 0, start: 0, columns: 3},
        left: {row: 2, start: 0, columns: 3},
        right: {row: 3, start: 0, columns: 3},
        up: {row: 1, start: 0, columns: 3},
    };
    const sprite = {src: sprite_src, data: sprite_data};

    // Assets for game
    const assets = {image: [image], sprite: sprite}; // Only use the first image as a scrolling background

    // Start game engine
    GameControl.start(assets);

    // Function to draw the stationary background sprite
    function drawStationaryBackground(ctx) {
        const img = new Image();
        img.src = image2.src;
        img.onload = () => {
            ctx.drawImage(img, 0, 0, img.width, img.height); // Draw at (0,0) or any fixed position
        };
    }

    // Example game loop
    function gameLoop() {
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw scrolling background (first image)
        const backgroundImage = new Image();
        backgroundImage.src = image.src;
        backgroundImage.onload = () => {
            ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        };

        // Draw stationary background (second image)
        drawStationaryBackground(ctx);

        // Call game loop recursively
        requestAnimationFrame(gameLoop);
    }

    // Start the game loop
    gameLoop();

    // Fullscreen toggle function
    function toggleFullScreen() {
        const canvas = document.getElementById('gameCanvas');
        if (!document.fullscreenElement) {
            if (canvas.requestFullscreen) {
                canvas.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    // Add a button to toggle full-screen mode
    const canvas = document.getElementById('gameCanvas');
    canvas.addEventListener('click', toggleFullScreen);
</script>
