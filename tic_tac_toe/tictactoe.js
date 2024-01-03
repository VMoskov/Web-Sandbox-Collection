const board = document.querySelectorAll('.cell');

let restart = document.getElementById("restart");
restart.onclick = function () {
    board.forEach(cell => {
        cell.innerHTML = "";
    });
}

board.forEach(cell => {
    cell.onclick = function () {
        cell.innerHTML = cell.innerHTML === "" ? "X" : (cell.innerHTML === "X" ? "O" : "")
    }
});