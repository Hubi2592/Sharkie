class DrawableObject {
    x;
    y;
    img;
    height;
    width;
    imgCache = {};
    currentImage = 0;
    offset = { top: 0, bottom: 0, left: 0, right: 0 };

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(imageArrays) {
        imageArrays.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        this.img = this.imgCache[images[i]];
        this.currentImage++;
    }

    playAnimationTailLoop(images, tailCount) {
        if (this.currentImage >= images.length) {
            this.currentImage = images.length - tailCount;
        }
        this.img = this.imgCache[images[this.currentImage]];
        this.currentImage++;
    }

    playAnimationEndStop(images) {
        if (this.currentImage >= images.length) {
            return;
        }
        this.img = this.imgCache[images[this.currentImage]];
        this.currentImage++;
    }

    getHitbox() {
        let left = this.otherDirection ? this.offset.right : this.offset.left;
        let right = this.otherDirection ? this.offset.left : this.offset.right;
        return {
            x: this.x + left,
            y: this.y + this.offset.top,
            width: this.width - left - right,
            height: this.height - this.offset.top - this.offset.bottom
        };
    }

    isColliding(mo) {
        let a = this.getHitbox();
        let b = mo.getHitbox();
        return a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
    }

    distanceTo(mo) {
        let a = this.getHitbox();
        let b = mo.getHitbox();
        let dx = (a.x + a.width / 2) - (b.x + b.width / 2);
        let dy = (a.y + a.height / 2) - (b.y + b.height / 2);
        return Math.hypot(dx, dy);
    }
    
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Enemy || this instanceof Endboss) {
            let box = this.getHitbox();
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 2;
            ctx.strokeRect(box.x, box.y, box.width, box.height);
        }
    }
}