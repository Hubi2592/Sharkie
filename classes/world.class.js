class World {
backgroundObjects = [
    new BackgroundObject('img/3. Background/Layers/5. Water/D2.png'),
    new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png'),
    new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png'),
    new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png'),
    new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png'),
    new BackgroundObject('img/3. Background/Layers/1. Light/COMPLETO.png'),
    
]
character = new Character();
enemies = [
    new Enemy(),
    new Enemy(),
    new Enemy(),
    new Enemy(),
];

canvas;
ctx;
keyboard;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext("2d");
        this.draw();
    }



    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToCanvas(this.backgroundObjects);
        this.addObjectsToCanvas([this.character]);
        this.addObjectsToCanvas(this.enemies);

            let self = this;
         requestAnimationFrame(function() {
            self.draw();
        });

        if (this.keyboard.LEFT) {
            this.character.swimLeft();
        }
        if (this.keyboard.RIGHT) {
            this.character.swimRight();
        }
        if (this.keyboard.UP) {
            this.character.swimUp();
        }
        if (this.keyboard.DOWN) {
            this.character.swimDown();
        }
    }

    addObjectsToCanvas(objects) {
        objects.forEach(object => {
            this.addToCanvas(object);
        });
    }

    addToCanvas(mo) {
    if (mo.otherDirection) {
        this.ctx.save();
        this.ctx.translate(mo.x + mo.width, 0);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(mo.img, 0, mo.y, mo.width, mo.height);
        this.ctx.restore();
    } else {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}

}