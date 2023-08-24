const result = document.getElementById("result");
const buttons = document.querySelectorAll(".buttons button");
const operators = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal");
const clearButton = document.querySelector(".clear");
const backspaceButton = document.querySelector(".backspace");

let currentInput = "";

buttons.forEach(button => {
    button.addEventListener("click", handleClick);
});

operators.forEach(operator => {
    operator.addEventListener("click", handleOperator);
});

equalButton.addEventListener("click", calculate);
clearButton.addEventListener("click", clear);
backspaceButton.addEventListener("click", handleBackspace);

document.addEventListener("keydown", handleKeyboardInput);

function handleKeyboardInput(e) {
    const key = e.key;

    if (key === "Enter") {
        calculate();
    } else if (key === "Escape") {
        clear();
    } else if (key === "Backspace") {
        handleBackspace();
    } else if (!isNaN(key) || key === ".") {
        updateInput(key);
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        handleOperatorKey(key);
    }
}

function handleClick(e) {
    const value = e.target.textContent;

    if (currentInput.includes("=")) {
        if (!isNaN(value) || value === ".") {
            currentInput = "";
        }
    }

    updateInput(value);
}

function handleOperator(e) {
    const value = e.target.textContent;
    handleOperatorKey(value);
}

function handleOperatorKey(value) {
    if (!endsWithOperator(currentInput)) {
        updateInput(` ${value} `);
    }
}

function updateInput(value) {
    currentInput += value;
    updateDisplay(currentInput);
}

function updateDisplay(value) {
    result.value = value;
}

function clear() {
    currentInput = "";
    updateDisplay("");
}

function handleBackspace() {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput);
    }
}

function calculate() {
    try {
        const sanitizedInput = currentInput.replace(/[^-()\d/*+.]/g, "");
        const answer = new Function("return " + sanitizedInput)();
        updateDisplay(answer);
        currentInput = answer.toString();
    } catch (error) {
        updateDisplay("Error");
    }
}

function endsWithOperator(input) {
    const operators = ["+", "-", "*", "/"];
    const lastCharacter = input.trim().slice(-1);
    return operators.includes(lastCharacter);
}
