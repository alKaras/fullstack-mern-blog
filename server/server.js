const express = require('express');
const config = require('./config');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.listen(config.host.PORT, () => {
    console.log("Server is started successfuly");
});