const topField = document.querySelector('#top-display')
const resultField = document.querySelector("#result-display")
const numButtons = document.querySelectorAll(".numButton")
const operateButtons = document.querySelectorAll(".operateButton")
const equateButton = document.querySelector("#equate-button")
const clearButton = document.querySelector('#AC-button')
const decButton = document.querySelector('#dec-button')
const allButtons = document.querySelectorAll('button')
const display = document.querySelector("#display-container")

let bNumber = ""
let typedNumber = ""
let aNumber;
let pendingCal = false;
let operator;
let prevOperator;
let calculatedNumber;

// Number Button Event Listeners
numButtons.forEach(button => {
    button.addEventListener('click', () => {
        decCheck(button)
        typedNumber += button.innerHTML
        resultField.innerHTML = typedNumber
    })
})

allButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.classList.add('moused')
    })
    button.addEventListener('mouseleave', () => {
        button.classList.remove('moused')
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
            
            aNumber = operate(prevOperator, aNumber, bNumber) // Don't like this and the next couple of lines, but afraid of breaking the operations
            calculatedNumber = aNumber
            resultField.innerHTML = calculatedNumber
            
        }

        displayAnimation();
        typedNumber = ""
        
    })
})



// Operate/Equals Event listener
equateButton.addEventListener('click', () =>{

    if(pendingCal){
        bNumber = typedNumber
    }
    calculatedNumber = operate(operator, aNumber, bNumber)
    resultField.innerHTML = calculatedNumber
    topField.innerHTML = `${aNumber} ${operator} ${bNumber}`

    displayAnimation()
})

// Clears the calculator 
clearButton.addEventListener('click', () =>{
    pendingCal = false
    operator = "clear"
    bNumber = ""
    typedNumber = ""
    topField.innerHTML = ""
    resultField.innerHTML = 0
    calculatedNumber = ""
    displayAnimation();
})


function displayAnimation(){
    display.classList.remove('displayChanged')
    
    //  Some magic and the keyframes animatikon will trigger again
    void display.offsetWidth;

    display.classList.add("displayChanged")
}

// Checks if a decimal is already present in the typed number.
function decCheck(button){
    if((typedNumber + button.innerHTML).indexOf(".") > -1){
        decButton.disabled = true
    }else{
        decButton.disabled = false
    }
}

// Determines the operation function
function operate(operator, a, b){
    a = parseFloat(a)
    b = parseFloat(b)
    
    switch (operator){
        case "+":
            return round(add(a, b))
            break
        case "-":
            return round(subtract(a,b))
            break
        case "÷":
            return round(divide(a,b ))
            break
        case "x":
            return round(multiply(a, b))
            break
        default:
            console.error(`Operate function failed with operator: ${operator}`)
    }
}

// Prevents rounding errors with float
function round(num){
    return Number(Math.round(num + 'e' + 14) + 'e-' + 14);
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