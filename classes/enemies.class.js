class Enemy extends MovableObject {

    constructor() {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.x = 1750;
        this.y = Math.random() * 850 + 50; // Random y position between 50 and 900
        this.height = 150;
        this.width = 150;
    }

    
}