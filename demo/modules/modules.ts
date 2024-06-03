/* eslint-disable */
import { strict as assert } from "assert";

// ES modules provide a way to organize code into separate files that can be
// imported and used in other files.To use an ES module, the the `import`
// keyword is used.
//
// Useful links:
// https://www.typescriptlang.org/docs/handbook/2/modules.html

import {add, pi, Int as interger} from "./maths"
import { Point } from "./coord";

const sum = add(2, 2);