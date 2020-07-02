const fs = require('fs');// file system
const { request } = require('http');


const requestHandler = (req,res) =>{
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="mes sage"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    // console.log(req.url, req.method, req.headers);
    // process.exit(); if quit server, people will not be able to read ur webpage anymore
    if(url === '/message' && method === 'POST' ){
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => { // this function is executed when finishing writing the file
                res.statusCode= 302; //302 status code for redirection
                res.setHeader('Location', '/'); //redirect to initial page
                return res.end();
            });
           
        });    
    }   
    
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js</h1></body>');
    res.write('</html>');
    res.end();
};

// module.exports = requestHandler;
module.exports = {
    handler: requestHandler,
    someText: 'Some hard coded text'
};

// module.exports.handler = requestHandler;
// module.exports.someText="Some hard coded text";