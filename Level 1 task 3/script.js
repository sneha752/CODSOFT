const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");
const calculator = document.querySelector(".calculator");
const themeToggle = document.getElementById("toggle-theme");

let currentInput = "";

function toRadians(deg) {
  return deg * Math.PI / 180;
}

function handleScientificFunctions(expr) {
  try {
    // Remove extra spaces
    expr = expr.replace(/\s+/g, '');

    // Match and replace scientific functions
    expr = expr.replace(/sin\(([^)]+)\)/gi, (_, val) => Math.sin(toRadians(parseFloat(val))).toFixed(5));
    expr = expr.replace(/cos\(([^)]+)\)/gi, (_, val) => Math.cos(toRadians(parseFloat(val))).toFixed(5));
    expr = expr.replace(/tan\(([^)]+)\)/gi, (_, val) => Math.tan(toRadians(parseFloat(val))).toFixed(5));
    expr = expr.replace(/sqrt\(([^)]+)\)/gi, (_, val) => Math.sqrt(parseFloat(val)).toFixed(5));

    // Evaluate final result
    return eval(expr).toFixed(5);
  } catch {
    return "Error";
  }
}


buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "C") {
      currentInput = "";
      display.value = "";
    } else if (value === "=") {
      const result = handleScientificFunctions(currentInput);
      display.value = `${currentInput} = ${result}`;
      currentInput = result;
    } else if (["sin", "cos", "tan", "sqrt"].includes(value)) {
      currentInput += `${value}(`;
      display.value = currentInput;
    } else if (value === "^") {
      currentInput += "**";
      display.value = currentInput;
    } else {
      currentInput += value;
      display.value = currentInput;
    }
  });
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  if ((e.key >= 0 && e.key <= 9) || ["+", "-", "*", "/", ".", "(", ")"].includes(e.key)) {
    currentInput += e.key;
    display.value = currentInput;
  } else if (e.key === "Enter") {
    const result = handleScientificFunctions(currentInput);
    display.value = `${currentInput} = ${result}`;
    currentInput = result;
  } else if (e.key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
  } else if (e.key === "Escape") {
    currentInput = "";
    display.value = "";
  }
});

// Toggle dark mode
themeToggle.addEventListener("click", () => {
  calculator.classList.toggle("dark");
});
