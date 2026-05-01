let gameseq = [];
let userseq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let body = document.querySelector("body");

// Start game on keypress
document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game Started");
        started = true;
        levelup();
    }
});

// Start game on touch (for mobile)
document.addEventListener("touchstart", function () {
    if (!started) {
        started = true;
        levelup();
    }
}, { once: true });

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 150);
}

function levelup() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;
    
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameseq.push(randColor);
    
    // Slight delay before flashing the next sequence
    setTimeout(() => {
        gameFlash(randBtn);
    }, 500);
}

function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length == gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerHTML = `GAME OVER! <br> Your Score: <span style="color: #ff4d4d; font-weight: bold;">${level}</span> <br> Press any key to restart`;
        
        body.classList.add("game-over");
        setTimeout(function () {
            body.classList.remove("game-over");
        }, 500);
        
        reset();
    }
}

function btnPress() {
    if (!started) return;
    
    let btn = this;
    userFlash(btn);
    let usercolor = btn.getAttribute("id");
    userseq.push(usercolor);

    checkAns(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}