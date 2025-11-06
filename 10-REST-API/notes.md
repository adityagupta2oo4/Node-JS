REST OR RESTFULL API -

- represntatainla or set of rules or best practices
- it works on server - client architecure (which means client and server are inpdepented machine which should not depend on each other)
- c -req - s and s -resp-c
- resp can be in any format - txt,img,html,JSON,XML
- if server response with html it is known as server side rendering SSR -> which is fast
- if server response wit JSON (K V pair)  (CSR client side rendering) the client independently procces the json file and render it on it's website or machine front end will decide
- which to use ? if your sure that your client is an web-application then go with html since it's fast
-               if your client is cross platform like phone-website then go with json

- 2nd point - always respect all HTTP method - GET PUT POST PATCH DELETE
- example - 
- route
- ..........
- GET / user - read user data and return resp
- POST / user - handle new user creation
- PATCH / user -  update the user
- what if?
- POST / update user -> user update (by rule hame PATCH use krne chaiye)
- GET / getuser ->  (you don't have to write getuser since we know that GET wahi krta hai)
- are these correct? not



