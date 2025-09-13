//this is math module every function related to math will come in here
//our custom module    

function add(a,b){
    return a+b;
}

function sub(a,b){
    return a-b;
}

// to use this function in another file.js we have to 
// export the function

//default export
module.exports = {
    add, 
    subFn : sub,
};

//way2 

exports.mul = (a,b) => a*b; // this export it as anonymous function
//useful if you have lot function in the module