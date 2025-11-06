till now

client -> req -> server

let's say we have req -> GET /users so express goes to the code and  run app.get(/users) which send us back some response. end of req -res cycle
-----

client -> middleware -> server

now our req first goes to middleware after middleware is confident that everything is okay, it then forwared the req  then function sent the response

if middleware detect anomaly instead of forwarding it send an response back

so middleware is just an function and ever req pass through it there can be multiple midlleware

client - m1 - m2 - m3 - server

each middleware serves an purpose, so it's kind of plugins ex-> validation 

// handler function or your own middle ware

app.use((req,res,next) =>{
    
})

--use case 
for log file entry we can have fs.append() in the middleware since we the request will pass through it after that it can go to different routes