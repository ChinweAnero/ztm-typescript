/* eslint-disable */

// Arrow functions provide a concise syntax for defining functions. They are
// defined using a fat arrow (=>) and can be used in place of traditional
// function expressions. Arrow functions automatically bind the 'this' keyword
// to the parent context, making them useful in event handlers and callback
// functions. They also support implicit return statements for one-liner
// functions, which makes the code more readable.
// 
// Useful links:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

const arrowSum = (lhs: number, rhs:number): number => {
    return lhs + rhs;
}
//const two = sum(1, 1);
const ten = arrowSum(5, 5);
function calculate(fn:(lhs: number, rhs: number) => number){
    const result = fn(5, 6)

}
calculate(arrowSum);


