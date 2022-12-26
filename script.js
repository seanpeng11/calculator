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
digits.forEach(function(digit) {
    digit.addEventListener("click", function() {
        if (digit.textContent === "." && currentNumber.includes(".")) {
            return;
        }
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
clear.addEventListener("click", () => {
    currentNumber = "";
    currentNumberDisplayed.textContent = "";
});
del.addEventListener("click", () => {
    currentNumber = currentNumber.slice(0, -1);
    currentNumberDisplayed.textContent = currentNumber;
});

const operators = document.querySelectorAll(".operator");
let currentOperator;
let storedNumber = 0;
operators.forEach(function(operator) {
    operator.addEventListener("click", function() {
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