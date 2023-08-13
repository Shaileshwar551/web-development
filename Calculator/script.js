const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let currentOperation = null;
let firstOperand = null;

buttons.forEach(button => {
  button.addEventListener('click', () => handleButtonClick(button.id));
});

function handleButtonClick(id) {
  if (id >= '0' && id <= '9') {
    currentInput += id;
    updateDisplay(currentInput);
  } else if (id === 'decimal') {
    if (!currentInput.includes('.')) {
      currentInput += '.';
      updateDisplay(currentInput);
    }
  } else if (id === 'clear') {
    clear();
  } else if (id === 'backspace') {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
  } else if (id === 'add' || id === 'subtract' || id === 'multiply' || id === 'divide') {
    if (currentInput !== '') {
      if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
      } else {
        compute();
      }
      currentOperation = id;
      currentInput = '';
    }
  } else if (id === 'equals') {
    if (currentInput !== '' && firstOperand !== null) {
      compute();
      currentOperation = null;
    }
  }
}

function updateDisplay(text) {
  display.textContent = text;
}

function clear() {
  currentInput = '';
  currentOperation = null;
  firstOperand = null;
  updateDisplay('0');
}

function compute() {
  const secondOperand = parseFloat(currentInput);
  switch (currentOperation) {
    case 'add':
      currentInput = (firstOperand + secondOperand).toString();
      break;
    case 'subtract':
      currentInput = (firstOperand - secondOperand).toString();
      break;
    case 'multiply':
      currentInput = (firstOperand * secondOperand).toString();
      break;
    case 'divide':
      currentInput = (firstOperand / secondOperand).toString();
      break;
  }
  firstOperand = parseFloat(currentInput);
  updateDisplay(currentInput);
}