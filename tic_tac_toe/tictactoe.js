let currentPlayer = "X";
let boardLocked = false;
const board = document.querySelectorAll('.cell');

let restart = document.getElementById("restart");

restart.onclick = function () {
    board.forEach(cell => {
        cell.innerHTML = "";
        cell.style.color = "black";
    });
}

function changeColor(winningCombo) {
    winningCombo.forEach(index => {
        board[index].style.color = "red";
    });
}

function checkCombo(combo) {
    if(board[combo[0]].innerHTML === board[combo[1]].innerHTML && board[combo[1]].innerHTML === board[combo[2]].innerHTML && board[combo[0]].innerHTML !== "") {
        console.log("win")
        console.log(board[combo[0]].innerHTML, board[combo[1]].innerHTML, board[combo[2]].innerHTML)
    }
    return board[combo[0]].innerHTML === board[combo[1]].innerHTML &&
        board[combo[1]].innerHTML === board[combo[2]].innerHTML &&
        board[combo[0]].innerHTML !== "";
}

function checkWin(callback) {
    let win = false;
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
        [0, 4, 8], [2, 4, 6] //diagonals
    ];

    winningCombos.forEach(combo => {
        if (checkCombo(combo)) {
            win = true;
            boardLocked = true;
            changeColor(combo);
        }
    });

    setTimeout(() => {
        callback(win);
    }, 100);
}

board.forEach(cell => {
    cell.onclick = function () {
        if (cell.innerHTML === "" && !boardLocked) {
            cell.innerHTML = currentPlayer;
            checkWin((result) => {
                if (result) alert("Player " + currentPlayer + " has won!");
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            })
        }
        else {
            let message = boardLocked ? "The game has ended." : "This cell is already taken!";
            alert(message);
        }
    }
});

