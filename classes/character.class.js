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

    attackImages = [
        'img/1.Sharkie/4.Attack/Fin slap/1.png',
        'img/1.Sharkie/4.Attack/Fin slap/2.png',
        'img/1.Sharkie/4.Attack/Fin slap/3.png',
        'img/1.Sharkie/4.Attack/Fin slap/4.png',
        'img/1.Sharkie/4.Attack/Fin slap/5.png',
        'img/1.Sharkie/4.Attack/Fin slap/6.png',
        'img/1.Sharkie/4.Attack/Fin slap/7.png',
        'img/1.Sharkie/4.Attack/Fin slap/8.png'
    ];

    bubbleAttackImages = [
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png'
    ];

    hurtImages = [
        'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png'
    ]

    deathImages = [
        'img/1.Sharkie/6.dead/1.Poisoned/1.png',
        'img/1.Sharkie/6.dead/1.Poisoned/2.png',
        'img/1.Sharkie/6.dead/1.Poisoned/3.png',
        'img/1.Sharkie/6.dead/1.Poisoned/4.png',
        'img/1.Sharkie/6.dead/1.Poisoned/5.png',
        'img/1.Sharkie/6.dead/1.Poisoned/6.png',
        'img/1.Sharkie/6.dead/1.Poisoned/7.png',
        'img/1.Sharkie/6.dead/1.Poisoned/8.png',
        'img/1.Sharkie/6.dead/1.Poisoned/9.png',
        'img/1.Sharkie/6.dead/1.Poisoned/10.png',
        'img/1.Sharkie/6.dead/1.Poisoned/11.png',
        'img/1.Sharkie/6.dead/1.Poisoned/12.png'
    ];

    offset = { top: 90, bottom: 45, left: 40, right: 40 };


   constructor() {
    super().loadImage('img/1.Sharkie/1.IDLE/1.png');
    this.loadImages(this.ImagesIdle);
    this.loadImages(this.swimImages);
    this.loadImages(this.longIdleImages);
    this.loadImages(this.attackImages);
    this.loadImages(this.hurtImages);
    this.loadImages(this.deathImages);
    this.loadImages(this.bubbleAttackImages);
    this.lastInput = Date.now();
    this.currentState = '';
    this.attacking = false;
    this.shooting = false;
    this.shotReady = false;
    this.lastShotTime = 0;
    this.shotCooldown = 600;
    this.lastAttackTime = 0;
    this.attackCooldown = 800;
    this.frameDurations = { swim: 80, idle: 150, longIdle: 200, attack: 30, hurt:120, dead:120, shoot: 60 }; // Millisekunden pro Bild
    this.lastFrameTime = 0;
    this.x = 100;
    this.y = 300;
    this.height = 200;
    this.width = 200;
    this.zindex = 1;
    this.applyGravity();


        setInterval(() => {
            this.applyKnockback();
            let k = this.world.keyboard;
            let moving = k.LEFT || k.RIGHT || k.UP || k.DOWN;

            if (moving || k.SPACE) {
                this.lastInput = Date.now();
            }

            if (k.SPACE && !this.attacking && !this.shooting && !this.isDead() && Date.now() - this.lastAttackTime >= this.attackCooldown) {
            this.attacking = true;
            this.currentImage = 0;
        }

            if (k.D && !this.shooting && !this.attacking && !this.isDead() && Date.now() - this.lastShotTime >= this.shotCooldown) {
                this.shooting = true;
                this.currentImage = 0;
            }

            let state;
            if (this.isDead()) {
                state = 'dead';
            } else if (this.isHurt()) {
                state = 'hurt';
                this.attacking = false;   // NEU (Fehler von oben)
                this.shooting = false;    // NEU
            } else if (this.attacking) {
                state = 'attack';
            } else if (this.shooting) {   // NEU
                state = 'shoot';
            } else if (moving) {
                state = 'swim';
            } else if (Date.now() - this.lastInput > 10000) {
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
                if (state === 'hurt') this.playAnimationEndStop(this.hurtImages);
                if (state === 'dead') this.playAnimationEndStop(this.deathImages);
                if (state === 'swim') this.playAnimation(this.swimImages);
                if (state === 'idle') this.playAnimation(this.ImagesIdle);
                if (state === 'longIdle') this.playAnimationTailLoop(this.longIdleImages, 3);
                if (state === 'attack'){
                    this.playAnimationEndStop(this.attackImages);
                    if (this.currentImage >= this.attackImages.length) {
                    this.attacking = false;
                    this.lastAttackTime = Date.now();
                    }
                }
                if (state === 'shoot') {
                    this.playAnimationEndStop(this.bubbleAttackImages);
                    if (this.currentImage >= this.bubbleAttackImages.length) {
                        this.shooting = false;
                        this.lastShotTime = Date.now();
                        this.shotReady = true;
                    }
                }
            }
        }, 1000 / 60);
    }
}