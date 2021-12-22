import { writable } from "svelte/store";
 
export const question =writable([]);
export const selectedAns=writable([]);
export const attempted=writable([]);
export const unattempted=writable([]);
