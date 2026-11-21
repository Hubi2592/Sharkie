
class StatusBar extends DrawableObject{
    HealthIMAGES = [
        'img/4. Marcadores/green/Life/100_  copia 2.png',
        'img/4. Marcadores/green/Life/80_  copia 3.png',
        'img/4. Marcadores/green/Life/60_  copia 3.png',
        'img/4. Marcadores/green/Life/40_  copia 3.png',
        'img/4. Marcadores/green/Life/20_ copia 4.png',
        'img/4. Marcadores/green/Life/0_  copia 3.png'
    ];

    PotionIMAGES = [
        'img/4. Marcadores/green/poisoned bubbles/100_ copia 3.png',
        'img/4. Marcadores/green/poisoned bubbles/80_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/60_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/40_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/20_ copia 3.png',
        'img/4. Marcadores/green/poisoned bubbles/0_ copia 2.png'
    ];

    percentage = 100;

    constructor(type = 'health') {
        super();
        this.images = type === 'potion' ? this.PotionIMAGES : this.HealthIMAGES;
        this.loadImages(this.images);
        this.x = 10;
        this.y = type === 'potion' ? 130 : 10;
        this.width = 400;
        this.height = 120;
        this.setPercentage(type === 'potion' ? 0 : 100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images[this.resolveImageIndex()];
        this.img = this.imgCache[path];
    }

    resolveImageIndex() {
        if (this.percentage >= 100) return 0;
        if (this.percentage >= 80) return 1;
        if (this.percentage >= 60) return 2;
        if (this.percentage >= 40) return 3;
        if (this.percentage > 0) return 4;
        return 5;
    }
}