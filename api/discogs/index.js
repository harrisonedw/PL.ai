const discogsAuth = require('../../discogsAuth').discogsAuth; 
const Discogs = require('disconnect').Client;

// Authenticate by consumer key and secret
var dis = new Discogs({
	consumerKey: discogsAuth.consumerKey, 
	consumerSecret: discogsAuth.consumerSecret,
});

let collection = dis.user().collection();

exports.collection = collection;


