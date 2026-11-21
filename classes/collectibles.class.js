class Collectible extends DrawableObject {
    constructor(x, y, imagePath) {
        super();
        this.x = x;
        this.y = y;
        if (imagePath) {
            this.loadImage(imagePath);
        }
    }

    stop(){}
}