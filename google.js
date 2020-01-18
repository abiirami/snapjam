const request = require('request');
// ********** Calling google API *********
request('https://vision.googleapis.com', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body.url);
  console.log(body.explanation);
});