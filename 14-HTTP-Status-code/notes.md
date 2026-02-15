statu s code 
-- 404 not found
https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status

response code - batate hi ye kis tarike ka response hai 
if start with 1 - informational res
if start with 2 - succesfull
if start with 3 -  redirectrion mssg
if start with 4 - client error resp
if  start with 5 - server error resp

when everything goes well 200 is ecpected
201 - created- request succedned and new recourse was creted  sent after post,put request 

to set statud code

res.status(201).json(update/ create)

problem - when ever I make some change in code I ahve to restart my server

solution -  package nodemon
npm i nodemon

now in package.json start:"___" instead of node index.js we use nodemon index.js

what it does - it automatically restart your server after each save ctrl + s

code 204 - no content ex of whatsapp mssg sent 

code - 400 - bad request example (doesn't have required payload may be something is missing)

401 - unauthorised - ex trying to send msssg on facebook without login

402 - payement required -  still under development  ex you are using my service but your credits have exhuasted i can sendyou error 402

403 - Forbideen - you can't have acces to this with your credential

404 =Noyt found express can handle thison thier owe like now route exist

use case where you manually have to set 404 
ex - ../api/users/1004
1004 is the id info you wanna access but if does'nt exit express may show code 200 but it is 404

if(!users) return res.status(404).json({error:"user not found });

405 - method not allowed

500 - may be bug on you server code 
501 - not implemented
 project - url shortner we may use code 300


Here’s a **clean, refined + corrected version** of your understanding — keeping it simple but technically accurate.

----------------------------------------------

# 🌐 HTTP Status Codes — Refined Understanding

## 🔹 What are Status Codes?

HTTP status codes are **response codes sent by the server** to tell the client (browser/app/API) what happened with the request.

➡️ They describe the **type of response**.

---

## 🔹 Status Code Categories (First Digit Meaning)

| Range   | Meaning       | Description                                    |
| ------- | ------------- | ---------------------------------------------- |
| **1xx** | Informational | Request received, still processing             |
| **2xx** | Success       | Request completed successfully                 |
| **3xx** | Redirection   | Client needs to take another action (redirect) |
| **4xx** | Client Error  | Problem with request from client side          |
| **5xx** | Server Error  | Problem occurred on server side                |

---

## ✅ Common Success Codes

### **200 — OK**

Everything worked correctly.

Example:

```js
res.status(200).json(data)
```

---

### **201 — Created**

Request succeeded **and a new resource was created**.

Usually sent after:

* POST request
* PUT request (sometimes)

Example:

```js
res.status(201).json(newUser)
```

---

### **204 — No Content**

Request succeeded but **no response body** is returned.

Example:

* Message sent successfully (like WhatsApp)
* Delete operation

```js
res.status(204).send()
```

---

## ⚠️ Client Error Codes (4xx)

### **400 — Bad Request**

Client sent an invalid request.

Example:

* Missing required payload
* Invalid data format

```js
res.status(400).json({ error: "Invalid data" })
```

---

### **401 — Unauthorized**

Authentication required.

Example:

* Trying to access Facebook messages without login.

---

### **402 — Payment Required** *(Rare / Reserved)*

Not widely used yet.

Possible use case:

* Credits exhausted
* Subscription required

---

### **403 — Forbidden**

User is authenticated but **does NOT have permission**.

Example:

* Logged in as normal user trying to access admin panel.

---

### **404 — Not Found**

Requested resource does not exist.

Important understanding:

* Express automatically handles unknown routes.
* But you must manually set 404 when data is missing.

Example:

```js
if (!user) {
  return res.status(404).json({ error: "User not found" });
}
```

Example scenario:

```
/api/users/1004
```

If user ID doesn’t exist → return **404**, not 200.

---

### **405 — Method Not Allowed**

Route exists but HTTP method is wrong.

Example:

* Route supports GET but client sends POST.

---

## ❌ Server Error Codes (5xx)

### **500 — Internal Server Error**

Bug or unexpected error in server code.

Example:

* Database crash
* Undefined variable

---

### **501 — Not Implemented**

Server doesn’t support requested functionality yet.

Example:

* Feature planned but not developed.

---

## 🔁 Redirection Codes (3xx)

Used when resource moved or redirected.

Example use case:

* URL Shortener project often uses redirection codes like:

**301 / 302 / 307 / 308**

---

# ⚙️ Setting Status Code in Express

```js
res.status(201).json(data)
```

Structure:

```
res.status(code).json(response)
```

---

# 🔥 Development Problem — Server Restart

## Problem

Every time you change code → need to restart server.

---

## Solution → Nodemon

Install:

```bash
npm i nodemon
```

Update **package.json**:

```json
"start": "nodemon index.js"
```

### What Nodemon Does

* Automatically restarts server when you save files (Ctrl + S)
* Improves development speed

---

# ⭐ Quick Real-World Summary

| Code | Meaning            | Example            |
| ---- | ------------------ | ------------------ |
| 200  | OK                 | Data fetched       |
| 201  | Created            | User created       |
| 204  | No content         | Delete success     |
| 400  | Bad request        | Invalid input      |
| 401  | Unauthorized       | Login required     |
| 403  | Forbidden          | No permission      |
| 404  | Not found          | User doesn’t exist |
| 405  | Method not allowed | Wrong HTTP method  |
| 500  | Server error       | Bug in backend     |
| 501  | Not implemented    | Feature missing    |

---

# 🧠 PRO INTERVIEW TIP

A good backend developer chooses correct status codes because:

* APIs become predictable
* Frontend handles errors properly
* Debugging becomes easy

