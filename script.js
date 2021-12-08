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

let numberOne = null;
let numberTwo = null;
let operation = '';
let display = document.querySelector('.current-display');
let displayHistory = document.querySelector('.history-display');
let calculations = [];
let isFirst = true;

function operate(firstNumber, secondNumber, operation) {
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
        firstNumber = takeScreen();
        resetDisplay();
        isFirst = false;
    } else {
        secondNumber = takeScreen()
        operate(firstNumber, secondNumber, operation);
        updateDisplays()
        firstNumber = takeScreen()
    }
}

function clearScreen() {
    display.textContent = 0;
    displayHistory.textContent = '-';
    display.style.fontSize = '50px';
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
   return Number(display.textContent)
}

function resetDisplay() {
    display.textContent = 0
}

function addToDisplay(e) {

    switch (e.target.textContent) {
        case 'Clear':
            clearScreen();
            break;
        case 'Delete':
            deleteLast();
            break;
        case '+':
            operation = 'add';
            evaluate()         
            break;
        case '-':
            operation = 'substract';
            evaluate();
            break;
        case 'x':
            operation = 'multiply';
            evaluate()
            break;
        case '÷':
            operation = 'divide';
            evaluate()
            break;
        case '=':
            evaluate();
            isFirst = true;
            break;
        default:
            try {
                if (display.textContent == calculations[0].result) {
                    resetDisplay()
                }
            } catch(err) {
                console.log(err)
            }
            
            if (display.textContent == 0) {
                display.textContent = e.target.innerText    
            } else {
                if (display.textContent.length >= 18) {
                    break
                }
                if (display.textContent.length == 9) {
                    display.style.fontSize = '25px'
                }
                
                display.textContent += e.target.innerText
            }
    }
}

listenForPress();