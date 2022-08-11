let add = (x,y) => x + y;
let sub = (x,y) => x - y;
let mult = (x,y) => x*y;
let div = (x,y) => x/y; 
let operate = (x,y,operator) => operator(x,y);

let numbers = document.querySelectorAll(".num");
let operators = document.querySelectorAll(".class")
let display = document.querySelector("#calcDisplay")


//change text content of display when a number is pressed, and store it as a variable
for (num of numbers){
    num.addEventListener("click", () => {
        display.textContent += num.id;
        firstNum =+ num.id;
    })
}