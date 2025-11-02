// if we want to use the function defined in out
// custom math module we need require("path") function

const math = require("./math"); // we can built in module also
// as everthing in js is an Object we have create something like math = {add(),subFn,mul}

// const {add , sub} = require(); destructuring

console.log(math.add(3,5));
