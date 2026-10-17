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
        this.x = this.x + 3;
        this.otherDirection = false;
     };

    swimLeft() {
        this.x = this.x - 3;
        this.otherDirection = true;
    }

    swimUp() {
        this.y = this.y - 3;
    }

    swimDown() {
        this.y = this.y + 3;
    }

    moveleft() {
        this.x -= this.speed;
    }

    animate() {
        let i = this.currentImage % this.ImagesIdle.length;
        let path = this.ImagesIdle[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }

    swimAnimate() {
        let i = this.currentImage % this.swimImages.length;
        let path = this.swimImages[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }

}