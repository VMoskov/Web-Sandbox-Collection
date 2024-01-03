const colorNames = ["", "blue", "red"];
let boardLocked = false;

let player1 = prompt("Player 1: Enter your name, you will be Blue");
let player2 = prompt("Player 2: Enter your name, you will be Red");

const players = {
    player1: player1,
    player2: player2
}

const colors = {
    player1Color: "RGB(86, 151, 255)",
    player2Color: "RGB(237, 45, 73)"
}

function changeColor(rowIndex, colIndex, color, callback) {
    $(`#${rowIndex}${colIndex}`).css("background-color", color);
    setTimeout(callback, 100);  // 100ms delay before callback so that the color change is visible
}

function checkBottom(colIndex) {
    for(let row = 5; row >= 0; row--) {
        if($(`#${row}${colIndex}`).css("background-color") === "rgb(139, 139, 139)") { // default color
            return row;
        }
    }
}

function colorMatchCheck(one, two, three, four) {
    return (one === two && one === three && one === four && one !== "rgb(139, 139, 139)" && one !== undefined);
}

function horizontalWinCheck() {
    for(let row = 0; row < 6; row++) {
        for(let col = 0; col < 4; col++) {
            if(colorMatchCheck(
                $(`#${row}${col}`).css("background-color"),
                $(`#${row}${col+1}`).css("background-color"),
                $(`#${row}${col+2}`).css("background-color"),
                $(`#${row}${col+3}`).css("background-color")
                )
            ) {
                return true;
            }
        }
    }
}

function verticalWinCheck() {
    for(let col = 0; col < 7; col++) {
        for(let row = 0; row < 3; row++) {
            if(colorMatchCheck(
                $(`#${row}${col}`).css("background-color"),
                $(`#${row+1}${col}`).css("background-color"),
                $(`#${row+2}${col}`).css("background-color"),
                $(`#${row+3}${col}`).css("background-color")
                )
            ) {
                return true;
            }
        }
    }
}

function diagonalWinCheck() {
    for(let col = 0; col < 5; col++) {
        for(let row = 0; row < 7; row++) {
            if(colorMatchCheck(
                $(`#${row}${col}`).css("background-color"),
                $(`#${row+1}${col+1}`).css("background-color"),
                $(`#${row+2}${col+2}`).css("background-color"),
                $(`#${row+3}${col+3}`).css("background-color")
                )
            ) {
                return true;
            } else if(colorMatchCheck(
                $(`#${row}${col}`).css("background-color"),
                $(`#${row-1}${col+1}`).css("background-color"),
                $(`#${row-2}${col+2}`).css("background-color"),
                $(`#${row-3}${col+3}`).css("background-color")
                )
            ) {
                return true;
            }
        }
    }
}

function checkWin() {
    return (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck());
}

$("td").click(function() {
    if(boardLocked) {
        alert("The game is over! Refresh your browser to play again!");
        return;
    }
    let [row, col] = $(this).attr("id").split("");
    let bottom = checkBottom(col);
    if(bottom === undefined) {
        alert("This column is full!");
        return;
    }
    changeColor(bottom, col, colors[currentColor], () => {

        if (checkWin()) {
            boardLocked = true;
            alert(`${currentName} has won! Refresh your browser to play again!`);
        }

        currentPlayer = currentPlayer === 1 ? 2 : 1;
        currentName = players[`player${currentPlayer}`];
        currentColor = `player${currentPlayer}Color`;
        currentColorName = colorNames[currentPlayer];
        $('h3').text(`${currentName} it is your turn, please pick a column to drop your ${currentColorName} chip!`);
    });
})

let currentPlayer = 1;
let currentName = players[`player${currentPlayer}`];
let currentColor = `player${currentPlayer}Color`;
let currentColorName = colorNames[currentPlayer];


$('h3').text(`${currentName} it is your turn, please pick a column to drop your ${currentColorName} chip!`);
