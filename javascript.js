let result = 0;
let displayValue = '';
let displayHistory = '';
//0 = neutral, 1 = addition, 2 = subtraction, 3 = multiplication, 4 = division
let operation = 0;
let operationSign = '';
//0 = starting state, 1 = first value entered, operation decided, 2 = operation executed
let primed = 0;
let firstOperand = '';
let secondOperand = '';

function addition (a, b) {
    result = Math.round((a + b) * 1000) / 1000;
}

function subtraction (a, b) {
    result = Math.round((a - b) * 1000) / 1000;
}

function multiplication (a, b) {
    result = Math.round((a * b) * 1000) / 1000;
}

function division (a, b) {
    if (b == 0) {
        result = 'You can\'t divide by zero! Do over or you\'ll be sorry!';
    } else {
        result = Math.round((a / b) * 1000) / 1000;  
    }

}

function operator (firstOperand, secondOperand, operation) {
    if (operation == 1) {
        addition (firstOperand, secondOperand);
    } else if (operation == 2) {
        subtraction (firstOperand, secondOperand);;
    } else if (operation == 3) {
        multiplication (firstOperand, secondOperand);;
    } else if (operation == 4) {
        division (firstOperand, secondOperand);
    }
    document.getElementById("display-current").innerHTML = result;
    document.getElementById("display-history").innerHTML = displayHistory + displayValue + ' =';
    displayValue = result;
    displayHistory = document.getElementById("display-history").innerHTML;
}

function writeDisplay (singleValue) {
    if ((displayValue == '0') && (singleValue == 0)) {
        return;
    } else if (((displayValue.includes('.') == true) && (checkDecimals (displayValue))) > 2) {
        return;
    } else if ((displayValue == '0') && (singleValue != 0)) {
        displayValue = singleValue;        
    } else {
        displayValue += singleValue;
    }

    document.getElementById("display-current").innerHTML = displayValue;
}

function addDecimal () {
    if (displayValue.includes ('.')) {
        return;
    } else  if (displayValue == '') {
        displayValue = '0.';
    } else {
        displayValue += '.';
    }
    document.getElementById("display-current").innerHTML = displayValue;
}

function negativize () {
    if (displayValue.charAt(0) != '-') {
        displayValue = '-' + displayValue;
    } else if (displayValue.charAt(0) == '-') {
        displayValue = displayValue.substring(1);
    }
    document.getElementById("display-current").innerHTML = displayValue;
}

function checkDecimals (a) {
    let position = displayValue.indexOf('.');
    let decimals = displayValue.substring(position + 1);
    return decimals.length;    

}

function cancelNumber () {
    if (displayValue != '') {
        displayValue = displayValue.substring(0, displayValue.length - 1);
        document.getElementById("display-current").innerHTML = displayValue;
    } else {
        return;
    }
}

function clearAll () {
    result = 0;
    operation = 0;
    operationSign = '';
    primed = 0;
    firstOperand = '';
    secondOperand = '';
    displayValue = '';
    document.getElementById("display-current").innerHTML = displayValue;
    displayHistory = '';
    document.getElementById("display-history").innerHTML = displayHistory;
}

function writeHistorical () {
    chooseSign ();
    displayHistory = displayValue + operationSign;
    document.getElementById("display-history").innerHTML = displayHistory;
}

function chooseSign () {
    if (operation == 1) {
        operationSign = ' + ';
    } else if (operation == 2) {
        operationSign = ' - ';
    } else if (operation == 3) {
        operationSign = ' x ';
    } else if (operation == 4) {
        operationSign = ' ÷ ';
    }
}

function chooseOperation (a) {
    if (a == 1) {
        operation = 1;
    } else if (a == 2) {
        operation = 2;
    } else if (a == 3) {
        operation = 3;
    } else if (a == 4) {
        operation = 4;
    }
}

function saveOperand () {
    if (primed == 0) {
        firstOperand = +displayValue;  
    } else if (primed == 1) {
        secondOperand = +displayValue;
    }

}

function changeOperation (a) {
    chooseOperation (a);
    chooseSign (a);
    displayHistory = displayHistory.substring(displayHistory, displayHistory.length - 3) + operationSign;
    document.getElementById("display-history").innerHTML = displayHistory;
}

