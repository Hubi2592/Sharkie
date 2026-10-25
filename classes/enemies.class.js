class Enemy extends MovableObject {

    swimImages = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
    ];

    constructor(x = 1750) {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.swimImages);
        this.x = x;
        this.y = Math.random() * 850 + 50; // Random y position between 50 and 900
        this.height = 150;
        this.width = 150;
        this.speed = 1 + Math.random() * 3; // Random speed between 1 and 4

        this.moveInterval = setInterval(() => {      // NEU: ID gespeichert
            this.moveleft();
        }, 1000 / 60);

        this.animationInterval = setInterval(() => { // NEU: ID gespeichert
            this.playAnimation(this.swimImages);
        }, 1000 / 10);
    }

    // NEU: stoppt beide Intervalle
    stop() {
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
    }
}