
Every response and request have network packets
Within each packets there is the actual data 
on every packets there information like from, to, content-type (kind of metedata)

HTTP Headers are an important part of the API request and response as they represent the meta-data associated with the API request and response.Headers carry information for The request and Response Body.


Good Practices ->

//creating your header 
res.setHeader("X-myName","Aditya Gupta");
//Always add X- to custom header

all built in header ->
https://developer.mozilla.org/en-US/docs/Web/API/Headers
