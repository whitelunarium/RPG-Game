class GameEnv {
    static canvas;
    static ctx;
    static innerWidth;
    static innerHeight;
    static top;
    static bottom;

    constructor() {
        throw new Error('GameEnv is a static class and cannot be instantiated.');
    }

    static create() {
        this.setCanvas();
        this.setTop();
        this.setBottom();
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight - this.top - this.bottom;
        this.size();
        this.observeDOMChanges();
    }

    static setCanvas() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
    }

    static setTop() {
        const header = document.querySelector('header');
        this.top = header ? header.offsetHeight : 0;
    }

    static setBottom() {
        const footer = document.querySelector('footer');
        this.bottom = footer ? footer.offsetHeight : 0;
    }

    static size() {
        this.canvas.width = this.innerWidth;
        this.canvas.height = this.innerHeight;
        this.canvas.style.width = `${this.innerWidth}px`;
        this.canvas.style.height = `${this.innerHeight}px`;
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = '0px';
        this.canvas.style.top = `${this.top}px`;
    }

    static resize() {
        this.create();
    }

    static clear() {
        this.ctx.clearRect(0, 0, this.innerWidth, this.innerHeight);
    }

    static observeDOMChanges() {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    console.log('DOM changed:', mutation); // Log or handle specific changes
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    // Optional: Method to disconnect observer when no longer needed
    static disconnectObserver(observer) {
        if (observer) {
            observer.disconnect();
        }
    }
}

export default GameEnv;
