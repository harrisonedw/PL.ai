const discogsAuth = require('../../discogsAuth').discogsAuth; 
const Discogs = require('disconnect').Client;

// Authenticate by consumer key and secret
const dis = new Discogs({
	consumerKey: discogsAuth.consumerKey, 
	consumerSecret: discogsAuth.consumerSecret,
});

const collection = dis.user().collection();
const getCollection = collection.getReleases;

exports.getCollection = getCollection;


