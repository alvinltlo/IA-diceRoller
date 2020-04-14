const reroll_btn = document.getElementById("reroll");
const clear_btn = document.getElementById("clear");
const result_div = document.getElementById("result");

// reset dropdown to 0
function reset() {
    console.log("reset()");
    $("#redDiceCount")[0].selectedIndex = 0;
    $("#yellowDiceCount")[0].selectedIndex = 0;
    $("#greenDiceCount")[0].selectedIndex = 0;
    $("#blueDiceCount")[0].selectedIndex = 0;
    $("#whiteDiceCount")[0].selectedIndex = 0;
    $("#blackDiceCount")[0].selectedIndex = 0;
}

// clear rolled result
function clearResult() {
    console.log("clearResult()");
    result_div.innerHTML = '';
    resetReRollBtn();
    resetClearBtn();
}

// roll all the dices
function roll() {
    var requestMap = new Map();
    requestMap.set("red", $("#redDiceCount").val());
    requestMap.set("yellow", $("#yellowDiceCount").val());
    requestMap.set("green", $("#greenDiceCount").val());
    requestMap.set("blue", $("#blueDiceCount").val());
    requestMap.set("while", $("#whiteDiceCount").val());
    requestMap.set("black", $("#blackDiceCount").val());

    for (const [key, value] of requestMap.entries()) {
        // console.log(key, value);
        for (i = 0; i < value; i++) {
            addToResult(key);
        }
    }
    reset();
    resetClearBtn();
}

// private function to append dice roll result
function addToResult(type) {
    var redImageUrl = 'images\\Dice-Red';
    var yellowImageUrl = 'images\\Dice-Yellow';
    var greenImageUrl = 'images\\Dice-Green';
    var blueImageUrl = 'images\\Dice-Blue';
    var whiteImageUrl = 'images\\Dice-White';
    var blackImageUrl = 'images\\Dice-Black';

    switch (type) {
        case "red":
            var imageUrl = redImageUrl;
            break;
        case "yellow":
            var imageUrl = yellowImageUrl;
            break;
        case "green":
            var imageUrl = greenImageUrl;
            break;
        case "blue":
            var imageUrl = blueImageUrl;
            break;
        case "while":
            var imageUrl = whiteImageUrl;
            break;
        case "black":
            var imageUrl = blackImageUrl;
            break;
    }
    var img = document.createElement("img");
    img.src = imageUrl + " " + getRandom() + ".jpg";
    img.classList.add("animated");
    img.classList.add("bounceIn");
    img.classList.add("mx-1");
    img.classList.add("selectable");
    img.alt = type;
    result_div.appendChild(img);
}

// private function to generate random number between 1 to 6
function getRandom() {
    return Math.floor(Math.random() * 6) + 1;
}

function reroll() {
    var selectedDices = document.getElementsByClassName("selected");
    selectedDices = [].slice.call(selectedDices);

    selectedDices.forEach(function (dice) {
        addToResult(dice.alt);
        dice.classList.add("blur");
        dice.classList.remove("selected");
    })

    resetReRollBtn();
}

function resetReRollBtn() {
    var selectedDices = document.getElementsByClassName("selected");
    if (selectedDices.length === 0) {
        reroll_btn.disabled = true;
    }
    else {
        reroll_btn.disabled = false;
    }
}

function resetClearBtn() {
    if (result_div.hasChildNodes()) {
        clear_btn.disabled = false;
    }
    else {
        clear_btn.disabled = true;
    }
}

$('body').on('click', '#result img', function () {

    //nothing happen when the blur diced is selected.
    if (this.classList.contains("blur"))
        return;

    //toggle selected/unselected
    if (this.classList.contains("selected")) {
        this.classList.remove("selected")
    }
    else {
        this.classList.add("selected")
    }

    //if there is no selected dices, disabled reroll
    resetReRollBtn();
})