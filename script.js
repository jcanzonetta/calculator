const resultField = document.querySelector("#result-field")
const numButtons = document.querySelectorAll(".numButton")
const operateButtons = document.querySelectorAll(".operateButton")
const equateButton = document.querySelector("#equate-button")
let displayedNumber = ""
let savedNumber;
let operator;

// Number Button Event Listeners
numButtons.forEach(button => {
    button.addEventListener('click', () => {
        displayedNumber += button.innerHTML
        resultField.innerHTML = displayedNumber
    })
})

//  Operator Button Event Listeners
operateButtons.forEach(button => {
    button.addEventListener('click', () => {
        operator = button.innerHTML
        savedNumber = displayedNumber
        displayedNumber = ""
    })
})

// Operate/Equals Event listener
equateButton.addEventListener('click', () =>{
    resultField.innerHTML = operate(operator, savedNumber, displayedNumber)
})




function operate(operator, a, b){
    a = parseInt(a)
    b = parseInt(b)
    
    switch (operator){
        case "+":
            console.log(`savedNumber: ${a}`)
            console.log(`displayedNumber: ${b}`)
            console.log(`computation: ${add(a, b)}`)
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
    return a*b
}

function divide(a,b){
    return a/b
}