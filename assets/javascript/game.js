//GLOBAL VARIABLES
//================================================================
var wordBank = ['balrog', 'blanka', 'cammy', 'chun li', 'deejay', 'dhalsim', 'ehonda', 'fei long', 'guile', 'ken', 'm bison', 'ryu', 'sagat', 't hawk', 'vega', 'zangief'];
var wins = 0;
var randWord = '';
var guessesLeft = randWord.length + 3;
var underScore = [];
var userGuess = [];
var userWrongGuess = [];

//FUNCTIONS
//=================================================================
//This function will be used to start game and reset counters/arrays
function main() {

     //Choose a word at random from wordBank.
     randWord = wordBank[Math.floor(Math.random() * wordBank.length)];
     console.log(randWord)

    //These variables will be reset to their original value after win/loss.
    guessesLeft = randWord.length + 3;
    userGuess = [];
    userWrongGuess = [];
    underScore = [];

    //Create underscores based on length of random word with for loop.
    for (var i = 0; i < randWord.length; i++) 
    {
        //This if/else statement will make sure spaces in wordBank do not get underscore value.
        if (randWord[i] === " ")
        {
            underScore.push(" ");
        }
        else {
            underScore.push("_");
        }
    }
    //Push changes from js to html.
    document.getElementById("guessesRemaining").textContent = guessesLeft;
    //.join used make array index appear as a string in html
    document.getElementById("currentWord").textContent = underScore.join('');
    document.getElementById("wrongGuess").textContent = userWrongGuess;
    document.getElementById("gameWins").textContent = wins;
}

//This function will be used to compare userGuess to randWord.
function compareUserInput(letter) {
    console.log(letter);
    //This if statement will make sure that letters pressed more than once in a round won't count against user.
    if (userGuess.indexOf(letter) === -1)
    {
        //If letter chosen is not in userGuess array, push letter into userGuess.
        userGuess.push(letter);
        //Use For loop to check if index of randWord matches letter input choosen.
        for (var i = 0; i < randWord.length; i++)
        {
            //Convert user input to lowercase incase they use capital letters.
            if(randWord[i] === letter.toLowerCase())
            {
                //If index of underScore matches letter user inputs, then change value of underscore to letter of random assigned word.
                underScore[i] = randWord[i];
            }
        }
        //Push changes from js to html.
        document.getElementById("currentWord").textContent = underScore.join('').toUpperCase();
        //Run next function to make changes based on wrong guesses by user.
        wrongGuess(letter);
    }
}

//This function will be used if userGuess does not match randWord
function wrongGuess(letter)
{
    //Need to make sure lowercase and uppercase value of userGuess is treated the same.
    if (underScore.indexOf(letter.toLowerCase()) === -1 
        && 
        underScore.indexOf(letter.toUpperCase()) === -1
        ) 
    {
        //Decrease user guesses by one.
        guessesLeft--;
        //Push wrong guess into array.
        userWrongGuess.push(letter);
        //Push changes from js to html.
        document.getElementById("wrongGuess").textContent = userWrongGuess.join(' ').toUpperCase();
        document.getElementById("guessesRemaining").textContent = guessesLeft;
    }
    //Run next function to determine win or loss condition.
    checkWinLoss();
}

//This function checks whether we meet our win or loss condition.
function checkWinLoss() {
    //If randWord matches values of underScore after being converted to userGuess, give user a win.
    //.join used to treat underScore array as a string.
    if (randWord.toLowerCase() === underScore.join('').toLowerCase())
    {
        wins++;
        document.getElementById("gameWins").textContent = wins;
        main();
    }
    //If user guesses drops to 0 reset game.
    else if (guessesLeft === 0) {
        main();
    }
}

//Onkeyup function will pass to letter input argument to compareUserInput parameter.
document.onkeyup = function(event) {
    //Only stores values from A to Z
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        compareUserInput(event.key);
    }
}

// Run main function
main()