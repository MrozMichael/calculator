const calculator = document.getElementById("calculator");
const buttons = document.getElementById("buttons");
const screen = document.getElementById("screen");
screen.textContent = 0;
for (let i = 0; i < 10; i++) {
    const newButton = document.createElement('button');
    newButton.textContent = i;
    newButton.class = "button";
    buttons.appendChild(newButton)
}