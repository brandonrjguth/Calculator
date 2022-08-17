let operate = (x,y,operator) => {
    switch(operator){

        case "add":
            return x + y

        case "sub":
            return x - y

        case "mult":
            return x * y

        case "div":
            return x/y

    }
}

let numbers = document.querySelectorAll(".num");
let operators = document.querySelectorAll(".op")
let display = document.querySelector("#calcDisplay")
let currentNum;
let currentOp;
let calculations = []


//The following code will result in a calculations array with the order of operations
//ie. [3, add, 2, sub, 1]


//number clicked storing logic
for (let num of numbers){
    
    num.addEventListener("click", () => {

        //change display to clicked number or concat to the current number
        display.textContent += num.id;
        
        //if number is undefined, change the current num to the clicked num
        //else concatonate it to the current num (ex if 5, and clicked 5, current num becomes 55)
        if (currentNum == undefined){
            currentNum = num.id;
        } else {
        currentNum += num.id;
        }
    })
}


//logic for operator being clicked
for (let op of operators){

    op.addEventListener("click", () => {

        //if there is a number clicked into the calculator
        if (currentNum !== undefined){

                //add it to the calculations array before the operator
                calculations.push(currentNum);
        }
            

        //if there is no currentNum and there is an operator already selected, this means
        //that an operator has been selected after another operator with no number input
        //inbetween. Remove previous operation from array and replace it with the new one
        //ie if sub operator is clicked and then add operator is clicked [5, add, 3, sub] 
        //becomes [5, add, 3, add]

        if (currentNum == undefined && currentOp !== undefined){
            currentOp = op.id;
            calculations.splice(calculations.length - 1);
        }

        //wipe current number and display
        currentNum = undefined;
        display.textContent = ""

        //push the operator to calculations
        currentOp = op.id;
        calculations.push(currentOp);
        
    })
}
