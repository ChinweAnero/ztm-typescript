/* eslint-disable */
import { strict as assert } from "assert";

// Classes are a way to define blueprints for objects. They encapsulate data
// and behavior and can be used to create instances of objects with predefined
// properties and methods. Classes can be extended and inherited, allowing for
// the creation of complex object hierarchies.
//
// Useful links:
// https://www.typescriptlang.org/docs/handbook/2/classes.html

class Color{
    r: number = 0;
    g: number = 0;
    b: number = 0;
}

const red = new Color(); //(instance of the class, used to access the class)
red.r = 255;

class Dimension{
    lenght: number;
    width: number;
    height: number;

    constructor(lenght: number){
        this.lenght = 1
        this.height = 2
        this.width = 3
    }

}

const one = new Dimension(10)

class Point{
    x: number;
    y: number;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;

    }

    translate(x: number, y: number){
        this.x += x
        this.y += y
    }
}
const pointer = new Point(4, 5)
pointer.translate(0, 1)