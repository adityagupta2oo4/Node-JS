console.log("hello there! I am running using node js runtime environment");

// console.log(alert("Hey")) // this will give us an error
// ❌ alert() fails because it’s browser-specific
// ✅ Node.js replaces browser APIs with server-side APIs
// ⚡ This allows JavaScript to run outside the browser efficiently

//why? we know that v8 engine
//  was embedded with the C++ 
// that's how we got node js runtime environment
// we have to run js on server using node js so everything related to UI / DOm is 
// removed from the node js

//npm- node package manager 
// whenever we create a new we have to npm init for the template(package.json)
// package.json - configuration file (this is used to write different script install external dependencies)

//npm run start  -> will automatically run the hello.js as we have edited in the json file
