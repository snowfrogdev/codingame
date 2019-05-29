import { /*rearrangeString*/ StringRearranger } from "./rearrange-string";

declare function readline(): string

const S = readline();

const stringRearranger = new StringRearranger(S)

console.log(stringRearranger.rearrangeString())