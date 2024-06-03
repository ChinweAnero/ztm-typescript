/* eslint-disable */
import { strict as assert } from "assert";

// A `Map` is a data structure that allows you to store data in a key-value
// pair format. Keys in a map must be unique, and each key can map to only one
// value. You can use any type of value as the key, including objects and
// functions. Maps are useful when you want to quickly access data and you are
// able to maintain the key in memory. In situations where you have to search
// (you don't have a key) for the data you need, a difference data structure
// would be more appropriate.
//
// Useful links:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map


type Name = string;
type Score = number;

const testScores: Map<string, number> = new Map();
testScores.set("Alice", 90);
testScores.set("Bob", 99);
testScores.set("Kane", 99);

for(const[name, score] of testScores){
    console.log(`${name} score is ${score}`)
}

for (const name of testScores.keys()){
    console.log(`${name}`)
}
