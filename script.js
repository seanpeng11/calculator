function add(a, b) {
    return round3(a + b);
}
function subtract(a, b) {
    return round3(a - b);
}
function multiply(a, b) {
    return round3(a * b);
}
function divide(a, b) {
    return round3(a / b);
}
function operate(oper, a, b) {
    switch (oper) {
        case "+": return add(a, b);
        case "-": return subtract(a, b);
        case "*": return multiply(a, b);
        case "/": return divide(a, b);
    }
}
const round3 = num => Math.round(num * 1000) / 1000;

const calcDisplay = document.querySelector(".calculator-display");
const digits = document.querySelectorAll(".digit");
const currentNumberDisplayed = document.querySelector(".currentNumber");
let currentNumber = "";

//Add digit clicked to display
digits.forEach(function(digit) {
    digit.addEventListener("click", function() {
        //Allow only one decimal point
        if (digit.textContent === "." && currentNumber.includes(".")) {
            return;
        }
        //Delete leading zeroes
        if (!currentNumber.includes(".")
            && currentNumber.charAt(0) === "0"
            && digit.textContent !== ".") {
            currentNumber = "";
        }
        currentNumber += this.textContent
        currentNumberDisplayed.textContent = currentNumber;
    });
});

const clear = document.getElementById("clear");
const del = document.getElementById("del");

//Clear display
clear.addEventListener("click", () => {
    currentNumber = "";
    currentNumberDisplayed.textContent = "";
});

//Delete last digit
del.addEventListener("click", () => {
    currentNumber = currentNumber.slice(0, -1);
    currentNumberDisplayed.textContent = currentNumber;
});

const operators = document.querySelectorAll(".operator");
let currentOperator;
let storedNumber = 0;

//Store previous number and operator
operators.forEach(function(operator) {
    operator.addEventListener("click", function() {
        //Allow operator chaining
        if (currentOperator !== undefined) {
            currentNumber = operate(currentOperator, +storedNumber, +currentNumber);
            currentNumberDisplayed.textContent = currentNumber;
        }
        currentOperator = operator.textContent;
        storedNumber = currentNumber;
        currentNumber = "";
    });
});

const equals = document.getElementById("equals");

//Update current number and display
equals.addEventListener("click", function() {
    if (currentOperator === undefined) return;
    if (currentOperator === "/" && +currentNumber === 0) {
        alert("You can't divide by 0!");
        return;
    }
    currentNumber = operate(currentOperator, +storedNumber, +currentNumber);
    currentNumberDisplayed.textContent = currentNumber;
    currentOperator = undefined;
});