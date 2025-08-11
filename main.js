let operandOne;
let operandTwo;
let operator;
let shouldResetDisplay = false;
let decimalIsClicked = false;
const MAX_DIGITS = 11;

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

const decimalBtn = document.querySelector("#decimal-btn");
decimalBtn.addEventListener("click", handleDecimalBtnClick);

function inputDigit(e) {
  if (shouldResetDisplay) {
    display.innerText = e.target.innerText;
    shouldResetDisplay = false;
  } else {
    const digits = display.innerText.replace(/[^0-9]/g, "").length;
    if (digits > MAX_DIGITS) return;
    display.innerText === "0"
      ? (display.innerText = e.target.innerText)
      : (display.innerText += e.target.innerText);
  }
}

function inputOperator(e) {
  if (operator && !shouldResetDisplay) {
    equals();
  }
  operandOne = Number(display.innerText);
  operator = e.target.innerText;
  shouldResetDisplay = true;
  decimalIsClicked = false;
}

function equals() {
  operandTwo = Number(display.innerText);
  if (!operandOne && !operator) return;
  result = operate(operandOne, operator, operandTwo);
  display.innerText = String(formatNumber(result));
  operandOne = result;
  operandTwo = null;
  operator = null;
  shouldResetDisplay = true;
  decimalIsClicked = false;
}

function operate(operandOne, operator, operandTwo) {
  switch (operator) {
    case "+":
      return add(operandOne, operandTwo);
    case "-":
      return subtract(operandOne, operandTwo);
    case "x":
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

function handleDecimalBtnClick(e) {
  if (decimalIsClicked) return;
  else {
    inputDigit(e);
    decimalIsClicked = true;
  }
}

function formatNumber(num) {
  const abs = Math.abs(num)
  if (abs !== 0 && (abs > 1e10 || abs < 1e-9)) {
    return num.toExponential(8)
  }
  return num
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
