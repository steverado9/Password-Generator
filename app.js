//Dom Elements
const resultEl = document.getElementById('result'); //get the result element
const lengthEl = document.getElementById('length'); //get the password length element
const upperCaseEl = document.getElementById('uppercase'); //get the uppercase element
const lowerCaseEl = document.getElementById('lowercase'); //get the lowercase elemrnt
const numbersEl = document.getElementById('numbers'); //get the numbers element
const symbolsEl = document.getElementById('symbols'); //get the symbols element
const generateEl = document.getElementById('generate'); //get the generate element button
const clipboardEl = document.getElementById('clipboard'); //get the clip board icon

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}


//Generate Event listener
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value; //putting the length of the password inside a variable
    const hasUpperCase = upperCaseEl.checked; //checking if the uppercase checkbox is checked
    const hasLowerCase = lowerCaseEl.checked; //checking if the lowercase checkbox is checked
    const hasSymbols = symbolsEl.checked; //checking if the symbols checkbox is checked
    const hasNumber = numbersEl.checked; //checking if the numbers check box is checked

    //calling the generatePassword function inside the result textcontent
    resultEl.innerText = generatePassword(hasLowerCase, hasUpperCase, hasSymbols, hasNumber, length);
})

//Copy password to clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea'); //create a textArea element
    const password = resultEl.innerText; //putting the content of the result element inside a varibale called password 

    if (!password) { //if not password (empty)  
        return; //stop the code
    }

    textarea.value = password; //password is put inside the textarea value
    document.body.appendChild(textarea); //append text area to body
    textarea.select(); //select the text field

    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard!'); //alert password copied to clipboard
})

//Generate Password function
const generatePassword = (lower, upper, symbol, number, length) => {

    let generatedPassword = ""; //initializing a variable called generated password with a value of empty string

    const typesCount = lower + upper + symbol + number; //checking for true values(how many checkbox is clicked)
    if (typesCount === 0) {
        return ""; //if no checkbox is clicked return empty string
    }

    const typesArr = [{ lower }, { upper }, { symbol }, { number }].filter //an array of object
        (
            item => Object.values(item)[0] //This method filters anything that is false, removes it from the array

        );

    for (let i = 0; i < length; i += typesCount) { // i = 0; 0 < 20; i = 4; 4 < 20
        for (const type of typesArr) { //lower upper symbol number 
            const funcName = Object.keys(type)[0]; //this method accesses the array of objects using the key 


            let result = randomFunc[funcName]();
            generatedPassword += result; //aB/1 bA.2 
        }
    }
    return generatedPassword.slice(0, length); // return generated password that is sliced to the length of the password
}


//function to generate password
function getRandomLower() {
    //String.fromCharCode() - this string object method generates certain characters based on their code 
    //Math.random() - generates random numbers between 0 and 1
    //Math.random() * 26 - beacause there are 26 letters of the alphabet
    //Math.floor()- rounds down a number to the nearest whole number
    //we use +97 cos lower case numbers start from 97
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97); //return random lowercase letters
}

function getRandomUpper() {
    //we use 65 beacuse uppercase numbers start from 65
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65); //returns random upper case letters
}

function getRandomNumber() {
    //we use 10 because we need number from 0-9
    //we use 48 because numbers start from 48 in the charcode
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48); //returns random numbers
}

function getRandomSymbol() {
    const symbols = "!@#$%^&*()[]_+|/><.,"; //variable holding a string of symbols
    return symbols[Math.floor(Math.random() * symbols.length)]; //returns random symbol

}





