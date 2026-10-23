class Character extends MovableObject {

    ImagesIdle = [
        'img/1.Sharkie/1.IDLE/1.png',
        'img/1.Sharkie/1.IDLE/2.png',
        'img/1.Sharkie/1.IDLE/3.png',
        'img/1.Sharkie/1.IDLE/4.png',
        'img/1.Sharkie/1.IDLE/5.png',
        'img/1.Sharkie/1.IDLE/6.png',
        'img/1.Sharkie/1.IDLE/7.png',
        'img/1.Sharkie/1.IDLE/8.png',
        'img/1.Sharkie/1.IDLE/8.png',
        'img/1.Sharkie/1.IDLE/9.png',
        'img/1.Sharkie/1.IDLE/10.png',
        'img/1.Sharkie/1.IDLE/11.png',
        'img/1.Sharkie/1.IDLE/12.png',
        'img/1.Sharkie/1.IDLE/13.png',
        'img/1.Sharkie/1.IDLE/14.png',
        'img/1.Sharkie/1.IDLE/15.png',
        'img/1.Sharkie/1.IDLE/16.png',
        'img/1.Sharkie/1.IDLE/17.png',
        'img/1.Sharkie/1.IDLE/18.png'
        ];

    longIdleImages = [
        'img/1.Sharkie/2.Long_IDLE/i1.png',
        'img/1.Sharkie/2.Long_IDLE/i2.png',
        'img/1.Sharkie/2.Long_IDLE/i3.png',
        'img/1.Sharkie/2.Long_IDLE/i4.png',
        'img/1.Sharkie/2.Long_IDLE/i5.png',
        'img/1.Sharkie/2.Long_IDLE/i6.png',
        'img/1.Sharkie/2.Long_IDLE/i7.png',
        'img/1.Sharkie/2.Long_IDLE/i8.png',
        'img/1.Sharkie/2.Long_IDLE/i9.png',
        'img/1.Sharkie/2.Long_IDLE/i10.png',
        'img/1.Sharkie/2.Long_IDLE/i11.png',
        'img/1.Sharkie/2.Long_IDLE/i12.png',
        'img/1.Sharkie/2.Long_IDLE/i14.png',
    ];

    swimImages = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ];




   constructor() {
    super().loadImage('img/1.Sharkie/1.IDLE/1.png');
    this.loadImages(this.ImagesIdle);
    this.loadImages(this.swimImages);
    this.loadImages(this.longIdleImages);
    this.lastInput = Date.now();
    this.currentState = '';
    this.frameDurations = { swim: 80, idle: 150, longIdle: 200 }; // Millisekunden pro Bild
    this.lastFrameTime = 0;
    this.x = 100;
    this.y = 300;
    this.height = 200;
    this.width = 200;
    this.zindex = 1;

        setInterval(() => {
            let k = this.world.keyboard;
            let moving = k.LEFT || k.RIGHT || k.UP || k.DOWN;

            if (moving || k.SPACE) {
                this.lastInput = Date.now();
            }

            let state;
            if (moving) {
                state = 'swim';
            } else if (Date.now() - this.lastInput > 5000) {
                state = 'longIdle';
            } else {
                state = 'idle';
            }

            if (state !== this.currentState) {
                this.currentState = state;
                this.currentImage = 0;
            }

            let now = Date.now();
            if (now - this.lastFrameTime >= this.frameDurations[state]) {
                this.lastFrameTime = now;
                if (state === 'swim') this.playAnimation(this.swimImages);
                if (state === 'idle') this.playAnimation(this.ImagesIdle);
                if (state === 'longIdle') this.playAnimationTailLoop(this.longIdleImages, 3);
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }
}