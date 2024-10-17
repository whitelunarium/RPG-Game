import Player from './Player.js';
import Fish from './Fish.js';
import GameEnv from './GameEnv.js';

class GameControl {
    constructor(assets) {
        this.player = new Player(assets.sprite);
        this.fish = new Fish(assets.sprite2); // Updated to pass the fish sprite
        this.assets = assets;
        this.init();
    }

    init() {
        this.resize();
        this.bindEventListeners();
    }

    resize() {
        this.player.resize();
        this.fish.resize();
    }

    bindEventListeners() {
        window.addEventListener('resize', this.resize.bind(this));
    }

    update() {
        this.player.update();
        this.fish.update();
    }
}

export default GameControl;
