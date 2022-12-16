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
    console.log(ans);
    return ans;
}
(operate(5,7,'+'));
(operate(5,7,'*'));
(operate(5,7,'-'));
(operate(5,7,'/'));