const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        text: {
            type: String,
            require: true,
            unique: true,
        },
        tags: {
            type: Array,
            default: [],
        },
        viewsCount: {
            type: Number,
            default: 0,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            require: true,
        },
        imageURL: String,
    },
    {
        timestamps: true,
    },
);

const Post = mongoose.model('posts', PostSchema);
module.exports = Post;