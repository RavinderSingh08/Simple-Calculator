// @ts-nocheck
class Calculator {
  constructor(previousTextElement, currentTextElement) {
    this.previousTextElement = previousTextElement;
    this.currentTextElement = currentTextElement;
    this.clear();
  }

  clear() {
    this.current = "";
    this.previous = "";
    this.operation = undefined;
  }

  clearEntry() {
    this.current = "";
  }

  delete() {
    this.current = this.current.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.current.includes(".")) return;
    this.current = this.current.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.current === "") return;
    if (this.previous !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previous = this.current;
    this.current = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previous);
    const curr = parseFloat(this.current);
    if (isNaN(prev) || isNaN(curr)) return;

    switch (this.operation) {
      case "+":
        computation = prev + curr;
        break;
      case "-":
        computation = prev - curr;
        break;
      case "x":
        computation = prev * curr;
        break;
      case "*":
        computation = prev * curr;
        break;
      case "÷":
        computation = prev / curr;
        break;
      case "/":
        computation = prev / curr;
        break;
      case "%":
        computation = prev % curr;
        break;
      case "^":
        computation = Math.pow(prev, curr);
        break;

      default:
        return;
    }
    this.current = computation;
    this.operation = undefined;
    this.previous = "";
  }

  computeDiff(operation) {
    this.operation = operation;
    let computation;
    const curr = parseFloat(this.current);
    if (isNaN(curr)) return;

    switch (this.operation) {
      case "1/x":
        computation = 1 / curr;
        break;
      case "√":
        computation = Math.sqrt(curr);
        break;

      default:
        return;
    }
    
    this.current = computation;
    this.operation = undefined;
    this.previous = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentTextElement.innerText = this.getDisplayNumber(this.current);
    if (this.operation != null) {
      this.previousTextElement.innerText = `${this.getDisplayNumber(
        this.previous
      )} ${this.operation}`;
    } else {
      this.previousTextElement.innerText = "";
    }
  }
}

const body = document.querySelector("body");
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const extraOperationButtons = document.querySelectorAll(
  "[data-extra-operation]"
);
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const clearEntryButton = document.querySelector("[data-clear-entry]");
const previousTextElement = document.querySelector("[data-previous]");
const currentTextElement = document.querySelector("[data-current]");

const calculator = new Calculator(previousTextElement, currentTextElement);

numberButtons.forEach((button) => {
  button?.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

extraOperationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.computeDiff(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton?.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton?.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

clearEntryButton?.addEventListener("click", () => {
  calculator.clearEntry();
  calculator.updateDisplay();
});

deleteButton?.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

body.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "1":
      calculator.appendNumber(e.key);
      calculator.updateDisplay();
      break;
    case "2":
      calculator.appendNumber(e.key);
      calculator.updateDisplay();
      break;
    case "3":
      calculator.appendNumber(e.key);
      calculator.updateDisplay();
      break;
    case "4":
      calculator.appendNumber(e.key);
      calculator.updateDisplay();
      break;
    case "5":
      calculator.appendNumber(e.key);
      calculator.updateDisplay();
      break;
    case "6":
      calculator.appendNumber(e.key);
      calculator.updateDisplay();
      break;
    case "7":
      calculator.appendNumber(e.key);
      calculator.updateDisplay();
      break;
    case "8":
      calculator.appendNumber(e.key);
      calculator.updateDisplay();
      break;
    case "9":
      calculator.appendNumber(e.key);
      calculator.updateDisplay();
      break;
    case "0":
      calculator.appendNumber(e.key);
      calculator.updateDisplay();
      break;
    case ".":
      calculator.appendNumber(e.key);
      calculator.updateDisplay();
      break;
    case "Escape":
      calculator.clear();
      calculator.updateDisplay();
      break;
    case "Backspace":
      calculator.delete();
      calculator.updateDisplay();
      break;
    case "%":
      calculator.chooseOperation(e.key);
      calculator.updateDisplay();
      break;
    case "^":
      calculator.chooseOperation(e.key);
      calculator.updateDisplay();
      break;
    case "/":
      calculator.chooseOperation(e.key);
      calculator.updateDisplay();
      break;
    case "*":
      calculator.chooseOperation(e.key);
      calculator.updateDisplay();
      break;
    case "+":
      calculator.chooseOperation(e.key);
      calculator.updateDisplay();
      break;
    case "-":
      calculator.chooseOperation(e.key);
      calculator.updateDisplay();
      break;
    case "=":
      calculator.compute();
      calculator.updateDisplay();
      break;
    case "Enter":
      calculator.compute();
      calculator.updateDisplay();
      break;
    default:
      return;
  }
});
