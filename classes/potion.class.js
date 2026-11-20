class Potion extends Collectible {

    constructor(x, groundY) {
        super(x, 0, 'img/4. Marcadores/Posión/Dark - Left.png');
        this.width = 60;    // Platzhalter
        this.height = 70;   // Platzhalter
        this.y = groundY - this.height;   // Unterkante liegt auf dem Boden
    }
}