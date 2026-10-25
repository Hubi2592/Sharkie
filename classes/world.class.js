class World {

character = new Character();
enemies = level1.enemies;
backgroundObjects = level1.backgroundObjects;
canvas;
ctx;
keyboard;
camera_x =0;
lastCharacterX = this.character.x;
tileWidth =1900;
nextTileIndex =2;
nextEnemySpawnX =1900;
enemySpawnDistance = 600;


    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext("2d");
        this.character.world = this;
        this.draw();
    }

    extendBackground() {
    let visibleRight = -this.camera_x + this.canvas.width;
    while (visibleRight + this.tileWidth > this.nextTileIndex * this.tileWidth) {
        this.addBackgroundTile(this.nextTileIndex);
        this.nextTileIndex++;
        }
    }

    addBackgroundTile(index) {
    let x = index * this.tileWidth;
    let variant = index % 2 === 0 ? 'D1' : 'D2';
    let light = index % 2 === 0 ? '1' : '2';
    let base = 'img/3. Background/Layers/';
    this.backgroundObjects.push(
        new BackgroundObject(`${base}5. Water/${variant}.png`, x),
        new BackgroundObject(`${base}3.Fondo 1/${variant}.png`, x),
        new BackgroundObject(`${base}4.Fondo 2/${variant}.png`, x),
        new BackgroundObject(`${base}2. Floor/${variant}.png`, x),
        new BackgroundObject(`${base}1. Light/${light}.png`, x)
        );
    }

   updateCamera() {
    let screenX = this.character.x + this.character.width / 2 + this.camera_x;
    let third = this.canvas.width / 3;
    let moved = this.character.x - this.lastCharacterX;

    if (screenX > third * 2 && moved > 0) {
        this.camera_x -= moved;
    } else if (screenX < third && moved < 0) {
        this.camera_x -= moved;
    }

    this.camera_x = Math.min(0, this.camera_x);
    this.lastCharacterX = this.character.x;
    }

    spawnEnemies() {
    if (this.character.x > this.nextEnemySpawnX) {
        let spawnX = -this.camera_x + this.canvas.width + 100;
        this.enemies.push(new Enemy(spawnX));
        this.nextEnemySpawnX += this.enemySpawnDistance;
    }
    }

    removeOffscreenEnemies() {
    this.enemies = this.enemies.filter(enemy => {
        let gone = enemy.x + enemy.width < -this.camera_x - 1000;
        if (gone) enemy.stop();
        return !gone;
    });
    }

    
    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.updateCamera();
        this.extendBackground();
        this.spawnEnemies();
        this.removeOffscreenEnemies();
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
        this.character.x =Math.max(0, this.character.x);
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