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
    },
    {
        timestamps: true
    }
);

const Comment = mongoose.model('comments', CommentSchema);

module.exports = Comment;