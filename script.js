// Creating initial variables
const display = document.querySelector('#display');
const numbers = document.querySelectorAll('.numberButton');
const clear = document.querySelector('#clear');
const operators = document.querySelectorAll('.operatorButton');
const del = document.querySelector('#delete');
const buttons = Array.from(document.getElementsByTagName('button'));

let displayValue='';
let summed = false;
let lastButton = '';
let sum = {  
    numberOne: "",
    numberTwo: "",
    operatorSign: ""
};



// Adding initial event listeners
buttons.forEach(element => element.addEventListener('click', buttonClicked));
numbers.forEach(element => element.addEventListener('click', numberClicked));
operators.forEach(element => element.addEventListener('click', operatorClicked));
clear.addEventListener('click', clearDisplay);
del.addEventListener('click', deleteDigit);
document.addEventListener('keydown', keyboardCheck)

// Keyboard functionality 
function keyboardCheck(e){
    e.preventDefault();
    let keyPressed = e.key;
    console.log(keyPressed);
    if (keyPressed == 'Enter') keyPressed = '=';
    if ((keyPressed >= 0 && keyPressed <= 10) || keyPressed == '.'){
        lastButton = keyPressed;
        let number = keyPressed;
        buttonClicked(number);
        console.log(number);
        keyboardNumberClicked(number);
    }
    else if (keyPressed == '/' || keyPressed == '*' || keyPressed == '-' || keyPressed == '+' || keyPressed == '='){
        if ((keyPressed != '=') && (lastButton == '/' || lastButton == '*' || lastButton == '-' || lastButton == '+')){
            if (summed == true){
                sum.numberOne = displayValue;
            }
            displayValue = sum.numberOne;
            //sum.numberOne ='';
            //sum.operatorSign ='';
        }
        
        lastButton = keyPressed;
        buttonClicked(keyPressed);
        keyboardOperatorClicked(keyPressed);
    }
    else if (keyPressed == 'Backspace'){
        deleteDigit();
    }
    else if (keyPressed == 'Escape'){
        clearDisplay();
    }
}

function keyboardOperatorClicked(key){
    if (key == '=' || key == 'Enter'){
        equalClicked();
    }
    else if (sum.operatorSign != ''){
        multiOperator(key);
    }
    else {
        singleOperator(key);
    }
}

function keyboardNumberClicked(number){
    if (summed == true) displayValue = '';
    if (number== "." ){
        console.log(displayValue.indexOf('.'));
        if (displayValue.indexOf('.') != -1) return;
    }
    summed = false;
    displayValue = displayValue + number;
    displayNumber();
}

// Function for when each button is clicked
function buttonClicked(key){
    buttons.forEach(button =>button.classList.remove('clicked'));
    if (this.value == null){
        console.log(`b${key}`);
        if(`b${key}` == 'bEnter'){
            document.getElementById('b=').classList.add('clicked');
            return;
        } 
        document.getElementById(`b${key}`).classList.add('clicked');
        return;
    }
    this.classList.add('clicked');
    return;
}

// Function to clear display and memory
function clearDisplay(){
    console.log('Clearing memory');
    displayValue = '';
    sum.numberOne = '';
    sum.numberTwo = '';
    sum.operatorSign = '';
    displayNumber();
    buttons.forEach(button =>button.classList.remove('clicked'));
}

function deleteDigit(){
    if (summed == true) {
        clearDisplay();
    };
    if (displayValue == '') return;
    displayValue = displayValue.slice(0, -1);
    displayNumber();
    buttons.forEach(button =>button.classList.remove('clicked'));   
}

// Function when any operator is clicked
function operatorClicked(){
    if ((this.value != '=' ) && (lastButton == '/' || lastButton == '*' || lastButton == '-' || lastButton == '+')){
        if (summed == true){
            sum.numberOne = displayValue;
        }
        displayValue = sum.numberOne;
        sum.numberOne ='';
        sum.operatorSign ='';
    }
    if (this.value == '='){
        equalClicked();
    }
    else if (sum.operatorSign != ''){
        lastButton = this.value;
        multiOperator(this.value);
    }
    else {
        singleOperator(this.value);
        lastButton = this.value;
    }
}

function equalClicked(){
    if (sum.numberTwo == ''){
        if (sum.numberOne == '') {
            buttons.forEach(button =>button.classList.remove('clicked'));
            return;
        }
        if (displayValue == ''){
            sum.numberTwo = sum.numberOne;
        }
        else{
            sum.numberTwo = displayValue;
        }
    };
    displayValue = operate(sum.numberOne, sum.numberTwo, sum.operatorSign);
    displayNumber();
    
}

function multiOperator(element){
    sum.numberOne = operate(sum.numberOne, displayValue, sum.operatorSign);
    sum.operatorSign = element;
    displayValue = '';
}

function singleOperator(element){
    sum.numberOne = displayValue;
    sum.operatorSign = element;
    displayValue = '';
}

// Function when a number is clicked
function numberClicked(){
    lastButton = this.value;
    if (summed == true) displayValue = '';
    if (this.value == "." ){
        console.log(displayValue.indexOf('.'));
        if (displayValue.indexOf('.') != -1){
            return;
        }
    }
    summed = false;
    displayValue = displayValue + this.value;
    displayNumber();
}

// To display the current value onto the screen
function displayNumber(){
    if (displayValue.length > 10) return;
    display.innerText = displayValue;
    return;
}

// Math functions
function add(a,b){
    console.log("Adding numbers together");
    return parseFloat(a) + parseFloat(b);
}

function multiply(a,b){
    console.log("Multiplying numbers together");
    return parseFloat(a) * parseFloat(b);
}

function subtract(a,b){
    console.log("Subtracting numbers together");
    return parseFloat(a) - parseFloat(b);
}

function divide(a,b){
    console.log("Diving numbers together");
    return parseFloat((parseFloat(a) / parseFloat(b)).toFixed(2));
}

// To operate on two numbers
function operate(a, b, operator){
    console.log(`Calculating answer: ${a} ${b} ${operator}`);
    let ans;
    sum.numberOne = '';
    sum.numberTwo = '';
    sum.operatorSign = '';
    summed = true;
    switch (operator){
        case '+':
            return add(a,b);
        case '*':
            return multiply(a,b);
        case '-':
            return subtract(a,b);
        case '/':
            if (b == 0){
                return "Infinity";
            }
            return divide(a,b);
    }
}
