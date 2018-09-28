const express = require('express');
const Datastore = require('@google-cloud/datastore');

const { Compute } = require('google-auth-library');

/**
* Acquire a client, and make a request to an API that's enabled by default.
*/
async function main() {
    const client = new Compute({
        // Specifying the serviceAccountEmail is optional. It will use the default
        // service account if one is not defined.
        serviceAccountEmail: 'bendincuta@gmail.com'
    });
    const projectId = 'TrackLive';
    const url = `https://www.googleapis.com/dns/v1/projects/${projectId}`;
    const res = await client.request({url});
    console.log(res.data);
}

main().catch(console.error);

const app = express()

const projectId = 'trackliveapp';

const datastore = new Datastore({
    projectId: projectId,
});


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
        Name: 'Test12324',
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



