const express = require('express');
const app = express();
const connectDB = require('./connection/connection')
const bodyParser = require ('body-parser');
//const router = require ('./routes/router');

const PORT = process.env.PORT || 8080;


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(express.json());

app.use(express.static('public'));

//app.use('/', router);


connectDB();

app.listen(PORT, () => console.log(`YAY server running on http://localhost:${PORT}`));         

module.exports = app;
