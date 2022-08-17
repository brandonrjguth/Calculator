/*function that takes in two numbers, the chosen calculator operation, performs that
calculation and returns the results */

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


/*Variables for dom nodes and logic applied in later functions*/
let display = document.querySelector("#calcDisplay")
let numbers = document.querySelectorAll(".num");
let operators = document.querySelectorAll(".op")
let equals = document.querySelector("#equals")
let currentNum;
let currentOp;
let calculations = []
let result;



/*-------------------------------------------------------------------------------------*/
/*The following code will result in a calculations array with the order of operations
ie. [3, add, 2, sub, 1]*/
/*-------------------------------------------------------------------------------------*/


/*Detect when any number is clicked, add it to the display, concatonate extra numbers to the
 current. ie. 5, followed by 5, results in the number 55 both on the display and stored as a
 variable*/
for (let num of numbers){
    
    num.addEventListener("click", () => {
        
        display.textContent += num.id;
    
        if (currentNum == undefined){
            currentNum = num.id;
        } else {
            currentNum += num.id;
        }
    })
}


/*When any operator is clicked, see if theres been a number clicked prior, and add it to the 
calculations array, followed by the operator chosen*/
for (let op of operators){

    op.addEventListener("click", () => {

        if (currentNum !== undefined){
                calculations.push(currentNum);
        }
            
        /*if there is no current number & there is an operator already selected, this means
        that an operator has been selected after another operator with no number input
        in between. Remove previous operation from array and replace it with the new one
        ie. if sub operator is clicked and then add operator is clicked [5, add, 3, sub] 
        becomes [5, add, 3, add] */

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






/*-------------------------------------------------------------------------------------*/
/*The following code will run through and complete the order of operations in the 
calculations array in the order they've been submitted and return a result*/
/*-------------------------------------------------------------------------------------*/


/* When the equals button has been clicked, make sure a number has been selected prior.
If so, push the current number to the array, and then use the reduce function on the 
array which contains logic to complete the operations in the order entered*/
equals.addEventListener("click", () => {

    if (currentNum !== undefined){

        calculations.push(parseInt(currentNum));
        result = calculations.reduce((prev, cur) => {

            /*if the previous array item -or the first item when we start iterating 
            through- is a number, and the following is not, store the previous array item
            as the first number and return the current array item which will be the operation*/
            if (!isNaN(prev) && isNaN(cur)){
                firstNum = prev;
                return cur;
            }

            /*since we returned the current array item, which was the operator chosen, on 
            this following iteration, it becomes the previous array item, and the current 
            array item will now be the following number. Run the operate function with
            the first and second number, and the operator inbetween them, then return the
            result. This result becomes our new first number, or if we are at the end of
            the array, becomes our final result*/
            return operate(firstNum, cur, prev); 
            
        })
        
        //log result and empty variables
        console.log(`result is ${result}`)
        calculations = [];
        currentNum = result;        
    }

})