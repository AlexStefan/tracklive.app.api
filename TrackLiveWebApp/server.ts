const express = require('express');
const Datastore = require('@google-cloud/datastore');

const app = express()

const datastore = new Datastore({
    keyFilename: 'TrackLive-9b74532bc6a2.json'
});


// The kind for the new entity
const kind = 'trackings';
// The name/ID for the new entity
const id = '5629499534213121';
// The Cloud Datastore key for the new entity

const taskKey = datastore.key({
    namespace: "TrackLiveStorage",
    path: [kind, id]
});

// Prepares the new entity
const task = {
    key: taskKey,
    data: {
        Name: 'Test1',
    },
};

datastore
    .save(task)
    .then(() => {
        console.log(`Saved ${task.key.name}: ${task.data.Name}`);
    })
    .catch(err => {
        console.error('ERROR:', err);
    });

app.get('/trackings/:tagId/about', (req, res) => res.send(req.params.tagId));
app.get('/trackings/:tagId/locations', (req, res) => res.send("location" + req.params.tagId));

app.listen(3000, () => console.log('Example app listening on port 3000!'));



