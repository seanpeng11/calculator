function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}
function operate(oper, a, b) {
    switch (oper) {
        case "+": return add(a, b);
        case "-": return subtract(a, b);
        case "*": return multiply(a, b);
        case "/": return divide(a, b);
    }
}

const calcDisplay = document.querySelector(".calculator-display");
const digits = document.querySelectorAll(".digit");
const currentNumber = document.querySelector(".currentNumber");
digits.forEach(function(digit) {
    digit.addEventListener("click", function() {
        currentNumber.textContent += this.textContent;
    });
});