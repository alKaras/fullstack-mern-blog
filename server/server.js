const express = require('express');
const config = require('./config');
const cors = require('cors');

const app = express();

const UserRouter = require('./router/userRouter');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.listen(config.host.PORT, () => {
    console.log("Server is started successfuly");
});

const mongoose = require('mongoose');
const MONGOURL = `mongodb://${config.db.HOST}:${config.db.PORT}/${config.db.DBNAME}`;

mongoose
    .connect(MONGOURL, {
        useNewUrlParser: true,
    })
    .then(() => console.log("Connected to the database successfully"))
    .catch(() => console.log("Connection error"));

app.use('/api/v1/user', UserRouter);