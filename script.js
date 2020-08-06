const topField = document.querySelector('#top-display')
const resultField = document.querySelector("#result-display")
const numButtons = document.querySelectorAll(".numButton")
const operateButtons = document.querySelectorAll(".operateButton")
const equateButton = document.querySelector("#equate-button")
const clearButton = document.querySelector('#AC-button')
let bNumber = ""
let typedNumber = ""
let aNumber;
let pendingCal = false;
let operator;
let prevOperator;
let cachedNumber;

// Number Button Event Listeners
numButtons.forEach(button => {
    button.addEventListener('click', () => {
        typedNumber += button.innerHTML
        resultField.innerHTML = typedNumber
    })
})

//  Operator Button Event Listeners
operateButtons.forEach(button => {
    button.addEventListener('click', () => {
        prevOperator = operator // Might be able to do a check for this.
        operator = button.innerHTML
        bNumber = typedNumber

        if(!pendingCal){
            topField.innerHTML = `${bNumber} ${operator}`
            aNumber = bNumber
            pendingCal = true
        } else{
            topField.innerHTML = `${aNumber} ${prevOperator} ${bNumber}`
            aNumber = operate(prevOperator, aNumber, bNumber)
            resultField.innerHTML = aNumber
        }

        typedNumber = ""
        
    })
})

// Operate/Equals Event listener
equateButton.addEventListener('click', () =>{
    if(pendingCal){
        bNumber = typedNumber
    }
    resultField.innerHTML = operate(operator, aNumber, bNumber)
    topField.innerHTML = `${aNumber} ${operator} ${bNumber}`
})

// Clears the calculator 
clearButton.addEventListener('click', () =>{
    pendingCal = false
    operator = "clear"
    bNumber = ""
    typedNumber = ""
    topField.innerHTML = ""
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