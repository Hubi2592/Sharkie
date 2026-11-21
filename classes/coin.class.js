class Coin extends Collectible {

    ImagesCoin = [
    "img/4. Marcadores/1. Coins/1.png",
    "img/4. Marcadores/1. Coins/2.png",
    "img/4. Marcadores/1. Coins/3.png",
    "img/4. Marcadores/1. Coins/4.png",
    ];
    constructor(x, y) {
        super(x, y);
        this.loadImages(this.ImagesCoin);
        this.loadImage(this.ImagesCoin[0]);
        this.width = 50;    // Platzhalter
        this.height = 50;   // Platzhalter

        this.animationInterval = setInterval(() => {
            this.playAnimation(this.ImagesCoin);
        }, 1000 / 5);
    }

    stop() {
        clearInterval(this.animationInterval);
    }
}
