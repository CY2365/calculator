/*
A display is needed. Digits are entered into the display with the keys.
After digits are entered operator is chosen and second set of digits are
entered. Next either '=' is chosen for the result or more operators and 
digits are chosen to continue calculation in the same order as before.
Clear button is used to clear the display and delete button is used to 
delete the last chosen number.

1. Choose number
2. Choose operator
3. Choose another number
4. If '=' is chosen, calculate and show result
5. If another operator is chosen, take last calculation and show on display
6. Use last result as first number
7. Choose another number
8. Repeat from 4th step
*/

let numberOne = '';
let numberTwo = '';
let operation = '';
let display = document.querySelector('.current-display');
let displayHistory = document.querySelector('.history-display');
let operators = document.querySelectorAll('.operators');
let minusButton = document.querySelector('.minus');
let addButton = document.querySelector('.add');
let multiplyButton = document.querySelector('.multiply');
let divideButton = document.querySelector('.divide');
let calculations = [];
let isFirst = true;
let resetNeeded = true;

function operate(firstNumber, secondNumber, operation) {
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);
    switch(operation) {
        case 'add':
            add(firstNumber, secondNumber);
            break;
        case 'substract':
            substract(firstNumber, secondNumber);
            break;
        case 'divide':
            divide(firstNumber, secondNumber);
            break;
        case 'multiply':
            multiply(firstNumber, secondNumber);
            break;
        default:
            console.log('defaulted operate function');
    }
}

function add(firstNumber, secondNumber) {  
    let calculation = {
        operation:  `${firstNumber} + ${secondNumber}`,
        result: firstNumber + secondNumber,
    };
    calculations.unshift(calculation)
}

function substract (firstNumber, secondNumber) {
    let calculation = {
        operation:  `${firstNumber} - ${secondNumber}`,
        result: firstNumber - secondNumber,
    };
    calculations.unshift(calculation)
}

function divide(firstNumber, secondNumber) {
    let calculation = {
        operation:  `${firstNumber} / ${secondNumber}`,
        result: firstNumber / secondNumber,
    };
    calculations.unshift(calculation)
}

function multiply (firstNumber, secondNumber) {
    let calculation = {
        operation:  `${firstNumber} * ${secondNumber}`,
        result: firstNumber * secondNumber,
    };
    calculations.unshift(calculation)
}

function updateDisplays () {
    display.textContent = calculations[0].result;
    if (display.textContent.length > 9) {
        display.style.fontSize = '25px'
        display.textContent = 
            Math.round((display.textContent.slice(0, 18)) * 10000000000)
            / 10000000000;
    } else {
        display.style.fontSize = '50px';
    }
    
    displayHistory.textContent = calculations[0].operation;
}

function listenForPress() {
    let allButtons = document.querySelectorAll('.buttons');
    allButtons.forEach(function(button){
        button.addEventListener('click', addToDisplay)
    });
}

function evaluate() {
    if (isFirst == true) {
        numberOne =display.textContent;
        isFirst = false;
        
    } else {
        numberTwo = display.textContent;
        operate(numberOne, numberTwo, operation);
        updateDisplays()
        numberOne = calculations[0].result;
        resetNeeded = true;
    }
}

function clearScreen() {
    display.textContent = 0;
    displayHistory.textContent = '-';
    display.style.fontSize = '50px';
    numberOne = '';
    numberTwo = '';
    isFirst = true;
    resetNeeded = true;
    operators.forEach((button) => {
        button.classList.remove('selected');
    });
}

function deleteLast() {
    if ( display.textContent == '' || display.textContent == 0 ||
        display.textContent.length == 1) {
        display.textContent = 0
    } else {
        display.textContent = display.textContent.slice(0, -1)
        if (display.textContent.length <= 9) {
            display.style.fontSize = '50px'
        }
    }
}

function takeScreen() {
   return display.textContent
}

function resetDisplay() {
    display.textContent = 0
}

function addToDisplay(e) {
    // checks if mouse or keyboard is sending event
    let toBeChecked = ''
    if (e.type == 'click') {
        toBeChecked = e.target.innerText;  
    } else if (e.type == 'keydown') {
        toBeChecked = e.key
    }
    
    // checks which button was clicked or pressed on keyboard
    switch (toBeChecked) {
        case 'Clear':
        case 'Escape':
            clearScreen();
            break;
        case 'Delete':
        case 'Backspace':
            deleteLast();
            break;
        case '+':
            addButton.classList.add('selected'); // highlights button
            if (isFirst == true) {
                operation = 'add';
            }
            evaluate()
            operation = 'add';
            break;
        case '-':
            minusButton.classList.add('selected');
            if (isFirst == true) {
                operation = 'substract';
            }
            evaluate();
            operation = 'substract';
            break;
        case 'x':
        case '*':
            multiplyButton.classList.add('selected');
            if (isFirst == true) {
                operation = 'substract';
            }
            evaluate()
            operation = 'multiply';
            break;
        case '÷':
        case '/':
            divideButton.classList.add('selected');
            if (isFirst == true) {
                operation = 'substract';
            }
            evaluate()
            operation = 'divide';
            break;
        case '=':
        case 'Enter':
            // if nothing is inserted the calculator does nothing
            if( numberOne === '' && numberTwo === '') {
                return
            }
            
            // if isFirst is false aka it's not the first operation
            if (!isFirst) numberTwo = display.textContent;
            operate(numberOne, numberTwo, operation);
            updateDisplays()
            numberOne = calculations[0].result;
            resetNeeded = true;
            isFirst = true;
            break;
        default:
            // removes highlights as soon as new number is clicked
            operators.forEach((button) => {
                button.classList.remove('selected');
            });
            
            if (!Number(toBeChecked) && toBeChecked != '.') {
                return
            } 
            if (display.textContent.includes('.') && toBeChecked == '.') {
                return
            }

            if (isFirst == false && resetNeeded == true) {
                resetDisplay();
                resetNeeded = false;
            }
            try {
                if (display.textContent == calculations[0].result) {
                    resetDisplay()
                }
            } catch(err) {
            }
            
            if (display.textContent == 0) {
                display.textContent = toBeChecked   
            } else {
                if (display.textContent.length >= 18) {
                    break
                }
                if (display.textContent.length == 9) {
                    display.style.fontSize = '25px'
                }
                display.textContent += toBeChecked;
        
            }
    }
}


listenForPress();
window.addEventListener('keydown', addToDisplay)