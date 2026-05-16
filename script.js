let dino = document.getElementById("dino");
let score = document.getElementById("score");

let isJumping = false;
let position = 60;
let velocity = 0;
let gravity = 0.9;

function jump() {

    if(isJumping) {
        return;
    }

    isJumping = true;
    velocity = 14;
}

function updateJump() {

    velocity -= gravity;
    position += velocity;

    if(position <= 60) {
        position = 60;
        velocity = 0;
        isJumping = false;
    }

    dino.style.bottom = position + "px";
    requestAnimationFrame(updateJump);
}

document.addEventListener(
    "keydown",
    function (event) {
        if (event.code === "Space") {
            jump();
        }

    }
);

updateJump();