class Endboss extends MovableObject {

    introductionImages = [
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/10.png',
    ];

    floatImages = [
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/2.Enemy/3 Final Enemy/2.floating/13.png',
    ];

    attackImages = [
        'img/2.Enemy/3 Final Enemy/Attack/1.png',
        'img/2.Enemy/3 Final Enemy/Attack/2.png',
        'img/2.Enemy/3 Final Enemy/Attack/3.png',
        'img/2.Enemy/3 Final Enemy/Attack/4.png',
        'img/2.Enemy/3 Final Enemy/Attack/5.png',
        'img/2.Enemy/3 Final Enemy/Attack/6.png'
    ];

    hurtImages = [
        'img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/2.Enemy/3 Final Enemy/Hurt/4.png'
    ];

    deathImages = [
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png'
    ];

        offset = { top: 180, bottom: 60, left: 25, right: 35 };
    chaseSpeed = 5;          // Pixel pro Bild, Schätzwert
    attackRange = 250;       // Abstand, ab dem er angreift
    attackCooldown = 2000;   // Pause nach einem Angriff in Millisekunden
    hitReach = 100;          // wie weit um seine Hitbox der Treffer reicht

    constructor(x = 1500) {
        super();
        this.loadImage(this.introductionImages[0]);
        this.loadImages(this.introductionImages);
        this.loadImages(this.floatImages);
        this.loadImages(this.attackImages);
        this.loadImages(this.hurtImages);
        this.loadImages(this.deathImages);

        this.x = x;
        this.y = 10;
        this.width = 400;
        this.height = 400;
        this.health = 100;
        this.state = 'introduction';
        this.target = null;
        this.velocityX = 0;
        this.velocityY = 0;
        this.attackCooldownUntil = 0;
        this.attackHitReady = false;
        this.deathAnimationDone = false;

        this.animationInterval = setInterval(() => {
            let now = Date.now();
            let state = this.state;

            if (this.isDead()) {
                state = 'dead';
            } else if (state === 'introduction') {
                if (this.currentImage >= this.introductionImages.length) state = 'floating';
            } else if (this.isHurt()) {
                state = 'hurt';
            } else if (state === 'hurt') {
                state = 'floating';
            } else if (state === 'attack') {
                if (this.currentImage >= this.attackImages.length) {
                    state = 'floating';
                    this.attackCooldownUntil = now + this.attackCooldown;
                }
            } else if (state === 'floating') {
                if (this.target && !this.target.isDead() &&
                    this.distanceTo(this.target) < this.attackRange &&
                    now >= this.attackCooldownUntil) {
                    state = 'attack';
                }
            }

            if (state !== this.state) {
                this.state = state;
                this.currentImage = 0;
            }

            if (state === 'introduction') this.playAnimationEndStop(this.introductionImages);
            if (state === 'floating') this.playAnimation(this.floatImages);
            if (state === 'hurt') this.playAnimationEndStop(this.hurtImages);
            if (state === 'attack') {
                this.playAnimationEndStop(this.attackImages);
                if (this.currentImage === 5) this.attackHitReady = true;   // Bild 5 von 6
            }
            if (state === 'dead') {
                this.playAnimationEndStop(this.deathImages);
                if (this.currentImage >= this.deathImages.length) this.deathAnimationDone = true;
            }
        }, 1000 / 10);

        this.moveInterval = setInterval(() => {
            if (this.target && !this.target.isDead() && (this.state === 'floating' || this.state === 'attack')) {
                this.chase();
            } else {
                this.velocityX *= 0.9;
                this.velocityY *= 0.9;
            }
            this.x += this.velocityX;
            this.y += this.velocityY;
        }, 1000 / 60);
    }

    chase() {
        let a = this.getHitbox();
        let b = this.target.getHitbox();
        let dx = (b.x + b.width / 2) - (a.x + a.width / 2);
        let dy = (b.y + b.height / 2) - (a.y + a.height / 2);
        let dist = Math.hypot(dx, dy) || 1;
        this.velocityX += (dx / dist * this.chaseSpeed - this.velocityX) * 0.05;   // sanftes Anfahren
        this.velocityY += (dy / dist * this.chaseSpeed - this.velocityY) * 0.05;
        if (Math.abs(dx) > 20) this.otherDirection = dx > 0;   // Bilder schauen nach links
    }

    takeDamage(amount) {
        if (this.isDead() || this.state === 'introduction') return;
        this.health -= amount;
        this.lastHit = Date.now();   // löst über isHurt() den Zustand "hurt" aus
        console.log(`Endboss takes ${amount} damage, health now ${this.health}`);
    }

    stop() {
        clearInterval(this.animationInterval);
        clearInterval(this.moveInterval);
    }
}