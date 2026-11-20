class Collectible extends DrawableObject {
    constructor(x, y, imagePath) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}