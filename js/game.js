let canvas;
let ctx;
let world;
let keyboard = new Keyboard();



function init() {
    level1 = createLevel1();
    canvas = document.getElementById("gameCanvas");
    world = new World(canvas, keyboard);
    ctx = canvas.getContext("2d");
    console.log("My character is:", world.character);

}

function startGame() {
    document.getElementById('startScreen').classList.add('hidden');
    init();
}

function toggleControls() {
    document.getElementById('controls').classList.toggle('hidden');
}

function toggleFullScreen() {
    let container = document.getElementById('gameContainer');
    if (!document.fullscreenElement) {
        container.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

function showGameOver() {
    document.getElementById('gameOverScreen').classList.remove('hidden');
}

function restartGame() {
    document.getElementById('gameOverScreen').classList.add('hidden');
    world.stop();
    init();
}

window.addEventListener('keydown', (event) => {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(event.key)) {
        event.preventDefault();
        }
    if (event.key === 'ArrowLeft') keyboard.LEFT = true;
    if (event.key === 'ArrowRight') keyboard.RIGHT = true;
    if (event.key === 'ArrowUp') keyboard.UP = true;
    if (event.key === 'ArrowDown') keyboard.DOWN = true;
    if (event.key === ' ') keyboard.SPACE = true;
    if (event.key.toLowerCase() === 'd') keyboard.D = true;

});

window.addEventListener('keyup', (event) => {

    if (event.key === 'ArrowLeft') keyboard.LEFT = false;
    if (event.key === 'ArrowRight') keyboard.RIGHT = false;
    if (event.key === 'ArrowUp') keyboard.UP = false;
    if (event.key === 'ArrowDown') keyboard.DOWN = false;
    if (event.key === ' ') keyboard.SPACE = false;
    if (event.key.toLowerCase() === 'd') keyboard.D = false;
});