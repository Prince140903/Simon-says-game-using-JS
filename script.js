let GameSeq = [];
let PlayerSeq = [];
let btns = document.querySelectorAll(".btn");
let HighScore = 0;
let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let FlashingBtns = [];

document.addEventListener("keypress", function(event) {
    if(event.key === "Enter"){
        if(started == false){
            console.log("Game Started");
            started = true;
        
            levelUp();
        }
    }
});

function levelUp() {
    PlayerSeq = [];
    level++;
    h2.innerText = `level ${level}`;

    let RandomIdx = Random(btns);           //0, 1, 2, 3 (Random)
    let RandomBtn = btns[RandomIdx];
    GameSeq.push(RandomBtn.id);
    FlashingBtns.push(RandomBtn);
    console.log(FlashingBtns);
    // for(let Btn of FlashingBtns){
    //     setTimeout(flash(Btn), 1000);
    // }
    FlashingBtns.forEach((Btn, index) => {
        setTimeout(() => flash(Btn), 1000 * (index + 1));
    });
}

function flash(btn) {
    btn.style.opacity = "0.7"
    setTimeout(function() {
        btn.style.opacity = "1"
    }, 250);
}

function Random(btns) {
    return Math.floor(Math.random() * btns.length);
}

function btnPress() {
    let btn = this;
    flash(btn);

    userColor = btn.getAttribute("id");
    PlayerSeq.push(userColor);

    checkAns(PlayerSeq.length-1);
}

let allbtns = document.querySelectorAll(".btn");
for (btn of allbtns) {
    btn.addEventListener("click", btnPress);
}

function checkAns(idx) {
    if(GameSeq[idx] === PlayerSeq[idx]){
        if(GameSeq.length == PlayerSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else {
        if(level > HighScore){
            HighScore = level;
        }
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "lightgreen";
        }, 100);
        alert(`Game Over!!\n Your Score: ${level} \n Highest Score: ${HighScore}`);
        h2.innerText = `Game Over!! Please press Enter to try again.\n Your Score: ${level}`;
        reset();
        }
    }

function reset() {
    GameSeq = [];
    level = 0;
    FlashingBtns = [];
    started = false;
}
