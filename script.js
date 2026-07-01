const boxes = document.querySelectorAll(".box");
const reset_btn = document.getElementById("resetGame");
const msgContainer = document.querySelector(".msg_container");
const msg = document.getElementById("msg");
const newGameBtn = document.getElementById("newGameBtn");
const gameComplete = document.getElementById("gameBoardFull");

const winning_patterns = [
  [0, 1, 2],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8]
]

let turnO = true;    // player O player X
let chance = 0;

function disabled() {
  for (box of boxes) {
    box.disabled = true;
  }

}
function enable() {
  for (box of boxes) {
    box.disabled = false;
  }

}

function resetGame() {
  enable();
  turnO = true;
  chance = 0;
  msgContainer.classList.add("hidden");
  gameComplete.classList.add('hidden');
  for (box of boxes) {
    box.textContent = "";
  }
}

if (chance >= 9) {
  gameComplete.innerText = "Oops No one is Winner Try Again!!"
  gameComplete.classList.remove('hidden');
  console.log("no one win....");
}

boxes.forEach(box => {

  box.addEventListener("click", function () {
    if (turnO === true) {   // turn of player O
      box.textContent = "O";
      turnO = false;
    } else {
      box.textContent = "X";   // turn of player X
      turnO = true;
    }
    box.disabled = true;
    chance++;

    console.log(chance, "chance..................")
    checkWinner();
  })



});

function checkWinner() {
  for (pattern of winning_patterns) {   //pattern is become 1d array and winning_patterns is 2D array

    // console.log(pattern[0], pattern[1], pattern[2]);
    // console.log(pattern, "...............................");   [0,1,2].....
    // console.log(boxes[pattern[0]]);  box of oth index of pattern.
    // console.log(boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]])

    let pos1 = boxes[pattern[0]].textContent;
    let pos2 = boxes[pattern[1]].textContent;
    let pos3 = boxes[pattern[2]].textContent;
    // console.log(pos2, "pos2 ...........................")
    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showWinner(pos1);
      } else if (chance >= 9) {
        gameComplete.innerText = "Oops No one is Winner Try Again!!"
        gameComplete.classList.remove('hidden');
      }
    }

  }
}
function showWinner(pos1) {
  msgContainer.classList.remove("hidden");
  msg.innerHTML = `Congratulations!  Winner is ${pos1}`;

}

newGameBtn.addEventListener("click", resetGame);
reset_btn.addEventListener("click", resetGame);
