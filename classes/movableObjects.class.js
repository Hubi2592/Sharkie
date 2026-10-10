class MovableObject {
    x;
    y;
    img;
    height;
    width;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

     swimright() {};

    swimleft() {};

    swimup() {};

    swimdown() {};

}