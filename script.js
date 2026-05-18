let dino = document.getElementById("dino");
let score = document.getElementById("score");

let speedText = document.getElementById("speedText");

let gameArea = document.querySelector(".game-area");

let gameOver = document.getElementById("gameOver");

let restartBtn = document.getElementById("restartBtn");

let isJumping = false;
let gameRunning = true;
let position = 60;
let velocity = 0;
let gravity = 0.9;
let gameScore = 0;
let obstacleSpeed = 6;

function jump() {

    if (isJumping || !gameRunning) {
        return;
    }

    isJumping = true;
    velocity = 15;
    dino.style.transform = "rotate(-10deg)";

    setTimeout(function() {
        dino.style.transform = "rotate(0deg)";

    }, 300);
}

function updateJump() {

    velocity -= gravity;
    position += velocity;

    if (position <= 60) {

        position = 60;
        velocity = 0;
        isJumping = false;
    }

    dino.style.bottom = position + "px";
    requestAnimationFrame(updateJump);

}

function stopGame() {

    gameRunning = false;
    gameOver.style.display = "block";
    restartBtn.style.display = "block";
}

function updateScore() {

    if(!gameRunning) {
        return;
    }

    gameScore++;
    score.innerText = gameScore;
    speedText.innerText = obstacleSpeed.toFixed(1) + "x";

    if(gameScore % 25 === 0) {

        obstacleSpeed += 0.4;
    }
}

function checkCollision(cactus) {

    let dinoRect = dino.getBoundingClientRect();
    let cactusRect = cactus.getBoundingClientRect();

    if (dinoRect.right - 18> cactusRect.left && dinoRect.left + 18 < cactusRect.right &&
        dinoRect.bottom - 12 > cactusRect.top) {

        stopGame();
    }

}

function createObstacle() {

    if (!gameRunning) {
        return;
    }

    let cactus = document.createElement("div");

    cactus.classList.add("cactus");
    cactus.innerText = "🌵";
    gameArea.appendChild(cactus);

    let cactusPosition = -60;

    let obstacleMove = setInterval(function () 
        {

            if (!gameRunning) {

                clearInterval(obstacleMove);
                return;

            }

            cactusPosition += obstacleSpeed;
            cactus.style.right =cactusPosition + "px";

            checkCollision(cactus);

            if (cactusPosition > 1200) {

                clearInterval(obstacleMove);
                cactus.remove();
            }

        }, 20);
}

setInterval(function() {
    createObstacle();
}, 2600);

setInterval(function() {
    updateScore();
}, 300);

document.addEventListener(
    "keydown",
    function (event) {
        if (event.code === "Space") {

            jump();
        }
    }
);

restartBtn.addEventListener("click",
    function() {

        location.reload();
    }
);

updateJump();