class MovableObject extends DrawableObject {
    otherDirection = false;
    sinkingSpeed = 1;
    sinkLimit = 700;
    lastHit = 0;
    hitCooldown = 3000;
    hurtDuration = 500;
    health = 100;
    knockbackX = 0;
    knockbackY = 0;

    applyGravity() {
        setInterval(() => {
            if (this.y < this.sinkLimit) {
                this.y += this.sinkingSpeed;
            }
        }, 1000 / 60);
    }

    knockback(source) {
        let a = this.getHitbox();
        let b = source.getHitbox();
        let dirX = (a.x + a.width / 2) < (b.x + b.width / 2) ? -1 : 1;
        let dirY = (a.y + a.height / 2) < (b.y + b.height / 2) ? -1 : 1;
        this.knockbackX = dirX * 25;
        this.knockbackY = dirY * 10;
    }

    applyKnockback() {
        this.x += this.knockbackX;
        this.y += this.knockbackY;
        this.knockbackX *= 0.9;
        this.knockbackY *= 0.9;
        if (Math.abs(this.knockbackX) < 0.5) this.knockbackX = 0;
        if (Math.abs(this.knockbackY) < 0.5) this.knockbackY = 0;
    }

    swimRight() {
        this.x += 10;
        this.otherDirection = false;
    }

    swimLeft() {
        this.x -= 10;
        this.otherDirection = true;
    }

    swimUp() {
        this.y -= 10;
    }

    swimDown() {
        this.y += 10;
    }

    moveleft() {
        this.x -= this.speed;
    }

    hit() {
        let now = Date.now();
        if (now - this.lastHit < this.hitCooldown) {
            return false;
        }
        this.lastHit = now;
        return true;
    }

    isHurt() {
        return Date.now() - this.lastHit < this.hurtDuration;
    }

    isDead() {
        return this.health <= 0;
    }
}