// Using functions and template literals, print out your first and last name.
//
// Requirements:
// - Use a single function to generate your first name
// - Use a single function to generate your last name
// - Use a single function to generate your full name by using the other
//   functions
// - Print out your full name using the functions

import { strict as assert } from "assert";
function myLastName(lastname){
    console.log(lastname)
}
myLastName('Anero')

function myFirstName(firstname){
 
    console.log(`Hey my name is ${firstname}`)
}
myFirstName("Chinwe")

function fullName(myFirstName, myLastName){
    console.log(`This is my fullname ${myFirstName + myLastName}`)

}
fullName("Chinwe" ,  "Anero");
