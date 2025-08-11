let operandOne;
let operandTwo;
let operator;
let shouldResetDisplay = false;

const display = document.querySelector(".display");

const digitButtons = document.querySelectorAll(".digit-btn");
digitButtons.forEach((button) =>
  button.addEventListener("click", (e) => inputDigit(e))
);

const equalBtn = document.querySelector("#equal-btn");
equalBtn.addEventListener("click", equals);

const operatorBtn = document.querySelectorAll(".operator");
operatorBtn.forEach((button) =>
  button.addEventListener("click", (e) => inputOperator(e))
);

const allClearBtn = document.querySelector("#all-clear");
allClearBtn.addEventListener("click", allClear);

function inputDigit(e) {
  if (shouldResetDisplay) {
    display.innerText = e.target.innerText;
    shouldResetDisplay = false;
  } else {
    display.innerText === "0"
      ? (display.innerText = e.target.innerText)
      : (display.innerText += e.target.innerText);
  }
}

function inputOperator(e) {
    if (operator && !shouldResetDisplay) {
      console.log("here");
      equals();
    }
    operandOne = Number(display.innerText)
    operator=e.target.innerText
  shouldResetDisplay = true;
}

function equals() {
    operandTwo= Number(display.innerText)
    result = operate(operandOne, operator, operandTwo);
    display.innerText=String(result)
  operandOne = result
    operandTwo = null;
    operator = null
    shouldResetDisplay= true
}

function operate(operandOne, operator, operandTwo) {
  switch (operator) {
    case "+":
      return add(operandOne, operandTwo);
    case "-":
      return subtract(operandOne, operandTwo);
    case "×":
      return multiply(operandOne, operandTwo);
    case "÷":
      return divide(operandOne, operandTwo);
  }
}

function allClear() {
  operandOne = null;
  operandTwo = null;
  operator = null;
  display.innerText = "0";
}

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
  if (b === 0) return "ERROR";
  return a / b;
}
