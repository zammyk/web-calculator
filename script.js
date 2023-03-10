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
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
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

function fixNumberFormat(num){
    num = String(num);
    while(num.length >1 && num.charAt(0)=='0')
        num = num.substring(1);
    return num;
}

function fixFloatFormat(num){
    num = String(num);
    const dotCount = Array.from(num).reduce((total,char)=>{return char == '.'?total+1:total;},0);
    if(dotCount > 1)
        num = num.substring(0,num.length-1);
    return num;
}

function updateDisplay(displayNum)
{
    displayNum = fixNumberFormat(displayNum);
    displayNum = fixFloatFormat(displayNum);
    display.textContent = displayNum;
    return displayNum;
}

function pressNum(e, entering, button){
    const pressedNum = button.id == 'optDot'? '.':button.id.substring(5);
    if(entering == 'currNum')
    {
        currNum += pressedNum;
        currNum = updateDisplay(currNum);
    }
    else {
        newNum += pressedNum;
        newNum = updateDisplay(newNum);
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
    if(prevPressedType != 'equal' && currOpt!=null){
        currNum = operate(currOpt,currNum,newNum);
        updateDisplay(currNum);
        entering = 'currNum';
        newNum = null;
        currOpt = null;
    }
    prevPressedType = this.id.substring(0,5);
}

function resetValues(e){
    currNum = "0";
    newNum = null;
    currOpt = null;
    entering = 'currNum';
    prevPressedType = null;
    updateDisplay("0");
}

function deleteValue(e){
    if(entering=='currNum')
    {
        currNum = String(currNum).substring(0,currNum.length-1);
        if(currNum.length == 0)
            currNum = "0";
        updateDisplay(currNum);
    }
    else
    {
        newNum = String(newNum).substring(0,newNum.length-1);
        if(newNum.length == 0)
            newNum = "0";
        updateDisplay(newNum);
    }
}


let currNum = "0";
let newNum = null;
let currOpt = null;
let entering = 'currNum';
let prevPressedType = null;

const display = document.getElementById('display');
const digitButtons = Array.from(document.querySelectorAll('button')).filter(button => {
    return button.id.substring(0,5) == 'digit' || button.id == 'optDot';
});
const optButtons = Array.from(document.querySelectorAll('button')).filter(button => {
    return button.id.substring(0,3) == 'opt' && button.id != 'optDot';
});
const equalBtn = document.getElementById('equalBtn');
const clearBtn = document.getElementById('clearBtn');
const deleteBtn = document.getElementById('deleteBtn');


digitButtons.forEach(digitButton => {
    digitButton.addEventListener('click',(event)=>{
        pressNum(event,entering,digitButton);
    });
});
optButtons.forEach(optButton => {
    optButton.addEventListener('click',pressOpt);
});
equalBtn.addEventListener('click',equate);
clearBtn.addEventListener('click',resetValues);
deleteBtn.addEventListener('click',deleteValue);

resetValues(null);
