class Enemy extends MovableObject {


        colorVariants = {
            green: {
                swimImages: [
                    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
                    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
                    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
                    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
                    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
                ],
                alertImages: [
                    'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png',
                    'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png',
                    'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png',
                    'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png',
                    'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png'
                ],
                transitionImages: [
                    'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png',
                    'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png',
                    'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png',
                    'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png',
                    'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png'
                ]
            },
            orange: {
                swimImages: [
                'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png',
                'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png',
                'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png',
                'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png',
                'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png'
                ],
                alertImages: [
                'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim1.png',
                'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim2.png',
                'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim3.png',
                'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim4.png',
                'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim5.png'
                ],
                transitionImages: [
                'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png',
                'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png',
                'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png',
                'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png',
                'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png'
                ]
            },
            red: {
                swimImages: [
                'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png',
                'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png',
                'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png',
                'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png',
                'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png'
                ],
                alertImages: [
                'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim1.png',
                'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim2.png',
                'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim3.png',
                'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim4.png',
                'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim5.png'
                ],
                transitionImages: [
                'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition1.png',
                'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition2.png',
                'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition3.png',
                'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition4.png',
                'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition5.png'
                ]
            }
        }


    nearby = false;
    alertRange = 300;
    alertDuration = 2000;
    coolDownDuration = 3000;
    alertStartTime = 0;
    coolDownUntil = 0;
    offset = { top: 10, bottom: 40, left: 5, right: 10 };

   constructor(x = 1750, color) {
        super();
        if (!color) {
            let colors = Object.keys(this.colorVariants);
            color = colors[Math.floor(Math.random() * colors.length)];
        }
        let set = this.colorVariants[color];
        this.swimImages = set.swimImages;
        this.transitionImages = set.transitionImages;
        this.alertImages = set.alertImages;

        this.loadImage(this.swimImages[0]);
        this.loadImages(this.swimImages);
        this.loadImages(this.transitionImages);
        this.loadImages(this.alertImages);
        this.transitionImagesReversed = [...this.transitionImages].reverse();

        this.x = x;
        this.y = Math.random() * 850 + 50;
        this.height = 150;
        this.width = 150;
        this.speed = 1 + Math.random() * 3;
        this.currentState = 'swim';

        this.moveInterval = setInterval(() => {
            this.moveleft();
        }, 1000 / 60);

        this.animationInterval = setInterval(() => {
        let now = Date.now();
        let state = this.currentState;

        if (state === 'swim') {
            if (this.nearby && now >= this.coolDownUntil) state = 'transition';
        } else if (state === 'transition') {
            if (this.currentImage >= this.transitionImages.length) state = 'alert';
        } else if (state === 'alert') {
            if (now - this.alertStartTime >= this.alertDuration) state = 'calming';
        } else if (state === 'calming') {
            if (this.currentImage >= this.transitionImages.length) {
                state = 'swim';
                this.coolDownUntil = now + this.coolDownDuration;
            }
        }

        if (state !== this.currentState) {
            this.currentState = state;
            this.currentImage = 0;
            if (state === 'alert') this.alertStartTime = now;
        }

        if (state === 'swim') this.playAnimation(this.swimImages);
        if (state === 'transition') this.playAnimationEndStop(this.transitionImages);
        if (state === 'alert') this.playAnimation(this.alertImages);
        if (state === 'calming') this.playAnimationEndStop(this.transitionImagesReversed);
    }, 1000 / 10);
}

    stop() {
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
    }
}