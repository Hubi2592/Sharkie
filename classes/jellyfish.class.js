class Jellyfish extends MovableObject {    // NEU: war DrawableObject

    colorVariants = {
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
            ],
            deathImages: [
                'img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png',
                'img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png',
                'img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png',
                'img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png'
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
            ],
            deathImages: [
                'img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
                'img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
                'img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
                'img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png'
            ]
        }
    };

    offset = { top: 0, bottom: 0, left: 0, right: 0 };
    nearby = false;
    alertRange = 400;

    constructor(x, y, color) {
        super();
        if (!color) {
            let colors = Object.keys(this.colorVariants);
            color = colors[Math.floor(Math.random() * colors.length)];
        }
        let set = this.colorVariants[color];
        this.idleImages = set.idleImages;
        this.alertImages = set.alertImages;
        this.deathImages = set.deathImages;
        this.loadImage(this.idleImages[0]);
        this.loadImages(this.idleImages);
        this.loadImages(this.alertImages);
        this.loadImages(this.deathImages);
        this.deathAnimationDone = false;
        this.x = x;
        this.y = y;
        this.width = 150;
        this.height = 150;
        this.currentState = '';
        this.health = 50;       // 2 Blasen à 25 Schaden
        this.floatSpeed = 4;

        this.animationInterval = setInterval(() => {
            if (this.isDead()) {
                if (this.currentState !== 'dead') {
                    this.currentState = 'dead';
                    this.currentImage = 0;
                }
                this.playAnimation(this.deathImages);
                if (this.currentImage >= this.deathImages.length) this.deathAnimationDone = true;
                return;
            }

            let state = this.nearby ? 'alert' : 'idle';
            if (state !== this.currentState) {
                this.currentState = state;
                this.currentImage = 0;
            }
            if (state === 'alert') this.playAnimation(this.alertImages);
            if (state === 'idle') this.playAnimation(this.idleImages);
        }, 1000 / 8);

        this.moveInterval = setInterval(() => {            // NEU
            this.applyKnockback();
            if (this.deathAnimationDone && this.knockbackX === 0 && this.knockbackY === 0) {
                this.y -= this.floatSpeed;
            }
        }, 1000 / 60);
    }

    takeDamage(amount, direction) {                          // NEU
        if (this.isDead()) return;
        this.health -= amount;
        if (this.isDead()) {
            this.knockbackX = direction * 12;
        }
    }

    stop() {
        clearInterval(this.animationInterval);
        clearInterval(this.moveInterval);                    // NEU
    }
}