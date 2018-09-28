const express = require('express');
const Datastore = require('@google-cloud/datastore');

const app = express()

const projectId = 'trackliveapp';

const datastore = new Datastore({
    keyFilename: 'TrackLive-37a9de7817c3.json'
});

/*
// The kind for the new entity
const kind = 'trackings';
// The name/ID for the new entity
const id = '5639445604728832';
// The Cloud Datastore key for the new entity
const taskKey = datastore.key([kind, id]);

// Prepares the new entity
const task = {
    key: taskKey,
    data: {
        Name: 'Radu',
    },
};

datastore
    .save(task)
    .then(() => {
        console.log(`Saved ${task.key.name}: ${task.data.Name}`);
    })
    .catch(err => {
        console.error('ERROR:', err);
    });*/

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
            console.error('ERROR:', err);
        });
}

app.listen(3000, () => console.log('Example app listening on port 3000!'));



