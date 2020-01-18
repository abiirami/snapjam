
var http = require('http');

//create a server object:
http.createServer(function (req, res) {
  res.write('SNAP JAMS'); //write a response to the client
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080
const request = require('request');



// ********** Calling google API *********
request('https://vision.googleapis.com', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body.url);
  console.log(body.explanation);
});