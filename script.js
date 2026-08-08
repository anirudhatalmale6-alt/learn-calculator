/*
  Hello, coder! 👋 This is the JavaScript file — the "brain" of our calculator.
  HTML built the buttons and CSS made them pretty; JavaScript makes them DO things
  when you click them. Read along — each function has a friendly note explaining it.
*/

/*
  First, we grab the elements we need from the page.
  document.querySelector finds ONE element using a CSS-style selector.
  Here "#display" means "the element whose id is display".
  We store it in a variable so we can reuse it without searching again.
*/
const display = document.querySelector("#display");
const keypad = document.querySelector(".keypad");

/*
  These variables remember the calculator's "state" — what's going on right now.
    currentInput  → the number currently on screen (kept as text so "." works nicely)
    previousInput → the first number, saved when you pick an operator
    operator      → which operation you chose (add, subtract, multiply, divide)
    resetNext     → a flag: should the next digit start a fresh number?
  Keeping state in clearly-named variables makes the logic easy to follow.
*/
let currentInput = "0";
let previousInput = "";
let operator = null;
let resetNext = false;

/*
  A tiny helper function whose only job is to update what you see.
  Breaking small jobs into their own named functions keeps code readable —
  whenever we want to refresh the screen, we just call updateDisplay().
*/
function updateDisplay() {
  display.value = currentInput;
}

/*
  Adds a digit (or a decimal point) to the current number.
  Notice the small "rules" we handle:
    • if we just pressed = or an operator, start fresh
    • don't allow two dots in one number
    • replace a lone leading "0" so we don't get "05"
*/
function appendNumber(value) {
  if (resetNext) {
    currentInput = "";
    resetNext = false;
  }

  // Only one decimal point per number, please!
  if (value === "." && currentInput.includes(".")) {
    return;
  }

  if (currentInput === "0" && value !== ".") {
    // Replace the starting zero instead of stacking onto it.
    currentInput = value;
  } else {
    // "+=" adds the new character onto the end of the text.
    currentInput += value;
  }

  updateDisplay();
}

/*
  Runs when you press +, −, ×, or ÷.
  If a calculation is already waiting, we finish it first (so 2 + 3 + 4 works),
  then remember the new operator and the number, and get ready for the next one.
*/
function chooseOperator(nextOperator) {
  // If there's already an operator AND we haven't started a new number yet,
  // just switch the operator instead of calculating.
  if (operator && resetNext) {
    operator = nextOperator;
    return;
  }

  if (previousInput === "") {
    // First operator press: save the current number as the "previous" one.
    previousInput = currentInput;
  } else if (operator) {
    // We already have a pending calculation — solve it before continuing.
    currentInput = String(calculate(previousInput, currentInput, operator));
    previousInput = currentInput;
    updateDisplay();
  }

  operator = nextOperator;
  resetNext = true; // the next digit should begin a brand-new number
}

/*
  The actual math! This function takes two numbers (as text), turns them into
  real numbers with parseFloat, and returns the result based on the operator.
  A "switch" is a clean way to choose between several options.
*/
function calculate(a, b, op) {
  const x = parseFloat(a);
  const y = parseFloat(b);

  let result;
  switch (op) {
    case "add":
      result = x + y;
      break;
    case "subtract":
      result = x - y;
      break;
    case "multiply":
      result = x * y;
      break;
    case "divide":
      // Dividing by zero isn't allowed in math, so we show a gentle message.
      if (y === 0) {
        return "Can't ÷ 0";
      }
      result = x / y;
      break;
    default:
      return b; // no operator? just hand back the second number
  }

  // Rounding trims long messy decimals like 0.30000000000000004 into something tidy.
  return Math.round(result * 1000000) / 1000000;
}

/*
  Runs when you press "=". It finishes the pending calculation,
  shows the answer, and clears the operator so we're ready for a new sum.
*/
function equals() {
  // Nothing to do if we don't have a full "number operator number" yet.
  if (operator === null || previousInput === "") {
    return;
  }

  currentInput = String(calculate(previousInput, currentInput, operator));
  operator = null;
  previousInput = "";
  resetNext = true;
  updateDisplay();
}

/*
  "AC" (all clear) resets everything back to the starting state —
  a fresh calculator, ready to go.
*/
function clearAll() {
  currentInput = "0";
  previousInput = "";
  operator = null;
  resetNext = false;
  updateDisplay();
}

/*
  "DEL" removes the last character — handy for fixing a typo.
  .slice(0, -1) returns the text without its final character.
  If nothing is left, we fall back to "0" so the screen is never empty.
*/
function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  if (currentInput === "" || currentInput === "-") {
    currentInput = "0";
  }
  updateDisplay();
}

/*
  EVENT DELEGATION 💡
  Instead of adding a click listener to all 19 buttons one by one,
  we add ONE listener to the whole keypad. When any button inside is clicked,
  this function checks WHICH one it was (using the data-* attributes we set in HTML)
  and calls the matching function. Fewer listeners = cleaner, faster code.
*/
keypad.addEventListener("click", function (event) {
  const target = event.target;

  // event.target is the exact thing clicked. If it wasn't a button, ignore it.
  if (!target.classList.contains("btn")) {
    return;
  }

  // Number buttons carry a data-number; operator/function buttons carry data-action.
  const number = target.dataset.number;
  const action = target.dataset.action;

  if (number !== undefined) {
    appendNumber(number);
    return;
  }

  // A little map of action names to the function each should run.
  switch (action) {
    case "add":
    case "subtract":
    case "multiply":
    case "divide":
      chooseOperator(action);
      break;
    case "equals":
      equals();
      break;
    case "clear":
      clearAll();
      break;
    case "delete":
      deleteLast();
      break;
  }
});

/*
  BONUS: keyboard support! Many people prefer typing numbers.
  We listen for key presses on the whole page and map them to the same actions.
  Try pressing 5, then +, then 3, then Enter. 🎉
*/
document.addEventListener("keydown", function (event) {
  const key = event.key;

  if ((key >= "0" && key <= "9") || key === ".") {
    appendNumber(key);
  } else if (key === "+") {
    chooseOperator("add");
  } else if (key === "-") {
    chooseOperator("subtract");
  } else if (key === "*") {
    chooseOperator("multiply");
  } else if (key === "/") {
    event.preventDefault(); // stop the browser's quick-find bar from opening
    chooseOperator("divide");
  } else if (key === "Enter" || key === "=") {
    equals();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearAll();
  }
});

// Finally, show the starting value ("0") as soon as the page loads.
updateDisplay();
