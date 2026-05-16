let dino = document.getElementById("dino");

let score = document.getElementById("score");

let gameArea = document.querySelector(".game-area");

let isJumping = false;

let position = 60;

let velocity = 0;

let gravity = 0.9;

function jump() {

    if (isJumping) {
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

function createObstacle() {

    let cactus = document.createElement("div");

    cactus.classList.add("cactus");
    cactus.innerText = "🌵";
    gameArea.appendChild(cactus);

    let cactusPosition = -60;

    let obstacleMove =
        setInterval(function () {

            cactusPosition += 6;

            cactus.style.right =
                cactusPosition + "px";

            if (cactusPosition > 1000) {

                clearInterval(obstacleMove);
                cactus.remove();
            }

        }, 20);
}

setInterval(function () {
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