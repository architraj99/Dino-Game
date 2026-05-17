let dino = document.getElementById("dino");
let score = document.getElementById("score");

let gameArea = document.querySelector(".game-area");

let gameOver = document.getElementById("gameOver");

let isJumping = false;
let gameRunning = true;
let position = 60;
let velocity = 0;
let gravity = 0.9;

function jump() {

    if (isJumping || !gameRunning) {
        return;
    }

    isJumping = true;
    velocity = 14;
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
}

function checkCollision(cactus) {

    let dinoRect = dino.getBoundingClientRect();
    let cactusRect = cactus.getBoundingClientRect();

    if (dinoRect.right > cactusRect.left && dinoRect.left < cactusRect.right &&
        dinoRect.bottom > cactusRect.top) {

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

            cactusPosition += 6;
            cactus.style.right =cactusPosition + "px";

            checkCollision(cactus);

            if (cactusPosition > 1000) {

                clearInterval(obstacleMove);
                cactus.remove();
            }

        }, 20);
}

setInterval(function() {
    createObstacle();
}, 2200);

document.addEventListener(
    "keydown",
    function (event) {
        if (event.code === "Space") {

            jump();
        }
    }
);

updateJump();