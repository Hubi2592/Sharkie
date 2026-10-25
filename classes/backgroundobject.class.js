class BackgroundObject extends MovableObject {
    constructor(imagePath, x, width = 1900, height = 900) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 0;
        this.width = width;
        this.height = height;
    }
}