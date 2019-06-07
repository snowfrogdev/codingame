import { findClosestNumber } from "./find-closest-number";

declare function readline(): string

var inputs = readline().split(" ");
const N = inputs[0];
const M = inputs[1];

console.log(findClosestNumber(N, M));
