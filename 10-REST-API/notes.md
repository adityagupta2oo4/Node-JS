
## 🌐 What is REST / RESTful API?

**REST (Representational State Transfer)** is:

👉 An **architectural style**
👉 A **set of rules / best practices**
👉 For building APIs over HTTP

It is NOT a technology or language.

---

## 🧩 Core concept: Client–Server Architecture

✔ Client and server are independent systems
✔ They communicate using HTTP

Flow:

```
Client  → Request →  Server
Client  ← Response ← Server
```

They should NOT depend on each other’s internal implementation.

---

## 📦 Response formats

Server can respond with:

* Text
* Image
* HTML
* JSON (most common)
* XML

---

### 🖥️ Server Side Rendering (SSR)

If server returns **HTML**:

👉 Rendering happens on server
👉 Browser just displays it

✔ Fast initial load
✔ Good for SEO

---

### 📱 Client Side Rendering (CSR)

If server returns **JSON**:

👉 Client (React, mobile app, etc.) processes it
👉 Client decides how to show UI

✔ Cross-platform
✔ Flexible

---

### ✅ Which should you use?

| Situation             | Best choice |
| --------------------- | ----------- |
| Only web app          | HTML (SSR)  |
| Web + Mobile + others | JSON (API)  |

👉 Most modern systems use JSON APIs.

---

## 📜 REST principle: Use proper HTTP methods

Each method has meaning.

| Method | Purpose             |
| ------ | ------------------- |
| GET    | Read data           |
| POST   | Create new data     |
| PUT    | Replace entire data |
| PATCH  | Update partial data |
| DELETE | Remove data         |

---

## ✅ Correct RESTful routes

Assume resource = `users`

### Read users

```
GET /users
```

### Create user

```
POST /users
```

### Update user (partial)

```
PATCH /users/:id
```

### Delete user

```
DELETE /users/:id
```

---

## ❌ Non-RESTful (bad practice)

```
POST /updateUser
GET /getUser
POST /deleteUser
```

Why wrong?

👉 HTTP method already tells the action
👉 Route should represent the resource, not the verb

REST says:

✔ Use NO verbs in URL
✔ Use nouns (resources)

---

## 🎯 REST style =

❌ `/getUser`
✅ `/users` with GET

❌ `/updateUser`
✅ `/users/:id` with PATCH

---

## 📌 Important REST ideas (interview worthy)

✔ Stateless (each request independent)
✔ Resource-based URLs
✔ Proper HTTP methods
✔ Standard status codes (200, 201, 404, 500)

---

## ✅ Clean corrected version of your notes (short)

REST is a set of rules for building APIs using client-server architecture.
Client sends request, server sends response in formats like HTML or JSON.

HTML response = SSR (fast, web focused)
JSON response = CSR (cross-platform)

Always respect HTTP methods:

GET → read
POST → create
PATCH → update
DELETE → remove

Routes should represent resources, not actions.

---

## 🧠 Final takeaway

> RESTful API = Proper URLs + Proper HTTP methods + Stateless communication


In RESTful APIs, **PUT** and **PATCH** are both used to update resources — but they follow **different semantics**.

Let’s be precise and practical.

---

## 🔁 PUT — Full Replacement

👉 Replaces the **entire resource**

### Example (existing user):

```json
{
  "name": "Aditya",
  "age": 22,
  "city": "Delhi"
}
```

### PUT request:

```json
{
  "name": "Aditya",
  "age": 23
}
```

### Result after PUT:

```json
{
  "name": "Aditya",
  "age": 23
}
```

⚠️ `city` is removed because PUT replaces everything.

### ✔ Use PUT when:

* You want to overwrite the full object
* Client sends complete data

---

## ✏️ PATCH — Partial Update

👉 Updates **only specific fields**

### PATCH request:

```json
{
  "age": 23
}
```

### Result after PATCH:

```json
{
  "name": "Aditya",
  "age": 23,
  "city": "Delhi"
}
```

✔ Other fields remain untouched.

### ✔ Use PATCH when:

* Updating few fields
* Doing small edits

---

## 📊 Quick comparison

| Feature        | PUT          | PATCH              |
| -------------- | ------------ | ------------------ |
| Update type    | Full replace | Partial update     |
| Missing fields | Removed      | Kept               |
| Payload size   | Larger       | Smaller            |
| Common usage   | Less         | More (modern APIs) |

---

## 🎯 REST best practice

👉 Use **PATCH** for normal updates
👉 Use **PUT** when replacing whole resource intentionally

Most real-world APIs prefer **PATCH**.

---

## 🧠 Interview one-liner

> PUT replaces the entire resource, PATCH updates only specified fields.

---

REST and GraphQL are two different approaches for building APIs. REST is the traditional, widely adopted architectural style, while GraphQL is a newer, more flexible query-based system (originally developed at Facebook).

Let’s compare them clearly in a **modern backend context**.

---

## 🌐 REST API (Traditional)

### 🔹 Core idea

