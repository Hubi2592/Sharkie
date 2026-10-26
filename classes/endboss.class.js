class Endboss extends MovableObject {

    introductionImages = [
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/10.png',
    ];

    floatImages = [
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/2.Enemy/3 Final Enemy/2.floating/13.png',
    ]

     constructor(x = 1500) {
        super().loadImage(this.introductionImages[0]);
        this.loadImages(this.introductionImages);
        this.loadImages(this.floatImages);
        this.x = x;
        this.y = 10;
        this.height = 400;
        this.width = 400;
        this.speed = 1 + Math.random() * 3;
        this.state ='introduction';


        this.animmationInterval = setInterval(()=>{
            if (this.state === 'introduction'){
                this.playAnimationEndStop(this.introductionImages);   
                if (this.currentImage >= this.introductionImages.length){
                this.state ='floating';
                this.currentImage = 0;
                }
            } else if(this.state === 'floating'){
                this.playAnimation(this.floatImages);
            }
        }, 1000 / 10);
     }

     stop() {
        clearInterval(this.animationInterval);
    }
}