---
layout: base
title: RPG
permalink: /rpg/
---

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

    // Background data
    const image_src = "{{site.baseurl}}/images/rpg/41524.jpg";
    const image_data = {
        pixels: {height: 580, width: 1038}
    };
    const image = {src: image_src, data: image_data};

    // Bunny sprite data
    const bunny_sprite_src = "{{site.baseurl}}/images/rpg/Bunny-Sprite.png";
    const bunny_sprite_data = {
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
    const bunny_sprite = {src: bunny_sprite_src, data: bunny_sprite_data};

    // Fish sprite data
    const fish_sprite_src = "{{site.baseurl}}/assets/images/rpg/fishies.png"; // Update with correct path
    const fish_sprite_data = {
        SCALE_FACTOR: 8,
        STEP_FACTOR: 800,
        ANIMATION_RATE: 60,
        pixels: {height: 100, width: 100},
        orientation: {rows: 2, columns: 4},
        swim: {row: 0, start: 0, columns: 4},
    };
    const fish_sprite = {src: fish_sprite_src, data: fish_sprite_data};

    // Assets for game
    const assets = {
        image: image,
        bunnySprite: bunny_sprite,
        fishSprite: fish_sprite
    };

    // Start game engine
    GameControl.start(assets);

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

    // Optionally add a button to toggle full-screen mode
    const canvas = document.getElementById('gameCanvas');
    canvas.addEventListener('click', toggleFullScreen); // Click to enter full-screen

</script>
