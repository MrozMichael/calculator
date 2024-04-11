const calculator = document.getElementById("calculator");
const buttons = document.getElementById("buttons");
const screen = document.getElementById("screen");
const errorMsg = document.getElementById("error_message")
screen.textContent = "0";

let createButton = (label, buttonClass) => {
    let newButton = document.createElement("button");
    newButton.textContent = label;
    newButton.className = buttonClass;
    buttons.appendChild(newButton);
}

for (let i = 1; i < 10; i++) {
   createButton(i, "number-button");
}
createButton(0, "number-button");


const numberButtons = Array.from(document.getElementsByClassName("number-button"));

numberButtons.forEach(n => n.addEventListener("click", function(e) {
    if (+screen.textContent >= 9007199254740991) {
        errorMsg.textContent = "Maxmimum Value Exceeded"
        return;
    }
    screen.textContent = screen.textContent == 0 ? this.textContent : screen.textContent + this.textContent;
}))

const operators = ["+", "-", "/", "*", "^", "%", "="];   
operators.map(operator => createButton(operator, "operator-button"));

const operatorButtons = Array.from(document.getElementsByClassName("operator-button"));

createButton("clear", "clear-button");
const clearButton = document.getElementsByClassName("clear-button")[0];

clearButton.addEventListener("click", function(e) {
    screen.textContent = "0";
})

createButton("del", "delete-button");
const deleteButton = document.getElementsByClassName("delete-button")[0];

deleteButton.addEventListener("click", function(e) {
    screen.textContent = screen.textContent.length > 1 ?  screen.textContent.slice(0, -1): "0"; 
})