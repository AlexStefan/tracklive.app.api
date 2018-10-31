const Datastore = require('@google-cloud/datastore');

const database = new Datastore({
    keyFilename: 'TrackLive-37a9de7817c3.json'
});

module.exports = database;
