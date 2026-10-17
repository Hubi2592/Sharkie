class BackgroundObject extends MovableObject {
    constructor(imagePath) {
        super().loadImage(imagePath);
        this.x = 0;
        this.y = 0;
        this.height = 900;
        this.width = 1900;
    }
}
