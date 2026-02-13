Below is a **precise, structured breakdown** of what this Express server is doing and how each part works.

---

## 1️⃣ Initial Setup

```js
const express = require("express");
const app = express();
const PORT = 5170;
```

* `require("express")` → imports the Express framework.
* `app = express()` → creates an Express application instance.
* `PORT` → server will run on port `5170`.

---

## 2️⃣ Importing Data & File System

```js
const users = require("./MOCK_DATA.json");
const fs = require('fs');
```

* `users` → loads mock user data from a JSON file into memory.
* `fs` → Node’s built-in **File System module**, used to read/write files.

⚠️ Important:
When you modify `users`, you're modifying the in-memory array. Writing to the file ensures persistence.

---

## 3️⃣ Built-in Middleware

```js
app.use(express.urlencoded({extended:false}));
```

### What it does:

* Parses incoming `application/x-www-form-urlencoded` data.
* Converts form data into a JS object.
* Makes it available at `req.body`.

Without this middleware:

```js
req.body === undefined
```

---

## 4️⃣ Custom Middleware (Execution Order Matters)

Middleware executes **in the order it is defined**.

---

### 🔹 Middleware 1 — Logging

```js
app.use((req,res,next) =>{
    console.log("Helloo from middleware 1");

    fs.appendFile('log.txt',
        `\n ${Date.now()} ${req.ip} ${req.method} ${req.path}`,
        (err,data)=>{
            next();
        }
    );
})
```

### What it does:

* Logs every request to `log.txt`.
* Stores:

  * Timestamp
  * IP
  * HTTP method
  * Request path

### Important Concept:

If you had written:

```js
return res.json({status : "in middleware"})
```

The request would **stop there** and not proceed further.
Calling `next()` passes control to the next middleware.

---

### 🔹 Middleware 2 — Modifying Request Object

```js
app.use((req,res,next) =>{
    console.log("Helloo from middleware 2");
    req.myUserName = "aditya";
    next(); 
})
```

Adds a custom property to the request object.

Now `req.myUserName` is available in all subsequent middleware and routes.

---

### 🔹 Middleware 3 — Accessing Modified Request

```js
app.use((req,res,next) =>{
    console.log("Helloo from middleware 3");
    console.log("hello ",req.myUserName);
    next(); 
})
```

Shows that request object modifications persist across middleware.

---

## 5️⃣ Routes

---

# 🖥 Hybrid Server Concept

Your app serves both:

* **SSR (Server-Side Rendering)**
* **CSR (Client-Side Rendering / API)**

---

## 🔹 SSR Route

```js
app.get("/users", (req, res) => {
```

### What it does:

* Generates HTML on the server.
* Sends a rendered `<ul>` list of users.

```html
<ul>
  <li>John</li>
  <li>Jane</li>
</ul>
```

This is Server-Side Rendering because:

* Server constructs the HTML
* Browser just displays it

---

## 🔹 CSR / API Route

```js
app.get("/api/users", (req, res) => {
    return res.json(users);
})
```

Returns JSON instead of HTML.

Used by frontend apps (React, Angular, etc.) to fetch data.

---

## 6️⃣ POST — Create User

```js
app.post('/api/users', (req, res) => {
```

### Flow:

1. `req.body` contains submitted data.
2. New user object is created:

   ```js
   users.push({id: users.length + 1, ...body})
   ```
3. Writes updated array to file:

   ```js
   fs.writeFile(...)
   ```
4. Sends success response.

---

## 7️⃣ Route Chaining (`app.route()`)

Instead of writing:

```js
app.get(...)
app.patch(...)
app.delete(...)
```

You grouped them:

```js
app.route('/api/users/:id')
```

Cleaner and RESTful.

---

# 🔎 Understanding Each Method

---

## 🔹 GET Single User

```js
.get((req, res) => {
```

* `req.params.id` → always a string
* Converted to number:

  ```js
  const id = Number(req.params.id);
  ```
* Finds matching user using `.find()`

---

## 🔹 PATCH (Update User)

```js
.patch((req, res) => {
```

* Extract ID
* Update only specific fields (here email)
* Rewrite entire JSON file

⚠️ Note:
You’re using `.map()` but not returning anything.
Better approach:

```js
users.forEach(user => {
   if(user.id === id) {
       user.email = body.email;
   }
});
```

---

## 🔹 DELETE

```js
.delete((req, res) => {
```

* Uses `.filter()` to remove user
* Writes new filtered array to file

⚠️ Important Issue:
You wrote filtered data to file but did NOT update the `users` variable in memory.

Better:

```js
users = users.filter(user => user.id !== id);
```

(Current code only updates file, not in-memory array.)

---

# 8️⃣ Starting Server

```js
app.listen(PORT, () => 
    console.log(`Server started at port : ${PORT}`)
);
```

Starts HTTP server and listens on port `5170`.

---

# 🔄 Request Lifecycle Summary

When a request comes in:

1. `express.urlencoded` runs
2. Middleware 1 logs request
3. Middleware 2 adds property
4. Middleware 3 reads property
5. Matching route handler executes
6. Response is sent

---

# ⚠️ Architectural Observations

### 1️⃣ Synchronous vs Asynchronous

`fs.writeFile` is async — good.

### 2️⃣ No Error Handling

You are ignoring `err` in file operations.

Better:

```js
if (err) return res.status(500).json({ error: "File write failed" });
```

---

### 3️⃣ No Validation

User input is directly trusted. In production, validate input.

---

### 4️⃣ Scalability Limitation

Using JSON file as database:

* Not scalable
* Risk of race conditions
* Entire file rewritten on every change

For real systems → use a database.

---

# 🎯 What This Code Demonstrates

* Express setup
* Middleware chaining
* Request object mutation
* RESTful routing
* File persistence
* SSR + API hybrid model

