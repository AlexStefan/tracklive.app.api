const express = require('express');
const Datastore = require('@google-cloud/datastore');

const app = express()

const datastore = new Datastore({
    keyFilename: 'TrackLive-37a9de7817c3.json'
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
        Name: 'Test1'
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

app.get('/trackings/:trackingCode', getTrackingInfo);

function getTrackingInfo(req, res) {
    console.log(req.params.trackingCode);
    const query = datastore.createQuery('trackings').filter('__key__', '=', datastore.key(['trackings', req.params.trackingCode]));

    datastore
        .runQuery(query)
        .then(results => {
            const task = results[0][0];
            res.json({ "id": req.params.trackingCode, "name": task.Name });
        })
        .catch(err => {
            res.json({ "error": "Unable to find any trackingCode with the specified ID." });
            console.error('ERROR:', err);
        });
}

app.listen(8080, () => console.log('Example app listening on port 3000!'));



