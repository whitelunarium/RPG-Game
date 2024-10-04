---
layout: base
title: RPG
permalink: /rpg/
---

<canvas id='gameCanvas'></canvas>

<script type="module">
    import GameControl from '{{site.baseurl}}/assets/js/rpg/GameControl.js';

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
        orientation: {rows: 4, columns: 3 },
        down: {row: 0, start: 0, columns: 3 },
        left: {row: 1, start: 0, columns: 3 },
        right: {row: 2, start: 0, columns: 3 },
        up: {row: 3, start: 0, columns: 3 },
    };
    const sprite = {src: sprite_src, data: sprite_data};

    // Assets for game
    //const assets = {}
    //const assets = {image: image}
    //const assets = {sprite: sprite}
    const assets = {image: image, sprite: sprite}

    // Start game engine
    GameControl.start(assets);

// Function to toggle fullscreen mode
function toggleFullScreen() {
    const canvas = document.getElementById("snake"); // Target the canvas for fullscreen
    if (!document.fullscreenElement) {
        canvas.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable fullscreen mode: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

// Example: Trigger fullscreen mode on pressing the 'F' key
document.addEventListener('keydown', function(event) {
    if (event.key === "f" || event.key === "F") {
        toggleFullScreen();
    }
});

// Optional: Button to toggle fullscreen mode
const fullscreenButton = document.getElementById('fullscreen-btn');
if (fullscreenButton) {
    fullscreenButton.addEventListener('click', toggleFullScreen);
}
    
</script>
