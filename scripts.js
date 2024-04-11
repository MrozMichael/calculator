const calculator = document.getElementById("calculator");
const buttons = document.getElementById("buttons");
const screen = document.getElementById("screen");
const errorMsg = document.getElementById("error_message")
screen.textContent = "0";

/*todo: allow chaining operations.
  ex: 7 + 3 + 5 = 15 (currently gives 8)
*/


let storedValue = 0;
let chosenOperator = "";

//click handler for equal button
const calculate = () => {
    let result;
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
    if (isNaN(result)) {
        errorMsg.textContent = "Error: invalid result";
        return;
    }
    screen.textContent = result;
    storedValue = 0;
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
numberButtons.forEach(n => n.addEventListener("click", function(e) {
    if (+screen.textContent >= 9007199254740991) {
        errorMsg.textContent = "Error: Maxmimum Value Exceeded"
        return;
    }
    //displayNewNumber boolean flag when an operator button pressed
    screen.textContent = screen.textContent == 0 || displayNewNumber ? 
        this.textContent : screen.textContent + this.textContent;
    displayNewNumber = false;
}))

const operators = ["+", "-", "/", "*", "^", "%"];
//give click handler to each operator button   
operators.map(operator => {
    let newButton = createButton(operator, "operator_button"); 
    newButton.addEventListener("click", function(e) {
        chosenOperator = operator;
        storedValue = isNaN(+screen.textContent) ? 0 : +screen.textContent;
        //next input will display a new number
        displayNewNumber = true;
    })
});


const clearButton = createButton("clear", "clear_button");

clearButton.addEventListener("click", function(e) {
    screen.textContent = "0";
    storedValue = 0;
})

const deleteButton = createButton("del", "delete_button");

deleteButton.addEventListener("click", function(e) {
    screen.textContent = screen.textContent.length > 1 ?  screen.textContent.slice(0, -1): "0"; 
})

const equalsButton = createButton("=", "equals_button");

equalsButton.addEventListener("click", function(e) {
    calculate();
})

document.getElementById("debug").addEventListener("click", function(e){
    console.log("operator: ", chosenOperator)
})