import { app } from "../server";

var datastore = require('../database');

app.get('/trackings', getAllTrackingInfo);

function getAllTrackingInfo(req, res) {
    console.log(req.params.trackingCode);
    const query = datastore.createQuery('trackings').limit(10);

    datastore
        .runQuery(query)
        .then(results => {
            const trackings = results[0];
            let trackingsArray: any[] = new Array();

            trackings.forEach(tracking => {
                trackingsArray = trackingsArray.concat(Array.of({ "id": tracking[datastore.KEY].name, "name": tracking.Name }));
            });
            res.json(trackingsArray);
        })
        .catch(err => {
            res.status(404).json({ "error": "100", "message": err.message });
        });
}

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
            res.status(404).json({ "error": "100", "message": "Unable to find any trackingCode with the specified ID." });
        });
}

app.post('/trackings/:trackingCode/location', postTrackingInfo);

function postTrackingInfo(req, res) {
    // The kind for the new entity
    const kind = 'trackings';
    // The name/ID for the new entity
    const id = '5629499534213129';
    // The Cloud Datastore key for the new entity

    const taskKey = datastore.key({
        namespace: "TrackLiveStorage",
        path: [kind, id]
    });

    // Prepares the new entity
    const task = {
        key: taskKey,
        data: {
            Name: 'Radul'
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
}