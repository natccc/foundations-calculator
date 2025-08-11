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

const allClearBtn = document.querySelector("#allclear-btn");
allClearBtn.addEventListener("click", allClear);

const backspaceBtn = document.querySelector("#backspace-btn")
backspaceBtn.addEventListener("click", backspace)

const decimalBtn = document.querySelector("#decimal-btn");
decimalBtn.addEventListener("click", handleDecimalBtnClick);

const negationBtn = document.querySelector("#negation-btn")
negationBtn.addEventListener("click",negate)

function inputDigit(e) {
  if (shouldResetDisplay) {
    display.innerText = e.target.innerText;
    shouldResetDisplay = false;
  } else {
    const digits = display.innerText.replace(/[^0-9]/g, "").length;
    if (digits > MAX_DIGITS) return;
    display.innerText === "0" && e.target.innerText!=="."
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
  if (!operator) return;
  result = operate(operandOne, operator, operandTwo);
  display.innerText = String(formatNumber(result))
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

function negate() {
 display.innerText = -display.innerText
}

function allClear() {
  operandOne = null;
  operandTwo = null;
  operator = null;
  display.innerText = "0";
  decimalIsClicked=false
}

function backspace() {
  display.innerText= display.innerText.slice(0,-1)
}

function handleDecimalBtnClick(e) {
  if (decimalIsClicked) return;
  else {
    inputDigit(e);
    decimalIsClicked = true;
  }
}

function formatNumber(num) {
  if (!Number.isFinite(num)) return "ERROR"
  const abs = Math.abs(num)
  if (abs !== 0 && (abs > 1e10 || abs < 1e-9)) {
    return num.toExponential(6)
  }

  return Number(num.toPrecision(10))
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
  return a / b;
}
