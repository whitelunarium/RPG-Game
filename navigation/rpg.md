---
layout: base
title: RPG
permalink: /rpg/
---

<canvas id='gameCanvas'></canvas>

<script type="module">
    import GameControl from '{{site.baseurl}}/assets/js/rpg/GameControl.js';

    function resizeCanvas() {
        const canvas = document.getElementById('gameCanvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    document.addEventListener('fullscreenchange', resizeCanvas);
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Background data for the first image
    const image_src = "{{site.baseurl}}/images/rpg/41524.jpg";
    const image_data = {
        pixels: {height: 580, width: 1038}
    };
    const image = {src: image_src, data: image_data};

    // Background data for the second image
    const image_src2 = "{{site.baseurl}}/images/rpg/Maze_Background.png"; // Replace with your second image path
    const image_data2 = {
        pixels: {height: 580, width: 1038}
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

    const sprite_src2 = "{{site.baseurl}}/images/rpg/fishies.png";
    const sprite_data2 = {
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
    const sprite2 = {src: sprite_src2, data: sprite_data2};

    // Assets for game, including both background images
    const assets = {
        image: [image, image2], // Ensure this is correctly structured
        sprite: sprite, // Single sprite object for player
        sprite2: sprite2 // Separate sprite object for fish
    };

// Initialize game control
const gameControl = new GameControl(assets);

    // Start game engine
    GameControl.start(assets);

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

    const canvas = document.getElementById('gameCanvas');
    canvas.addEventListener('click', toggleFullScreen); // Click to enter full-screen
</script>

