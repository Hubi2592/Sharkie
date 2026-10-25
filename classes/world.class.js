class World {

character = new Character();
enemies = level1.enemies;
backgroundObjects = level1.backgroundObjects;
canvas;
ctx;
keyboard;
camera_x = 0;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext("2d");
        this.character.world = this;
        this.draw();
    }

    

    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToCanvas(this.backgroundObjects);
        this.addObjectsToCanvas([this.character]);
        this.addObjectsToCanvas(this.enemies);
        this.ctx.translate(-this.camera_x, 0);

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
        this.character.y =Math.max(-90, Math.min(this.character.y, this.canvas.height - this.character.height + 30));
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