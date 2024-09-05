let score = 0;
let cross = true;

let audio = new Audio('music.mp3');
let audiogo = new Audio('gameover.mp3');

setTimeout(() => {
    audio.play();
}, 10000);

document.addEventListener('keydown', function (e) {
    console.log("Key code is: ", e.code);

    let dino = document.querySelector('.dino');

    if (e.code === "ArrowUp") {
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700);
    }
    if (e.code === "ArrowRight") {
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
    }
    if (e.code === "ArrowLeft") {
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }
});

setInterval(() => {
    let dino = document.querySelector('.dino');
    let gameOver = document.querySelector('.gameOver');
    let obstacle = document.querySelector('.obstacle');

    let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    let offsetX = Math.abs(dx - ox);
    let offsetY = Math.abs(dy - oy);

    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again";
        obstacle.classList.remove('obstacleAni');
        audiogo.play();
        setTimeout(() => {
            audio.play();
            audiogo.pause();
        }, 1000);
    } else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            let aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            let newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur);
        }, 500);
    }
}, 10);

function updateScore(score) {
    let scoreCont = document.querySelector('#scoreCont');
    if (scoreCont) {
        scoreCont.innerHTML = "Your Score: " + score;
    }
}