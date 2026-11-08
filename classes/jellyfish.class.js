class Jellyfish extends DrawableObject {

    colorVariants ={
        yellow: {
            idleImages: [
                'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
                'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
                'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
                'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png'
            ],
            alertImages: [
                'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png',
                'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png',
                'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png',
                'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png'
            ]
        },     
        lila: {
            idleImages: [
                'img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
                'img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
                'img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
                'img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png'
            ],    
            alertImages: [
                'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png',
                'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png',
                'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png',
                'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png'
            ]
        }   
    }

    offset = { top: 0, bottom: 0, left: 0, right: 0 };
    nearby = false;
    alertRange = 400;

    constructor(x, y, color) {
        super();
        if (!color) {
        let colors = Object.keys(this.colorVariants);   // ['yellow', 'lila']
        color = colors[Math.floor(Math.random() * colors.length)];
        }
        let set = this.colorVariants[color];
        this.idleImages = set.idleImages;
        this.alertImages = set.alertImages;

        this.loadImage(this.idleImages[0]);
        this.loadImages(this.idleImages);
        this.loadImages(this.alertImages);
        this.x = x;
        this.y = y;
        this.width = 150;
        this.height = 150;
        this.currentState = '';

        this.animationInterval = setInterval(() => {
            let state = this.nearby ? 'alert' : 'idle';
            if (state !== this.currentState) {
                this.currentState = state;
                this.currentImage = 0;
            }
            if (state === 'alert') this.playAnimation(this.alertImages);
            if (state === 'idle') this.playAnimation(this.idleImages);
        }, 1000 / 8);
    }

    stop() {
        clearInterval(this.animationInterval);
    }
}