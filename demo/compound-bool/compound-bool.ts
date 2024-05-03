/* eslint-disable */
import { strict as assert } from "assert";

//NOT
const writing = true;
const reading = !writing

//OR
const rating = 9;
const favouriteMovie = false;

const suggestMovie = rating > 8 || favouriteMovie;
assert.equal(suggestMovie, true);

//AND

const age = 18;
const isTeenager = age >= 13 && age < 20;
assert.equal(isTeenager, true);

const packageWeight = 30;
const packageLenght = 50;
const shippingDistance = 99;
const feeExemption = false;

const extraFee = !feeExemption && (packageWeight > 25 || packageLenght > 40);