Each **resource has its own endpoint** and uses HTTP methods.

Example:

```
GET /users
GET /users/1
POST /users
PATCH /users/1
```

### 🔹 How data is returned

Server decides the response structure.

You might get:

```json
{
  "id": 1,
  "name": "Aditya",
  "age": 22,
  "city": "Delhi",
  "posts": [...]
}
```

Even if you only needed `name`.

---

### ✅ Pros of REST

✔ Simple and easy to understand
✔ Uses standard HTTP (caching, status codes)
✔ Huge ecosystem and tooling
✔ Great for CRUD-based apps

---

### ❌ Cons of REST

❗ Over-fetching (extra data you don’t need)
❗ Under-fetching (multiple requests for related data)
❗ Many endpoints to maintain

---

## 📊 GraphQL (Modern)

### 🔹 Core idea

Single endpoint where **client asks exactly what it needs**.

Example query:

```graphql
{
  user(id: 1) {
    name
    age
  }
}
```

### 🔹 Response:

```json
{
  "data": {
    "user": {
      "name": "Aditya",
      "age": 22
    }
  }
}
```

👉 No extra fields.

---

### ✅ Pros of GraphQL

✔ No over-fetching or under-fetching
✔ Single endpoint
✔ Client controls response shape
✔ Great for complex frontends (React, mobile apps)

---

### ❌ Cons of GraphQL

❗ More complex to set up
❗ Caching is harder than REST
❗ Needs learning curve
❗ Overkill for simple CRUD apps

---

## 📊 Side-by-side comparison

| Feature       | REST   | GraphQL     |
| ------------- | ------ | ----------- |
| Endpoints     | Many   | One         |
| Data control  | Server | Client      |
| Over-fetching | Yes    | No          |
| Flexibility   | Medium | High        |
| Complexity    | Low    | Medium/High |
| Caching       | Easy   | Harder      |

---

## 🎯 When should you use REST?

✅ Simple backend
✅ CRUD applications
✅ Microservices
✅ When performance + caching matters

👉 Most backend systems still use REST.

---

## 🚀 When should you use GraphQL?

✅ Complex UI with many data relations
✅ Web + Mobile consuming same API
✅ When frontend needs flexibility

👉 Popular in modern frontend-heavy apps.

---

## 🧠 Industry reality (important)

👉 REST is still the most common
👉 GraphQL is growing fast
👉 Many companies use BOTH

---

## ✅ Final takeaway

**REST** = simple, stable, standard
**GraphQL** = flexible, powerful, modern

### Rule of thumb:

> Start with REST.
> Move to GraphQL only when REST becomes limiting.


## 🔹 What is Caching in APIs?

Caching is a performance optimization technique where:

* A client (browser/mobile app)
* Or an intermediary (CDN like Cloudflare)
* Or the server

stores API responses temporarily.

When the same request is made again, the cached response is returned instead of recomputing or refetching the data.

### Example (REST)

```http
GET /users/101
```

If this response is cached, the next time someone requests `/users/101`, the server (or browser) can return the stored version immediately.

This works well because:

* REST uses **distinct URLs for distinct resources**
* HTTP supports built-in cache headers:

  * `Cache-Control`
  * `ETag`
  * `Last-Modified`

---

## 🔹 Why is Caching Easy in REST?

In REST:

```
GET /users/101
GET /products/55
GET /orders/200
```

Each resource has a **unique URL**.

So caching systems can simply say:

> “If the URL is the same, return cached data.”

CDNs like Akamai Technologies or browsers cache based on URL.

---

## 🔹 Why is Caching Harder in GraphQL?

In GraphQL, requests look like this:

```http
POST /graphql
```

The URL is usually the same for **all queries**.

But the query body changes:

```graphql
{
  user(id: 101) {
    name
    email
  }
}
```

Another request:

```graphql
{
  user(id: 101) {
    name
  }
}
```

Both hit:

```
POST /graphql
```

So traditional HTTP caching cannot easily distinguish:

* Which fields were requested
* Whether two queries are identical
* Whether partial data can be reused

---

## 🔹 The Core Problem

In REST:

```
URL uniquely identifies data
```

In GraphQL:

```
Same URL → different query structures → different response shapes
```

So caching must be done:

* At the application level
* Using tools like Apollo Client
* Or by implementing custom normalization logic

---

## 🔹 Practical Meaning of “Caching is Harder”

When someone says:

> ❌ Cons of GraphQL: Caching is harder than REST

They mean:

1. You cannot rely on simple HTTP URL-based caching.
2. You need smarter client-side cache management.
3. Partial query caching becomes complex.
4. CDN-level caching is not straightforward.

---

## 🔹 Summary (Interview-Ready Answer)

Caching means storing API responses to reuse them and avoid repeated server calls.

It is easier in REST because:

* Each resource has a unique URL
* HTTP caching works naturally

It is harder in GraphQL because:

* All queries go to a single endpoint (`/graphql`)
* The response depends on the query body, not just the URL
* Requires advanced client-side caching strategies





