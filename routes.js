const fs = require("fs");
//request: incoming request, respones: send a response
function rqListener(req, res) {
    const url = req.url;
    const method = req.method;
    if (url === "/") {
      res.setHeader("Content-type", "text/html");
      res.write("<html><head><title>Enter message</title></head>");
      res.write(
        "<body><form action='/message' method='POST'><input name='message' type='text'><button type='submit'>send</button></form></body></html>"
      );
      return res.end();
      //stop executing the remaining lines
    }
    if (url === "/message" && method === "POST") {
      const body = [];
      req.on("data", (chunk) => {
        console.log(chunk);
        body.push(chunk);
        //store the resquest data into body
      });
      //fires once done parsing the incoming requests
      req.on("end", () => {
        //create a new buffer and add all the chunks into it
        const parsedBody = Buffer.concat(body).toString();
        const message = parsedBody.split("=")[1];
        //take the value from the key-value pair
        fs.writeFile("message.txt", message, (error) => {
          //executed after the message is written to file
          res.statusCode = 302;
          //status code for redirection
          res.setHeader("Location", "/");
          //redirect user to /
          return res.end();
        });
        //block code execution until this file is written
        // res.writeHead(302, {});
      });
    }
  
    //default handling for other url
    res.setHeader("Content-type", "text/html");
    res.write("<html><head><title>First page</title></head>");
    res.write("<body><h1>Hello world</h1></body></html>");
    res.end();
    //done creating the response
  }

  module.exports = rqListener;