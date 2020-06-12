const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const core = require('./core');
const config = require('./configs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

core.db.connect(config.db.url);

require('./routes')(app);

app.use((err, req, res, next) => { 
    res.status(400);
    console.log(err);
    res.json({ suc: false, error: err.message });
});

app.listen(3000, () => console.log(`app listening on port!`))