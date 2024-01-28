let counter = 0;
let blocks = document.querySelectorAll(".block");
let gameWon = false;
let wintxt = document.getElementById("winner");
wintxt.style.display = "none";

function attachClickEventListeners() {
    blocks.forEach(function (block) {
        block.addEventListener('click', clickHandler);
    });
}

function clickHandler() {
    if (!gameWon) {
        let add = this;

        if (counter < 9) {
            if (!this.querySelector('p')) {
                var blockid = this.id;

                if (counter % 2 == 0) {
                    const O = document.createElement("p");
                    O.className = "O";
                    O.innerHTML = "O";
                    add.appendChild(O);
                    counter = counter + 1;
                } else {
                    const X = document.createElement("p");
                    X.className = "X";
                    X.innerHTML = "X";
                    add.appendChild(X);
                    counter = counter + 1;
                }

                const winner = checkWinner();

                if (winner) {
                    wintxt.style.display = "block";
                    wintxt.innerHTML = `Player ${winner} wins!`;
                    gameWon = true;
                    disableClicks();
                }

                if (counter === 9 && !checkWinner()) {
                    turnEverythingYellow();
                    wintxt.style.display = "block";
                    wintxt.innerHTML = `Nobody wins :)`;
                    gameWon = true;
                    disableClicks();
                }
            }
        }
    }
}

function checkWinner() {
    const rowsWinner = checkRows();
    const columnsWinner = checkColumns();
    const diagonalsWinner = checkDiagonals();

    return rowsWinner || columnsWinner || diagonalsWinner;
}

function checkRows() {
    for (let i = 1; i <= 9; i += 3) {
        const row = document.getElementById(i.toString()).querySelector('p');
        const next1 = document.getElementById((i + 1).toString()).querySelector('p');
        const next2 = document.getElementById((i + 2).toString()).querySelector('p');

        if (row && next1 && next2 &&
            row.innerHTML === next1.innerHTML && row.innerHTML === next2.innerHTML) {
            displayWinningCombination(row, next1, next2);
            return row.classList.contains('O') ? 'O' : 'X';
        }
    }
    return null;
}

function checkColumns() {
    for (let i = 1; i <= 3; i++) {
        const col = document.getElementById(i.toString()).querySelector('p');
        const next1 = document.getElementById((i + 3).toString()).querySelector('p');
        const next2 = document.getElementById((i + 6).toString()).querySelector('p');

        if (col && next1 && next2 &&
            col.innerHTML === next1.innerHTML && col.innerHTML === next2.innerHTML) {
            displayWinningCombination(col, next1, next2);
            return col.classList.contains('O') ? 'O' : 'X';
        }
    }
    return null;
}

function checkDiagonals() {
    const diagonal1 = document.getElementById("1").querySelector('p');
    const diagonal2 = document.getElementById("5").querySelector('p');
    const diagonal3 = document.getElementById("9").querySelector('p');

    const antiDiagonal1 = document.getElementById("3").querySelector('p');
    const antiDiagonal2 = document.getElementById("5").querySelector('p');
    const antiDiagonal3 = document.getElementById("7").querySelector('p');

    if (diagonal1 && diagonal2 && diagonal3 &&
        diagonal1.innerHTML === diagonal2.innerHTML && diagonal1.innerHTML === diagonal3.innerHTML) {
        displayWinningCombination(diagonal1, diagonal2, diagonal3);
        return diagonal1.classList.contains('O') ? 'O' : 'X';
    }

    if (antiDiagonal1 && antiDiagonal2 && antiDiagonal3 &&
        antiDiagonal1.innerHTML === antiDiagonal2.innerHTML && antiDiagonal1.innerHTML === antiDiagonal3.innerHTML) {
        displayWinningCombination(antiDiagonal1, antiDiagonal2, antiDiagonal3);
        return antiDiagonal1.classList.contains('O') ? 'O' : 'X';
    }

    return null;
}

function displayWinningCombination(...elements) {
    elements.forEach(element => {
        element.style.color = 'yellow';
    });
}

function turnEverythingYellow() {
    document.querySelectorAll('.block').forEach(function (element) {
        element.style.color = 'yellow';
    });
}

function resetGame() {
    document.querySelectorAll('.block').forEach(function (element) {
        element.innerHTML = "";
        element.style.color = '';
    });

    counter = 0;
    gameWon = false;
    enableClicks();
}

function disableClicks() {
    blocks.forEach(function (block) {
        block.removeEventListener('click', clickHandler);
    });
}

function enableClicks() {
    blocks.forEach(function (block) {
        block.addEventListener('click', clickHandler);
    });
}

attachClickEventListeners();

let reset = document.getElementById('reset');

reset.addEventListener('click', function () {
    resetGame();
    attachClickEventListeners();
    wintxt.innerHTML = " ";
    wintxt.style.display = "none";
});