function executeOperation (a) {
    if ((a != 0) && (operation == 0)) {
        if (displayValue == '') {
            return;
        } else {
        saveOperand ();
        chooseOperation (a);
        writeHistorical ();
        displayValue = '';
        document.getElementById("display-current").innerHTML = displayValue;
        primed = 1;
        }
    } else if ((a == 0) && (operation != 0)) {
        if (displayValue == '') {
            changeOperation (a);
        } else {
        saveOperand ();
        operator (firstOperand, secondOperand, operation);
        firstOperand = result;
        operation = 0;
        }

    } else if ((primed = 1) && (a != 0)) {
        if (displayValue == '') {
            changeOperation (a);
        } else {
            saveOperand ();
            operator (firstOperand, secondOperand, operation);
            firstOperand = result;
            chooseOperation (a);
            writeHistorical ();
            displayValue = '';
            document.getElementById("display-current").innerHTML = displayValue;
        }
    } else if ((a == 0) && (operation == 0)) {
        return;
    }
}

//setting up the keys
const key0 = document.querySelector('.key0');
key0.addEventListener('click', function () {writeDisplay ('0')});
const key1 = document.querySelector('.key1');
key1.addEventListener('click', function () {writeDisplay ('1')});
const key2 = document.querySelector('.key2');
key2.addEventListener('click', function () {writeDisplay ('2')});
const key3 = document.querySelector('.key3');
key3.addEventListener('click', function () {writeDisplay ('3')});
const key4 = document.querySelector('.key4');
key4.addEventListener('click', function () {writeDisplay ('4')});
const key5 = document.querySelector('.key5');
key5.addEventListener('click', function () {writeDisplay ('5')});
const key6 = document.querySelector('.key6');
key6.addEventListener('click', function () {writeDisplay ('6')});
const key7 = document.querySelector('.key7');
key7.addEventListener('click', function () {writeDisplay ('7')});
const key8 = document.querySelector('.key8');
key8.addEventListener('click', function () {writeDisplay ('8')});
const key9 = document.querySelector('.key9');
key9.addEventListener('click', function () {writeDisplay ('9')});
const keyCanc = document.querySelector('.keyCanc');
keyCanc.addEventListener('click', function () {cancelNumber ()});
const keyClear = document.querySelector('.keyClear');
keyClear.addEventListener('click', function () {clearAll ()});
const keyNeg = document.querySelector('.keyNeg');
keyNeg.addEventListener('click', function () {negativize ()});
const keyDecimal = document.querySelector('.keyDecimal');
keyDecimal.addEventListener('click', function () {addDecimal ()});

//setting up operator keys
const keyPlus = document.querySelector('.keyPlus');
keyPlus.addEventListener('click', function () {executeOperation (1)});
const keyMinus = document.querySelector('.keyMinus');
keyMinus.addEventListener('click', function () {executeOperation (2)});
const keyMultiplication = document.querySelector('.keyMultiplication');
keyMultiplication.addEventListener('click', function () {executeOperation (3)});
const keyDivision = document.querySelector('.keyDivision');
keyDivision.addEventListener('click', function () {executeOperation (4)});
const keyEqual = document.querySelector('.keyEqual');
keyEqual.addEventListener('click', function () {executeOperation (0)});

//setting up keyboard functionality
// let keyboard = document.body;
//         keyboard.addEventListener('keydown', (event) => {
//             if (`key=${event.key}` == 1) {
//                 writeDisplay ('1')
//             }
//         });

let keyboard = document.body;
        keyboard.addEventListener('keydown', (event) => {
            if (event.key == 0) {
                writeDisplay ('0');
            } else if (event.key == 1) {
                writeDisplay ('1');
            } else if (event.key == 2) {
                writeDisplay ('2');
            } else if (event.key == 3) {
                writeDisplay ('3');
            } else if (event.key == 4) {
                writeDisplay ('4');
            } else if (event.key == 5) {
                writeDisplay ('5');
            } else if (event.key == 6) {
                writeDisplay ('6');
            } else if (event.key == 7) {
                writeDisplay ('7');
            } else if (event.key == 8) {
                writeDisplay ('8');
            } else if (event.key == 9) {
                writeDisplay ('9');
            } else if ((event.key == 'Backspace') || (event.key == 'Delete')) {
                cancelNumber ();
            } else if (event.key == 'Escape') {
                clearAll ();
            } else if (event.key == 'Shift') {
                negativize ();
            } else if (event.key == '.') {
                addDecimal ();
            } else if (event.key == '+') {
                executeOperation (1);
            } else if (event.key == '-') {
                executeOperation (2);
            } else if (event.key == '/') {
                executeOperation (3);
            } else if (event.key == '*') {
                executeOperation (4);
            } else if (event.key == 'Enter') {
                executeOperation (0);
            }
        });