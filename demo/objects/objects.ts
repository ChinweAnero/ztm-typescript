/* eslint-disable */
import { strict as assert } from "assert";

// Objects are a fundamental data type used to represent a collection of
// properties with their respective values. They are defined using either an
// object literal notation or a constructor notation.
//
// Useful links:
// https://www.typescriptlang.org/docs/handbook/2/objects.html

// the object
type Coordinate = {
    x: number;
    y: number;
};
// an instance of the object. Assigning them values 
const origin: Coordinate = {
    x: 0,
    y: 0,
}
//
//using/accessing the objects
const xPosition = origin.x
assert.equal(xPosition, 0)
const yPosition = origin.y
assert.equal(yPosition, 0)

let coord: Coordinate = {x: 1, y: 1};
coord.x = 20;
coord.y = 10;

assert.deepEqual(coord, {x:20, y:10});
const threethree = {x: 20, y: 10};

function printCoord(coord: Coordinate){
    console.log(coord.x, coord.y);
    
}
printCoord(coord);
printCoord({x: 5, y: 10});

type PersonName = string;

type Location = {
    coord: Coordinate;
    name: PersonName
}
let home = {
    coord:{x: 0, y: 0},
    name: "home"
}
home.coord.x = 1
const ypos = home.coord.y;



