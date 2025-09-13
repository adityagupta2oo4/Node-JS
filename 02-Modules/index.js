// if we want to use he function defined in out
// custom math module we need require("path") function

const math = require("./math"); // we can built in module also

// const {add , sub} = require(); destructuring

console.log(math.subFn(3,5));
