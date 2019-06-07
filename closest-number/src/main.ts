import { findClosestNumber } from "./find-closest-number";
import { findClosestNumberII } from "./find-closest-numberii";

declare function readline(): string

var inputs = readline().split(" ");
const N = inputs[0];
const M = inputs[1];

console.log(findClosestNumberII(N, M));
