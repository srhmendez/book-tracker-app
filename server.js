const express = require('express');
const app = express();
const bodyParser = require ('body-parser');
const router = require ('./routes/router');

const PORT = 8000;


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(express.json());

app.use(express.static(path.join(__dirname + '/public')));

app.use('/', router);


// connectDB();

app.listen(PORT, () => console.log(`YAY server running on http://localhost:${PORT}`));         

module.exports = app;
