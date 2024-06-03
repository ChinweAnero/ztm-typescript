/* eslint-disable */
import { strict as assert } from "assert";

// Interfaces provide a way to define the shape of objects or classes. They
// define the contracts that objects must follow, specifying the properties and
// methods that an object must have. Interfaces make it easier to write
// type-safe code by providing a way to ensure that objects are of the correct
// shape before they are used in a program. They also allow for code to be more
// modular and reusable, since objects can be easily swapped out as long as
// they adhere to the interface's contract.
//
// Useful links:
// https://www.typescriptlang.org/docs/handbook/2/objects.html

interface Area {
    // method signature
    area(): number

}

interface Perimeter{
    perimeter(): number

}

class Rectangle implements Area, Perimeter{
    lenght: number = 1;
    width: number = 1;

    area(): number {
        return this.lenght * this.width
        
    }

    perimeter() : number{
        return 2 * (this.lenght + this.width)
    }
}

type AreaAndPerimeter = Area & Perimeter;
class Circle implements Area, Perimeter{
    radius: number = 4;

    area(): number {
        return Math.PI * this.radius ** 2;
    }
    perimeter(): number {
        return 2 * Math.PI * this.radius;
    }

    
}
const rect = new Rectangle();
const circ = new Circle();

const objectsWithArea: Area[] = [rect, circ];
for (let i = 0; i < objectsWithArea.length; i++){
    console.log(objectsWithArea[i].area())
}


interface CustomerInfo{
    name: String
}

class Customer implements CustomerInfo{
    name: String;

    constructor(name: string){
        this.name = name
    }

}

function printAddr(address: Address){
    console.log(`Street name: ${address.street}, City: ${address.city}`)
}

interface Address{
    street: string;
    city: string;
}

const LocalAddress = {
    street: "name",
    city: "sample"
}

printAddr(LocalAddress);