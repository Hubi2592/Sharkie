class PoisonIndicator extends DrawableObject {
    images = [
        'img/4. Marcadores/Posión/Animada/1.png',
        'img/4. Marcadores/Posión/Animada/2.png',
        'img/4. Marcadores/Posión/Animada/3.png',
        'img/4. Marcadores/Posión/Animada/4.png',
        'img/4. Marcadores/Posión/Animada/5.png',
        'img/4. Marcadores/Posión/Animada/6.png',
        'img/4. Marcadores/Posión/Animada/7.png',
        'img/4. Marcadores/Posión/Animada/8.png'
    ];

    constructor() {
        super();
        this.loadImages(this.images);
        this.loadImage(this.images[0]);
        this.width = 60;    // Platzhalter
        this.height = 60;   // Platzhalter
    }

    showAbove(target) {
        let box = target.getHitbox();
        this.x = box.x + box.width / 2 - this.width / 2;
        this.y = box.y - this.height - 5;
        let frame = Math.floor(Date.now() / 100) % this.images.length;
        this.img = this.imgCache[this.images[frame]];
    }
}