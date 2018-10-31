var express = require('express');
export var app = express();

require("./controllers/routes");

app.listen(8080, () => console.log('Example app listening on port 8080!'));