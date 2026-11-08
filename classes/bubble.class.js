class Bubble extends MovableObject {

    bubbleImage = 'img/1.Sharkie/4.Attack/Bubble trap/Bubble.png';
    poisonBubbleImage = 'img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png';

    offset = { top: 0, bottom: 0, left: 0, right: 0 };
    speed = 10;
    lifeTime = 3000; // Bubble will exist for 3 seconds

    constructor(x, y, direction, isPoisoned = false) {
        super();
        this.loadImage(isPoisoned ? this.poisonBubbleImage : this.bubbleImage);
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.direction = direction;
        this.spawnTime = Date.now();

        this.moveInterval = setInterval(() => {
            this.x += this.direction * this.speed;
        }, 1000 / 60);
    }

        stop(){
            clearInterval(this.moveInterval);
        }
    
}
