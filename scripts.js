const calculator = document.getElementById("calculator");
const numberButtons = document.getElementById("number_buttons");
const operatorButtons = document.getElementById("operator_buttons");
const otherButtons = document.getElementById("other_buttons");
const screen = document.getElementById("display_value");
const errorMsg = document.getElementById("error_message")
const storedValue = document.getElementById("stored_value");
screen.textContent = "0";
storedValue.textContent = "";
let lastPressed = "";
let chosenOperator = "";
//displayNewNumber boolean flag for when screen should be overwritten
let displayNewNumber = true;

const calculate = () => {
    let result;
  
    if (storedValue.textContent === "") {
        return +screen.textContent;
    }
    if (isNaN(storedValue.textContent)) {
        storedValue.textContent = storedValue.textContent.split(' ')[0];
    }
    let x = +storedValue.textContent;
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
        case "mod":
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
let createButton = (label, buttonClass, parent) => {
    let newButton = document.createElement("button");
    newButton.textContent = label;
    newButton.className = buttonClass;
    parent.appendChild(newButton);
    return newButton;
}

for (let i = 0; i < 10; i++) {
   createButton(i, "number_button", numberButtons);
}

const numberButtonArr = Array.from(document.getElementsByClassName("number_button"));
//give click handler to each number button
numberButtonArr.forEach(button => button.addEventListener("click", function(e) {
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

const operators = ["+", "-", "/", "*", "^", "mod"];
//give click handler to each operator button   

operators.map(operator => {
    let newButton = createButton(operator, "operator_button", operatorButtons); 
    newButton.addEventListener("click", function(e) {
        if (isNaN(lastPressed)) {
            chosenOperator = operator;
            lastPressed = operator;
            return;
        }
        storedValue.textContent = calculate() + " " + operator;
        chosenOperator = operator;    
        //next input will display a new number
        displayNewNumber = true;
        lastPressed = operator.textContent;
    })
});

const invertButton = createButton("(+/-)", "invert_button", otherButtons);
invertButton.addEventListener("click", function(e){
    if (!isNaN(+screen.textContent)) {
        screen.textContent = +screen.textContent * -1;
    }
})

const clearButton = createButton("clear", "clear_button", otherButtons);

clearButton.addEventListener("click", function(e) {
    screen.textContent = "0";
    resetValues();
    lastPressed = "";
})

const deleteButton = createButton("del", "delete_button", otherButtons);

deleteButton.addEventListener("click", function(e) {
    screen.textContent = screen.textContent.length > 1 ?  screen.textContent.slice(0, -1): "0"; 
})

const equalsButton = createButton("=", "equals_button", otherButtons);

equalsButton.addEventListener("click", function(e) {
    if (isNaN(lastPressed)){
        return;
    }
    calculate();
    resetValues();
})

const resetValues = () => {
    storedValue.textContent = "";
    displayNewNumber = true;
    chosenOperator = "";
}

document.getElementById("debug").addEventListener("click", function(e){
    console.log("operator: ", chosenOperator)
})