import { app } from "../server";
import { parseDate } from "tough-cookie";

var datastore = require('../database');
var bodyParser = require("body-parser");

app.use(bodyParser.json());

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
    const kind = 'locations';
    // The name/ID for the new entity
    const id = 1000000000000000 + Math.floor(Math.random() * Math.floor(89999999999999));
    // The Cloud Datastore key for the new entity
    const taskKey = datastore.key({
        namespace: "TrackLiveStorage",
        path: [kind, id]
    });

    // Prepares the new entity
    const task = {
        key: taskKey,
        data: {
            Name: 'Location',
            CreatedAt: new Date().toLocaleString(),
            bearing: req.body.bearing,
            latitude: parseFloat(req.body.latitude),
            longitude: parseFloat(req.body.longitude),
            speed: parseInt(req.body.speed),
            time: new Date().toLocaleString(),
            trackingId: req.params.trackingCode
        },
    };

    datastore
        .save(task)
        .then(() => {
            res.json({ "message": "Location successfully added!", "id": id });
        })
        .catch(err => {
            res.status(404).json({ "error": "100", "message": "Unable to add a location with the specified parameters." });
        });
}

app.get('/trackings/:trackingCode/location', getTrackingLocation);

function getTrackingLocation(req, res) {
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