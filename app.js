const lostWin = document.getElementById("Lost-Win");
const divs = document.querySelectorAll(".box");
let player = "X";
let round = 1;
let gameEnd = false;

const display = () => {
    divs.forEach(function (div) {
        div.addEventListener("click", () => {
            if (div.innerHTML !== "" || gameEnd) {
                return;
            }
            div.innerHTML = player;
            game();
        });
    });
};

const game = () => {
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],                                       //all the win possibilities example : 0 , 1 , 2 are all equal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]                                             
    ];

    for (const combination of winCombinations) {
        const [a, b, c] = combination;
        const boxA = divs[a].innerHTML;                                     //a is the first part of the win combination for example 0
        const boxB = divs[b].innerHTML;                                     //b is the second part of the win combination for example 1
        const boxC = divs[c].innerHTML;                                     //c is the third part of the win combination for example 2

        if (boxA === boxB && boxB === boxC && boxA !== "") {                  // if a = b, if b = c aka a=b=c then that certain player wins.
            lostWin.innerHTML = `<h1>Player ${player} wins! restart</h1>`;
            gameEnd = true;
            return;
        }
    }

    const isTie = [...divs].every((div) => div.innerHTML !== "");            //this detects if all divs have content
    if (isTie) {                                                          
        lostWin.innerHTML = "<h1>It's a tie!</h1>";
        gameEnd = true;
    }

    if (round >= 9 || gameEnd) {
        gameEnd = true;
        divs.forEach((div) => div.removeEventListener("click", () => {}));      // this removes the divs when game is ended so they can't be used again
    }

    if (!gameEnd) {
        if (player === "X") {
            player = "O";
        } else {
            player = "X";
        }        
        lostWin.innerHTML = `<h1>Player ${player}'s turn</h1>`;
        round++;                                                                  // this repeats the round over and over again until the game is over(aka round sets the conditions)
    }
};

display();
