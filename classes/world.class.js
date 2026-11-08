class World {
statusBar = new StatusBar();
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
maxTiles = 4;
nextEnemySpawnX =1900;
enemySpawnDistance = 600;
bubbles = [];



    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext("2d");
        this.character.world = this;
        this.draw();
    }

   extendBackground() {
    let visibleRight = -this.camera_x + this.canvas.width;
    while (this.nextTileIndex < this.maxTiles &&
           visibleRight + this.tileWidth > this.nextTileIndex * this.tileWidth) {
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

            if (Math.random() < 0.3) {
                let y = 50 + Math.random() * (this.canvas.height - 300);
                this.enemies.push(new Jellyfish(spawnX, y));
            } else {
                this.enemies.push(new Enemy(spawnX));
            }

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

    checkCollisions() {
        if (this.character.isDead()) return;
        this.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy) && this.character.hit()) {
                this.character.health -= 20;
                this.statusBar.setPercentage(this.character.health);
                this.character.knockback(enemy);
                console.log('Treffer', enemy);
                console.log('Health', this.character.health )
            }
        });
    }

    updateEnemyAwareness() {
        this.enemies.forEach(enemy => {
            if (enemy instanceof Jellyfish) {
                enemy.nearby = enemy.distanceTo(this.character) < enemy.alertRange;
            }
        });
    }

    checkThrowObjects() {
        if (this.character.shotReady) {
            this.character.shotReady = false;
            let c = this.character;
            let direction = c.otherDirection ? -1 : 1;
            let x = c.otherDirection ? c.x : c.x + c.width - 40;
            let y = c.y + c.height / 2;
            this.bubbles.push(new Bubble(x, y, direction));
            // this.bubbles.push(new Bubble(x, y, direction, true));
        }
    }

    updateBubbles() {
        this.bubbles = this.bubbles.filter(bubble => {
            let hitEnemy = this.enemies.some(enemy => bubble.isColliding(enemy));
            let expired = Date.now() - bubble.spawnTime > bubble.lifeTime;
            let remove = hitEnemy || expired;
            if (remove) bubble.stop();
            return !remove;
        });
    }

    
    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.updateCamera();
        this.extendBackground();
        this.spawnEnemies();
        this.removeOffscreenEnemies();
        this.updateEnemyAwareness();
        this.checkCollisions();
        this.checkThrowObjects();
        this.updateBubbles();
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToCanvas(this.backgroundObjects);
        this.addObjectsToCanvas([this.character]);
        this.addObjectsToCanvas(this.enemies);
        this.addObjectsToCanvas(this.bubbles);
        this.ctx.translate(-this.camera_x, 0);
        this.addToCanvas(this.statusBar);

            let self = this;
         requestAnimationFrame(function() {
            self.draw();
        });
        if (!this.character.isDead() &&!this.character.isHurt()){
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
    
        mo.drawFrame(this.ctx);
    }

}