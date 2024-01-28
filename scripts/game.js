let wordle; // word for game

var grids = document.querySelectorAll(".grid-element"); // DOM for class of grid-element

let hold = 0;   // used for backspace

let gridIndex = 0;  // grid index

// keeps track of tries. try number * 5 for the specific index

let tryShifter = [5, 10, 15, 20, 25];

let word;

let status;

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
    processKey(ev.key);
})

function processKey(letter) {
    if(keys.includes(letter))
    {
        if(gridIndex <= 29) {
            if(letter === "Backspace") {    // Backspace was pressed
                if(gridIndex !== hold) {
                    gridIndex -= 1;
                    grids[gridIndex].innerHTML = "";
                    currWord.pop(letter);
                    console.log("Backspace");
                }
            } 
            else if(letter === "Enter") {       // Enter was pressed
                word = word = currWord.join('');

                checkWord(word);

            } else if (!tryShifter.includes(gridIndex)) {   // other keys
                grids[gridIndex].innerHTML = letter;
                gridIndex += 1;
                currWord.push(letter);
                console.log(letter, gridIndex - 1);
            }
        }

    }
}

function enterProcess (isWord) {
    if(tryShifter.includes(gridIndex)) {
        
        console.log("Enter is being processed");

        if(isWord) {       // change because this is an async function.

            if(!pastWords.includes(word)) {

                compareWordle(word);

                pastWords.push(word);                   // creates string and inputs into past words. Need to add logic to see if this word is valid in the English dictionary
                currWord.splice(0, currWord.length);    // resets current word
                console.log(pastWords);
                hold = tryShifter.shift();              // updates current try and applies to hold
                console.log(word, "is new");

            } else {
                alert(`${word} has already been used`);
            }
        } else {
            alert(`${word} isn't a word`);
        }
    }
}

function compareWordle (currWord) {     // need to fix because it doesn't take into account double letters.

    for(let i = 0; i < currWord.length; i++) {
        if(wordle.includes(currWord[i]) && wordle[i] === currWord[i]) {

            // change color of grid background to green
            grids[i + hold].style.backgroundColor = '#6ca965';


        } else if(wordle.includes(currWord[i])) {

            // change color of grid background to yellow
            grids[i + hold].style.backgroundColor = '#c8b653';

        } else {

            // change color of grid background to a little darker than grid square.
            grids[i + hold].style.backgroundColor = '#383535';

        }
    }
}

async function startGame() {      // fetches random word api with length of 5, saves it to global variable

    const endpoint = new URL(`https://random-word-api.vercel.app/api?length=5`);
    
    try {
        const response = await fetch(endpoint);

        if(!response.ok) {
            throw new Error('API request failed');
        }
        const data = await response.json();
        wordle = data[0];
        console.log(wordle);
        checkWord(wordle);
    } catch (error) {
        console.error(error);
    }
}
    

async function checkWord(word) {
    
    console.log(word);
    const endpoint = new URL(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    const response = await fetch(endpoint)
    if(!response.ok) {
        console.log("Not a word");
        status =  false;
    } else {
        const data = await response.json();

        console.log("Is a word");
    
        status = true;
    }

    enterProcess(status);
    
}

startGame();          // Required to start game to put wordle in variable