var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: "237e82b9de84448585a8463ed0d5ec10",
  secret: "9d25a0b1cd1344458107374b1e4d20d6"
});
 
spotify
  .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
  .then(function(data) {
    console.log(data); 
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });