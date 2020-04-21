const discogs = require('../api/discogs');
const spotifyApi = require('../api/spotify').spotifyApi;
// const spotifyAuth = require('../spotifyAuth').spotifyAuth;
// const redirect_uri = 'http://localhost:5000/callback/';
const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

let spotCode = undefined;
let userObj;



app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.use(express.static(path.join(__dirname, '/../client/dist'))); 
app.use(cors());

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
  console.log('collection function')
  let user = req.params.user;
  // 0 is default for all folder of collection (the public folder)
  discogs.getCollection(user, 0)
    .then((collection) => {
      res.send(collection);
    })
});

// create public spotify playlist
app.post('/api/playlist/create/:name', (req, res) => {
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
app.post('/api/playlist/add', (req, res) => {
  let list = req.params.list;
  for (let i = 0; i < list.length; i++) {

  }
})

// find album on spotify
app.get('/api/search/:artist/:album', (req, res) => {
  console.log('hello there')
  let artist = req.params.artist;
  let album = req.params.album;
  spotifyApi.searchArtists(artist)
    .then((data) => {
      console.log(data.body.artists.items[0].id);
      let artistId = data.body.artists.items[0].id;
      return spotifyApi.getArtistAlbums(artistId);
    })
    .then((data) => {
      console.log(data.body)
      let albums = data.body.items;
      for (let i = 0; i < albums.length; i++) {
        if (albums[i].name === album) {
          res.send(albums[i]);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    })
})