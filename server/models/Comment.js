const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
    {
        body: {
            type: String,
            require: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'posts'
        },
        answers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'answers',
        }],
    },
    {
        timestamps: true
    }
);

const Comment = mongoose.model('comments', CommentSchema);

module.exports = Comment;