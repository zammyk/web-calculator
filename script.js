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
        case '+':
            result = add(num1,num2);
            break;
        case '-':
            result = subtract(num1,num2);
            break;
        case '*':
            result = multiply(num1,num2);
            break;
        case '/':
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
    const pressedNum = this.id.substring(5);
    currNum+=pressedNum;
    updateDisplay();
}

let currNum = "";

const display = document.getElementById('display');
const digitButtons = Array.from(document.querySelectorAll('button')).filter(button => {
    return button.id.substring(0,5) == 'digit';
});

digitButtons.forEach(digitButton => {
    digitButton.addEventListener('click',pressNum);
});
