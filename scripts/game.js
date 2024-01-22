var grids = document.querySelectorAll(".grid-element"); // DOM for class of grid-element

let hold = 0;   // used for backspace

let gridIndex = 0;  // grid index

// keeps track of tries. try number * 5 for the specific index

let tryShifter = [5, 10, 15, 20, 25];

// Tracking last words

let pastWords = [];
let currWord = [];

// Accessible keys

const keys = [
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "Enter",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
    "Backspace"
];

// window navigator

function gotoHelp () {
    window.location.href = 'rules.html';
}

// eventListener for keydown action, can be used for implementation for keyboard on screen.

document.body.addEventListener("keydown", (ev) => {
    if(keys.includes(ev.key))
    {
        if(gridIndex <= 29) {
            if(ev.key === "Backspace") {    // Backspace was pressed
                if(gridIndex !== hold) {
                    gridIndex -= 1;
                    grids[gridIndex].innerHTML = "";
                    currWord.pop(ev.key);
                    console.log("Backspace");
                }
            } 
            else if(ev.key === "Enter") {       // Enter was pressed
                if(tryShifter.includes(gridIndex)) {
                    console.log("Enter is being processed");
                    pastWords.push(currWord.join(''));      // creates string and inputs into past words. Need to add logic to see if this word is valid in the English dictionary
                    currWord.splice(0, currWord.length);    // resets current word
                    console.log(pastWords);
                    hold = tryShifter.shift();      // updates current try and applies to hold
                }
            } else if (!tryShifter.includes(gridIndex)) {   // other keys
                grids[gridIndex].innerHTML = ev.key;
                gridIndex += 1;
                currWord.push(ev.key);
                console.log(ev.key, gridIndex - 1);
            }
        }

    }
})

