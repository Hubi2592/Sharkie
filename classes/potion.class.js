class Potion extends Collectible {

    ImagesPotion = [
        "img/4. Marcadores/Posión/Dark - Left.png",
        "img/4. Marcadores/Posión/Dark - Right.png",
    ];

    constructor(x, groundY) {
        super(x, 0);
        let path = this.ImagesPotion[Math.floor(Math.random() * this.ImagesPotion.length)];
        this.loadImage(path);
        this.width = 90;
        this.height = 90;
        this.y = groundY - this.height;
    }
}