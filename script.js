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

function updateDisplay(displayNum)
{
    display.textContent = displayNum;
}

function pressNum(e, entering, button){
    const pressedNum = button.id.substring(5);
    if(entering == 'currNum')
    {
        currNum += pressedNum;
        updateDisplay(currNum);
    }
    else {
        newNum += pressedNum;
        updateDisplay(newNum);
    }
    prevPressedType = button.id.substring(0,5);
}

function pressOpt(e){
    const pressedOpt = this.id.substring(3);
    if(prevPressedType != 'opt'){
        if(newNum == null)
        {
            newNum = "0";
            entering = 'newNum';
        }
        else
        {
            currNum = operate(currOpt,currNum,newNum);
            updateDisplay(currNum);
            newNum = "0";
        }
    }
    currOpt = pressedOpt;
    prevPressedType = this.id.substring(0,3);
}

function equate(e){
    prevPressedType = this.id.substring(0,5);
}


let currNum = "0", newNum = null, currOpt = null;
let entering = 'currNum';
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
    digitButton.addEventListener('click',(event)=>{
        pressNum(event,entering,digitButton);
    });
});
optButtons.forEach(optButton => {
    optButton.addEventListener('click',pressOpt);
});
equalBtn.addEventListener('click',equate);

updateDisplay("0");
