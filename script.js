const display = document.querySelector('#display');
const numbers = document.querySelectorAll('.numberButton');
const clear = document.querySelector('#clear');
const operators = document.querySelectorAll('.operatorButton');
const buttons = Array.from(document.getElementsByTagName('button'));
buttons.forEach(element => element.addEventListener('click', buttonClicked));
numbers.forEach(element => element.addEventListener('click', numberClicked));
operators.forEach(element => element.addEventListener('click', operatorClicked));
clear.addEventListener('click', clearDisplay);
let displayValue='';
let summed = false;
function buttonClicked(){
    buttons.forEach(button =>button.classList.remove('clicked'));
    this.classList.add('clicked');
    return;
}

let sum = {  
    numberOne: "",
    numberTwo: "",
    operatorSign: ""
};

function clearDisplay(){
    displayValue ='';
    sum.numberOne = '';
    sum.numberTwo = '';
    sum.operatorSign = '';
    displayNumber();
    buttons.forEach(button =>button.classList.remove('clicked'));
}

function operatorClicked(){
    console.log(`Here: ${sum.operatorSign}`);
    if (this.value == '='){
        if (sum.numberTwo == ''){
            if (sum.numberOne == '') return;
            else{
                sum.numberTwo = displayValue;
            }
        };
        displayValue = operate(sum.numberOne, sum.numberTwo, sum.operatorSign);
        displayNumber();
        console.log(`Present: ${sum.numberOne}| ${sum.numberTwo}| sign: ${sum.operatorSign} || ${displayValue}`);
    }

    else if (sum.operatorSign != ''){
        if (sum.numberTwo == ''){
            sum.operatorSign = this.value;
            return;
        }
        console.log(`multi: ${sum.numberOne} |  ${displayValue}`);
        sum.numberOne = operate(sum.numberOne, displayValue, sum.operatorSign);
        sum.operatorSign = this.value;
        sum.numberTwo = '';
        displayValue = '';
        displayNumber();
    }

    else {
        sum.numberOne = displayValue;
        console.log(`TEST: ${sum.numberOne}`);
        if (sum.numberTwo != ''){
            sum.operatorSign = this.value;
            displayValue = operate(sum.numberOne, sum.numberTwo, sum.operatorSign);
            displayNumber();
        }
        else{
            sum.operatorSign = this.value;
            display.innerText = '';
        }
        displayValue = '';
    }
}

function numberClicked(){
    if (summed == true){
        displayValue = '';
    }
    summed = false;
    displayValue = displayValue + this.value;
    displayNumber();
}

function displayNumber(){
    console.log(`displaying: ${displayValue}`)
    display.innerText=displayValue;
    return;
}

function add(a,b){
    return parseFloat(a) + parseFloat(b);
}
function multiply(a,b){
    return parseFloat(a) * parseFloat(b);
}
function subtract(a,b){
    return parseFloat(a) - parseFloat(b);
}
function divide(a,b){
    return parseFloat((parseFloat(a) / parseFloat(b)).toFixed(2));
}


function operate(a, b, operator){
    console.log(`operating a: ${a} b: ${b} operator: ${operator}`);
    let ans;
    switch (operator){
        case '+':
            ans= add(a,b);
            break;
        case '*':
            ans = multiply(a,b);
            break;
        case '-':
            ans = subtract(a,b);
            break;
        case '/':;
            ans = divide(a,b);
            break;
    }
    // console.log(ans);
    sum.numberOne = '';
    sum.numberTwo = '';
    sum.operatorSign = '';
    summed = true;
    return ans;
}
