const spotifyAuth = require('../../spotifyAuth').spotifyAuth;
const SpotifyWebApi = require('spotify-web-api-node');
const scopes = ['playlist-modify-public']

// app authentication 
const spotifyApi = new SpotifyWebApi({
  clientId: spotifyAuth.clientID,
  clientSecret: spotifyAuth.clientSecret,
  redirectUri: 'http://localhost:5000/callback/'
});

// authorize url
// const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

// user authentication
// spotifyApi.setAccessToken('<your_access_token>');

// Create a public playlist
// spotifyApi.createPlaylist('My Cool Playlist', { 'public' : true })
//   .then(function(data) {
//     console.log('Created playlist!');
//   }, function(err) {
//     console.log('Something went wrong!', err);
//   });

// Add tracks to a playlist
// spotifyApi.addTracksToPlaylist('5ieJqeLJjjI8iJWaxeBLuK', ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"])
//   .then(function(data) {
//     console.log('Added tracks to playlist!');
//   }, function(err) {
//     console.log('Something went wrong!', err);
//   });

exports.spotifyApi = spotifyApi;
