const express = require('express');
const fs = require('fs');
const multer = require('multer');
const config = require('./config');
const cors = require('cors');
const auth = require('./middleware/auth');
const app = express();

const UserRouter = require('./router/userRouter');
const PostRouter = require('./router/postRouter');

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
        }
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

const mongoose = require('mongoose');
const MONGOURL = `mongodb://${config.db.HOST}:${config.db.PORT}/${config.db.DBNAME}`;

mongoose
    .connect(MONGOURL, {
        useNewUrlParser: true,
    })
    .then(() => console.log("Connected to the database successfully"))
    .catch(() => console.log("Connection error"));

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use('/api/v1/user', UserRouter);

app.post('/upload', auth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.use('/api/v1/posts', PostRouter);

app.listen(config.host.PORT, () => {
    console.log("Server is started successfuly");
});