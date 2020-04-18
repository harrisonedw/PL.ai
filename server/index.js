const discogs = require('../api/discogs');
const spotifyApi = require('../api/spotify').spotifyApi;
// const spotifyAuth = require('../spotifyAuth').spotifyAuth;
// const redirect_uri = 'http://localhost:5000/callback/';
const path = require('path');
const express = require('express');
const app = express();
const port = 5000;
console.log(spotifyApi)

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.use(express.static(path.join(__dirname, '/../client/dist')));


app.get('/login', function(req, res) {
  let scopes = ['playlist-modify-public'];
  let authorizeURL = spotifyApi.createAuthorizeURL(scopes);

  res.redirect(authorizeURL);

  // res.redirect('https://accounts.spotify.com/authorize' +
  //   '?response_type=code' +
  //   '&client_id=' + spotifyAuth.clientID +
  //   (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
  //   '&redirect_uri=' + encodeURIComponent(redirect_uri));
  // });
});

app.get('/callback', (req, res) => {
  let code = res.req.query.code;
  spotifyApi.authorizationCodeGrant(code)
    .then((data) => {
      console.log('token', data.body.access_token)
    })
    .catch((error) => {
      console.log(error)
    })
  // res.redirect('/');
});
