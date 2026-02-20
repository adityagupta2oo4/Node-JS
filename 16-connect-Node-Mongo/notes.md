
* Node.js (runtime)
* Express (web framework)
* MongoDB (database)
* Mongoose (ODM)

---

# 1️⃣ Do We Install `mongosh` in Project?

No.

`mongosh` is a database shell (CLI client).
It is used in the terminal, not inside your Node project.

Inside your project you install:

```bash
npm install mongoose
```

Then:

```js
const mongoose = require("mongoose");
```

Mongoose is an ODM (Object Data Modeling library).

---

# 2️⃣ How Mongoose Works (Core Concept)

Mongoose acts as a layer between:

```
Node.js  ↔  Mongoose  ↔  MongoDB
```

It provides:

* Schema definition
* Validation
* Middleware
* Query building
* Model abstraction

Flow:

```
Schema → Model → CRUD Operations
```

---

# 3️⃣ Schema – Defines Structure

A Schema defines how a MongoDB document should look.

```js
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    job_title: {
        type: String,
    },
    gender: {
        type: String,
    }
}, { timestamps: true });
```

## What This Does

* `type: String` → Field datatype
* `required: true` → Validation rule
* `unique: true` → Creates a unique index
* `timestamps: true` → Automatically adds:

```js
createdAt
updatedAt
```

These fields are automatically managed by Mongoose.

---

# 4️⃣ Connecting MongoDB and Node

```js
mongoose
  .connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error", err));
```

### Why `.connect()` returns a Promise?

Because database connection is asynchronous.

It takes time to:

* Open socket
* Authenticate
* Initialize connection pool

So `.connect()` returns a Promise.

---

# 5️⃣ Model Creation

```js
const User = mongoose.model("User", userSchema);
```

Important rules:

* `"User"` = Model name
* Collection name becomes `"users"`

Mongoose automatically:

* Lowercases
* Pluralizes

So:

```
Model: User
Collection: users
```

This matches your shell output:

```
show collections
users
```

---

# 6️⃣ Why `async/await` is Important in POST

Example:

```js
const result = await User.create({
    first_name: body.firstName,
    last_name: body.lastName,
    email: body.email,
});
```

### What `User.create()` Does

Internally:

1. Creates document instance
2. Validates against schema
3. Sends insert command to MongoDB
4. Waits for acknowledgment
5. Returns inserted document

All of this is asynchronous.

---

## Why `await` is critical

Without `await`:

```js
User.create(data);
res.json({ msg: "success" });
```

The response may be sent before:

* Validation completes
* Insert completes
* Error occurs

That creates race conditions.

With `await`:

```js
const result = await User.create(data);
```

Execution pauses until MongoDB confirms insertion.

That ensures:

* Correct response timing
* Proper error handling
* Data integrity

---

# 7️⃣ Example POST Route (Correct Structure)

```js
app.post("/users", async (req, res) => {
    try {
        const result = await User.create(req.body);
        return res.status(201).json({
            msg: "success",
            data: result
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
});
```

---

# 8️⃣ What Is `__v` in Your Output?

Your MongoDB output shows:

```js
__v: 0
```

This is the version key.

Mongoose uses it for:

* Internal versioning
* Optimistic concurrency control

It increments when document is updated.

---

# 9️⃣ Your GET Route Has Errors

You wrote:

```js
<li>${user.first_name}-user.email</li>
```

Problems:

1. `user.email` is not inside `${}`
2. `<ul` is missing `>`
3. HTML structure is invalid

Correct version:

```js
app.get("/users", async (req, res) => {

    const allDbUsers = await User.find({});

    const html = `
        <ul>
            ${allDbUsers
                .map(user => `
                    <li>${user.first_name} - ${user.email}</li>
                `)
                .join("")}
        </ul>
    `;

    res.send(html);
});
```

---

# 🔟 Model Name vs Collection Name

When you write:

```js
mongoose.model("User", userSchema);
```

It creates collection:

```
users
```

If you want custom collection name:

```js
mongoose.model("User", userSchema, "myCustomCollection");
```

---

# 1️⃣1️⃣ What Happens Internally When You Call `User.find({})`

1. Mongoose builds MongoDB query
2. Sends query to MongoDB driver
3. MongoDB returns BSON documents
4. Mongoose converts them to JavaScript objects
5. Returns Promise
6. `await` resolves it

---

# 1️⃣2️⃣ Complete Concept Flow

```
Client Request
      ↓
Express Route
      ↓
Mongoose Model
      ↓
MongoDB Collection
      ↓
Response Back to Client
```

---

# 🎯 Final Key Points

* Install `mongoose`, not `mongosh`
* Schema defines structure + validation
* Model connects schema to collection
* `async/await` prevents race conditions
* Model name becomes pluralized collection
* `timestamps` auto-manages date fields
* `__v` is version key
* Always match schema field names exactly

---



# 1️⃣ `mongod` → The Database Server (Daemon)

**What it is:**
The MongoDB **server process**.

**What it does:**

* Starts the database engine
* Listens on port `27017`
* Manages storage (`/var/lib/mongodb` or configured dbPath)
* Handles indexing, replication, transactions
* Processes client connections

Think of it as:

> The database engine itself.

### Example

```bash
mongod
```

On Ubuntu (apt install), this runs automatically as a system service:

```bash
sudo systemctl start mongod
```

You normally **do not** run this manually if installed via package manager.

---

# 2️⃣ `mongosh` → The Database Client (Shell)

**What it is:**
The MongoDB **interactive client**.

**What it does:**

* Connects to a running MongoDB server
* Lets you run queries
* Create databases
* Insert documents
* Manage users

Think of it as:

> A command-line interface to talk to the database.

### Example

```bash
mongosh
```

Then inside the shell:

```javascript
use test
db.users.insertOne({ name: "Aditya" })
db.users.find()
```

---

# 🧠 Conceptual Analogy

| Component  | Analogy                          |
| ---------- | -------------------------------- |
| `mongod`   | MySQL server / PostgreSQL server |
| `mongosh`  | MySQL client / psql client       |
| Port 27017 | Database TCP endpoint            |

---

# ⚙️ In Your Current Setup

Your system shows:

```
Active: active (running)
```

So:

* `mongod` is already running in the background
* You should only use `mongosh`

Running `mongod` again causes:

```
Address already in use
```

Because the server is already bound to port 27017.

---

# 🔎 Quick Visual Model

```
Application (Node.js / Python / mongosh)
              │
              ▼
        TCP Port 27017
              │
              ▼
            mongod
         (Database Engine)
              │
              ▼
         Data Files on Disk
```

---

# 🎯 Rule of Thumb

* Use **`mongod`** → to start the database server (rarely needed on Ubuntu)
* Use **`mongosh`** → to interact with the database

---

If you'd like, I can next explain:

* How `mongod.conf` works
* Where your data is stored
* How authentication works internally
* How replica sets change this model

What’s your goal — learning fundamentals or building a project?

