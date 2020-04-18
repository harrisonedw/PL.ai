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

/////// spotify authorization ////////
app.get('/login', function(req, res) {
  let scopes = ['playlist-modify-public'];
  let authorizeURL = spotifyApi.createAuthorizeURL(scopes);

  res.redirect(authorizeURL);
});

app.get('/callback', (req, res) => {
  let code = res.req.query.code;
  spotifyApi.authorizationCodeGrant(code)
    .then((data) => {
      spotifyApi.setAccessToken(data.body.access_token);
      res.redirect('/');
    })
    .catch((error) => {
      console.log(error)
      res.redirect('/login');
    })
});

//////////////////////////////////////


// get users collection from discogs
app.get('/api/collection/:user', (req, res) => {
  let user = req.params.user;
  // 0 is default for all folder of collection (the public folder)
  discogs.getCollection(user, 0)
    .then((collection) => {
      console.log(collection)
    })
})
