class MovableObject {
    x;
    y;
    img;
    height;
    width;
    imgCache = {};
    currentImage = 0;
    otherDirection = false;

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
        };
    

     swimRight() {
        this.x = this.x + 5;
        this.otherDirection = false;
     };

    swimLeft() {
        this.x = this.x - 5;
        this.otherDirection = true;
    }

    swimUp() {
        this.y = this.y - 5;
    }

    swimDown() {
        this.y = this.y + 5;
    }

    moveleft() {
        this.x -= this.speed;
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
}