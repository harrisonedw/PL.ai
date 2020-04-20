const discogs = require('../api/discogs');
const spotifyApi = require('../api/spotify').spotifyApi;
// const spotifyAuth = require('../spotifyAuth').spotifyAuth;
// const redirect_uri = 'http://localhost:5000/callback/';
const path = require('path');
const express = require('express');
const app = express();
const port = 5000;

let spotCode = undefined;
let userObj;

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
  spotCode = res.req.query.code;
  spotifyApi.authorizationCodeGrant(spotCode)
    .then((data) => {
      // console.log(data.body.access_token)
      spotifyApi.setAccessToken(data.body.access_token);
      spotifyApi.setRefreshToken(data.body.refresh_token);
      return spotifyApi.getMe();
    })
    .then((data) => {
      userObj = data.body;
      // console.log(userObj)
      res.send(data.body.id);
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
      console.log(collection);
    })
});

// create public spotify playlist
app.get('/api/playlist/create/:name', (req, res) => {
  // spotifyApi.refreshAccessToken();
  let name = req.params.name;
  spotifyApi.createPlaylist(userObj.id, name, { public: true })
    .then((data) => {
      console.log('Playlist Created ', data.name);
      res.send(data.id);
      res.redirect('/');
    })
    .catch((error) => {
      console.log('Something went wrong!', error);
    })
});

// add songs to playlist
app.get('/api/playlist/add', (req, res) => {
  let list = req.params.list;
  for (let i = 0; i < list.length; i++) {

  }
})