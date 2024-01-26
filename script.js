let counter = 0;
let blocks = document.querySelectorAll(".block");

function attachClickEventListeners() {
    blocks.forEach(function (block) {
        block.addEventListener('click', clickHandler);
    });
}

function clickHandler() {
    if (counter <= 8) {
        if (!this.querySelector('p')) {
            var blockid = this.id;
            let add = document.getElementById(blockid);

            if (counter % 2 == 0) {
                const O = document.createElement("p");
                O.className = "O";
                O.innerHTML = "O";
                add.appendChild(O);
                counter = counter + 1;
                console.log(counter);
            } else {
                const X = document.createElement("p");
                X.className = "X";
                X.innerHTML = "X";
                add.appendChild(X);
                counter = counter + 1;
            }
        }
    } else {
        alert("game over");
        blocks.forEach(function (block) {
            block.innerHTML = "";
        });
        counter = 0;
        attachClickEventListeners();
    }
}

attachClickEventListeners();

let reset = document.getElementById('reset');

reset.addEventListener('click', function () {
    document.querySelectorAll('.block').forEach(function (element) {
        element.innerHTML = "";
    });

    counter = 0;
    attachClickEventListeners();
});
