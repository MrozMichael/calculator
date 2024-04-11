const calculator = document.getElementById("calculator");
const buttons = document.getElementById("buttons");
const screen = document.getElementById("screen");
const errorMsg = document.getElementById("error_message")

screen.textContent = "0";
let storedValue = "";
let lastPressed = "";
let chosenOperator = "";
//displayNewNumber boolean flag for when screen should be overwritten
let displayNewNumber = true;

const calculate = () => {
    let result;
  
    if (storedValue === "") {
        return +screen.textContent;
    }
    let x = storedValue;
    let y = +screen.textContent;
    switch(chosenOperator) {
        case "+":
            result = x + y;
            break;
        case "-":
            result = x - y;
            break;
        case "*":
            result = x * y;
            break;
        case "/":
            if (y == 0) {
                errorMsg.textContent = "Divide By 0 Error";
                return;
            }
            result = x / y;
            break;
        case "^":
            result = x ** y;
            break;
        case "%":
            result = x % y;
            break;
        default:
            return;
    }
    screen.textContent = result;
    return result;
    //displayNewNumber = true;
}
//helper function to make calculator buttons
let createButton = (label, buttonClass) => {
    let newButton = document.createElement("button");
    newButton.textContent = label;
    newButton.className = buttonClass;
    buttons.appendChild(newButton);
    return newButton;
}

for (let i = 1; i < 10; i++) {
   createButton(i, "number_button");
}
createButton(0, "number_button");


const numberButtons = Array.from(document.getElementsByClassName("number_button"));
//give click handler to each number button
numberButtons.forEach(button => button.addEventListener("click", function(e) {
    if (+screen.textContent >= 9007199254740991) {
        errorMsg.textContent = "Error: Maxmimum Value Exceeded";
        return;
    }
    if (+screen.textContent <= -9007199254740991) {
        errorMsg.textContent = "Error: Minimum Value Exceeded";
        return;
    }
    lastPressed = +button.textContent;
    screen.textContent = screen.textContent == "" || displayNewNumber ? 
        button.textContent : screen.textContent + button.textContent;
    displayNewNumber = false;
}))

const operators = ["+", "-", "/", "*", "^", "%"];
//give click handler to each operator button   

operators.map(operator => {
    let newButton = createButton(operator, "operator_button"); 
    newButton.addEventListener("click", function(e) {
        if (isNaN(lastPressed)) {
            chosenOperator = operator;
            lastPressed = operator;
            return;
        }
        storedValue = isNaN(+screen.textContent) ? storedValue : calculate();
        console.log("stored: ", storedValue)
        chosenOperator = operator;    
        //next input will display a new number
        displayNewNumber = true;
        lastPressed = operator.textContent;
    })
});

const invertButton = createButton("(+/-)", "invert_button");
invertButton.addEventListener("click", function(e){
    if (!isNaN(+screen.textContent)) {
        screen.textContent = +screen.textContent * -1;
    }
})

const clearButton = createButton("clear", "clear_button");

clearButton.addEventListener("click", function(e) {
    screen.textContent = "0";
    storedValue = "";
    chosenOperator = "";
    lastPressed = "";
    displayNewNumber = true;
})

const deleteButton = createButton("del", "delete_button");

deleteButton.addEventListener("click", function(e) {
    screen.textContent = screen.textContent.length > 1 ?  screen.textContent.slice(0, -1): "0"; 
})

const equalsButton = createButton("=", "equals_button");

equalsButton.addEventListener("click", function(e) {
    if (isNaN(lastPressed)){
        return;
    }
    calculate();
    storedValue = "";
    displayNewNumber = true;
    chosenOperator = "";
})

document.getElementById("debug").addEventListener("click", function(e){
    console.log("operator: ", chosenOperator)
})