function add(num1,num2) {
    return num1+num2;
}

function subtract(num1,num2) {
    return num1-num2;
}

function multiply(num1,num2) {
    return num1*num2;
}

function divide(num1,num2) {
    return num1/num2;
}

function operate(operator,num1,num2){
    let result;
    switch(operator){
        case 'Add':
            result = add(num1,num2);
            break;
        case 'Subtract':
            result = subtract(num1,num2);
            break;
        case 'Multiply':
            result = multiply(num1,num2);
            break;
        case 'Divide':
            result = divide(num1,num2);
            break;
        default:
            result = undefined;
    }
    return result;
}

function updateDisplay()
{
    display.textContent = currNum;
}

function pressNum(e){
    prevPressedType = this.id.substring(0,5);
    const pressedNum = this.id.substring(5);
    currNum+=pressedNum;
    updateDisplay();
}

function pressOpt(e){
    prevPressedType = this.id.substring(0,3);
    const pressedOpt = this.id.substring(3);
}

function equate(e){
    prevPressedType = this.id.substring(0,5);
}


let currNum = "0";
let prevPressedType = null;

const display = document.getElementById('display');
const digitButtons = Array.from(document.querySelectorAll('button')).filter(button => {
    return button.id.substring(0,5) == 'digit' || button.id == 'dotBtn';
});
const optButtons = Array.from(document.querySelectorAll('button')).filter(button => {
    return button.id.substring(0,3) == 'opt';
});
const equalBtn = document.getElementById('equalBtn');


digitButtons.forEach(digitButton => {
    digitButton.addEventListener('click',pressNum);
});
optButtons.forEach(optButton => {
    optButton.addEventListener('click',pressOpt);
});
equalBtn.addEventListener('click',equate);
