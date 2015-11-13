// Hangman game

var io = require('./io'); // .io file - Credit to COMP1345 module leaders
var fs = require('fs'); // file system needed for reading from files

// Getting the file content in strings, splitting at every new line
var wordsList = fs.readFileSync('./words.txt','utf-8').toString().split("\n");

// Randomly selects a word from the list using math.random() function
var word = wordsList[Math.floor(Math.random()*wordsList.length)];

// Declaring an array which will keep the guessed letter
var guesses = [];

// Declaring a logical variable in the case the word was guessed
var wordGuessed = false;

// Creating an array containing the letters of the alphabet
var alpha = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "a", "t", "u", "v", "w", "x", "y", "z"];

// Getting the difficulty level from user
var difficulty = io.input("Please enter the maximum length of the word! ");

// Getting the maximum lives from user
var chances = io.input("Introduce the number of chances! ");


// This function builds up a "hidden-underscored word" by searching in the guesses array and in the word's letters
function hidden()
{
    var hiddenWord = ""; // Declaring an empty word
    for (var i = 0; i < word.length; i++) // Going through the word's letters
    {
        if (guesses.indexOf(word[i]) >= 0) // Looking for matching through the letters
            hiddenWord += word[i]; // If matches, reveals a letter
        else
            hiddenWord += "_ "; // If not, hides it
    }
    return hiddenWord; // Returning the underscored word
}

do {

    // Until the length of the random word is the same with the user settings
    while(word.length != difficulty)
        word = wordsList[Math.floor(Math.random()*wordsList.length)]; // Randomize the word

    var hiddenWord = hidden(); // Calling the function to build the word
    io.output(hiddenWord); // Outputting the underscored word, after a loop if guesses are done will reveal letters

    var guess = io.input("\nMake a guess and introduce a letter! "); // Getting the letter from user

    if(alpha.indexOf(guess) < 0) // Verifying if it's not a letter
    // If it's not, outputting warning message
        guess=io.input("\nYou entered an invalid character! Please only enter letters from a to z! Press Enter to continue!");

    if(guesses.indexOf(guess) >= 0) // Verifying if the letter was introduced before
    {
        io.output("\nYou entered the same letter more than one time! Please enter another one!"); // Outputting a warning message

        // If the letter is not present in the word and the user enter the same letter only take one life
        if(word.indexOf(guess) < 0)
            chances++;
    }

    guesses.push(guess); // Adding the letter in the letters array

    if (hiddenWord == word) // Verifying if the word was guessed at every loop - The whole word guess
    {
        io.output("Well done! You have guessed the entire word!"); // Outputting a greetings message
        wordGuessed = true; // Changing the value in true ends the game
    }
    else if (word.indexOf(guess) >= 0) // Verifying that the letter is present in the word - Guess
    {
        io.output("\nYou have guessed a letter! All " + chances + " chances left!");
        // Outputting a greetings message and the lives remain the same
    }
    else // If the letter is not present the word - Wrong
    {
        chances--; // Taking a life
        if(chances > 0) // If the lives didn't end - Continue with remaining lives
            io.output("\nYou are wrong and only got " + chances + " chances left!"); // Outputting a life update message
        else // If the lives end - Game Over
            io.output("\nGame Over! You used all your chances!"); // Outputting a game over message
    }


}while (!wordGuessed && chances != 0);
// In do-while the condition is denied
// I chose do-while because we don't know the exact number of loops


