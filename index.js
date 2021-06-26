class Calculator {
    constructor(prevTextContent, currTextContent) {
        this.previousOperandDisplay = prevTextContent;
        this.currentOperandDisplay = currTextContent;
        this.clear();
    }

    clear() {
        this.currentOperand = "";
        this.operation = undefined;
        this.previousOperand = "";
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    addNumber(number) {
        if (number == "." && this.currentOperand.toString().includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    selectOperation(operation) {
        if (this.operation != undefined) {
            this.compute();
        }
        if (this.currentOperand === "") return;
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        let calculation;
        const curr = parseFloat(this.currentOperand);
        const prev = parseFloat(this.previousOperand);
        if (isNaN(curr) || isNaN(prev)) return;
        switch (this.operation) {
            case "+":
                calculation = curr + prev;
                break;
            case "-":
                calculation = prev - curr;
                break;
            case "*":
                calculation = curr * prev;
                break;
            case "÷":
                calculation = prev / curr;
                break;
        }
        this.currentOperand = calculation;
        this.operation = undefined;
        this.previousOperand = "";
    }

    getFinalNumber(number) {
        const numStr = number.toString();
        const intPart = parseFloat(numStr.split(".")[0]);
        const fracPart = numStr.split(".")[1];
        let integerDisplay;
        if (isNaN(intPart)) {
            integerDisplay = "";
        } else {
            integerDisplay = intPart.toLocaleString("en", {
                maximumFractionDigits: 0,
            });
        }
        if (fracPart != undefined) {
            return `${integerDisplay}.${fracPart}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandDisplay.textContent = this.getFinalNumber(this.currentOperand);
        if (this.operation != undefined) {
            this.previousOperandDisplay.textContent = `${this.getFinalNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandDisplay.textContent = "";
        }
    }
}
const numbers = document.querySelectorAll("[data-number]");
const operations = document.querySelectorAll("[data-operation]");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const equalsButton = document.querySelector("[data-equals]");
const previousOperandDisplay = document.querySelector("[data-previous-operand]");
const currentOperandDisplay = document.querySelector("[data-current-operand]");

const calculator = new Calculator(previousOperandDisplay, currentOperandDisplay);

numbers.forEach(num => {
    num.addEventListener("click", () => {
        calculator.addNumber(num.innerHTML);
        calculator.updateDisplay();
    });
});

operations.forEach(num => {
    num.addEventListener("click", () => {
        calculator.selectOperation(num.innerHTML);
        calculator.updateDisplay();
    });
});

clearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
});

equalsButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
});

window.addEventListener(
    "keydown",
    e => {
        numbers.forEach(num => {
            if (e.key == num.innerHTML) {
                calculator.addNumber(num.innerHTML);
                calculator.updateDisplay();
                num.classList.add("active");
            }
        });
        operations.forEach(num => {
            if (e.key == num.innerHTML) {
                calculator.selectOperation(num.innerHTML);
                calculator.updateDisplay();
                num.classList.add("active");
            }
        });
        switch (e.key) {
            case "/":
                calculator.selectOperation("÷");
                calculator.updateDisplay();
                operations[0].classList.add("active");
                break;
            case ",":
                calculator.addNumber(".");
                calculator.updateDisplay();
                numbers[10].classList.add("active");
                break;
            case "Enter":
                calculator.compute();
                calculator.updateDisplay();
                equalsButton.classList.add("active");
                break;
            case "Backspace":
                calculator.delete();
                calculator.updateDisplay();
                deleteButton.classList.add("active");
                break;
            case "Delete":
                calculator.clear();
                calculator.updateDisplay();
                clearButton.classList.add("active");
                break;
        }
    },
    false
);

window.addEventListener(
    "keyup",
    e => {
        numbers.forEach(num => {
            if (e.key == num.innerHTML) {
                num.classList.remove("active");
            }
        });
        operations.forEach(num => {
            if (e.key == num.innerHTML) {
                num.classList.remove("active");
            }
        });
        switch (e.key) {
            case "/":
                operations[0].classList.remove("active");
                break;
            case ",":
                numbers[10].classList.remove("active");
                break;
            case "Enter":
                equalsButton.classList.remove("active");
                break;
            case "Backspace":
                deleteButton.classList.remove("active");
                break;
            case "Delete":
                clearButton.classList.remove("active");
                break;
        }
    },
    false
);
