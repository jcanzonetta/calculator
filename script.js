const resultField = document.querySelector("#result-field")
const numButtons = document.querySelectorAll(".numButton")
const operateButtons = document.querySelectorAll(".operateButton")
const equateButton = document.querySelector("#equate-button")
const clearButton = document.querySelector('#AC-button')
let currentNumber = ""
let savedNumber;
let pendingCal = false;
let operator;
let prevOperator;

// Number Button Event Listeners
numButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentNumber += button.innerHTML
        resultField.innerHTML = currentNumber
    })
})

//  Operator Button Event Listeners
operateButtons.forEach(button => {
    button.addEventListener('click', () => {
        prevOperator = operator
        operator = button.innerHTML

        if(!pendingCal){
            savedNumber = currentNumber
            currentNumber = ""
            pendingCal = true
        } else{
            currentNumber = operate(prevOperator, savedNumber, currentNumber)
            resultField.innerHTML = currentNumber
            savedNumber = currentNumber;
        }
    })
})

// Operate/Equals Event listener
equateButton.addEventListener('click', () =>{
    resultField.innerHTML = operate(operator, savedNumber, currentNumber)
})

// Clears the calculator 
clearButton.addEventListener('click', () =>{
    pendingCal = false
    operator = "clear"
    currentNumber = ""
    resultField.innerHTML = 0
})


function operate(operator, a, b){
    a = parseInt(a)
    b = parseInt(b)
    
    switch (operator){
        case "+":
            return add(a, b)
            break
        case "-":
            return subtract(a,b)
            break
        case "÷":
            return divide(a,b )
            break
        case "x":
            return multiply(a, b)
            break
        default:
            console.error(`Operate function failed with operator: ${operator}`)
    }
}

// Operator Functions
function add(a, b) {
	return a + b
}

function subtract(a,b) {
    return a-b
}
    
function multiply(a,b) {
    return a * b
}

function divide(a,b){
    return a / b
}