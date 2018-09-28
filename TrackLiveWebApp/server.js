var express = require('express');
var Datastore = require('@google-cloud/datastore');
var app = express();
var projectId = 'trackliveapp';
var datastore = new Datastore({
    keyFilename: 'TrackLive-9b74532bc6a2.json'
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
    var query = datastore.createQuery('trackings').filter('__key__', '=', datastore.key(['trackings', req.params.trackingCode]));
    datastore
        .runQuery(query)
        .then(function (results) {
        var task = results[0][0];
        /*tasks.forEach(task => {
            const taskKey = task[datastore.KEY];
            console.log(taskKey.id, task);
        });*/
        var name = task.Name;
        var id = task.Key.name;
        res.json({ "id": req.params.trackingCode, "name": task.Name });
    })
        .catch(function (err) {
        console.error('ERROR:', err);
    });
}
app.listen(3000, function () { return console.log('Example app listening on port 3000!'); });
//# sourceMappingURL=server.js.map