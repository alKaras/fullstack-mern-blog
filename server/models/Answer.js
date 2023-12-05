const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'answers',
    }],
}, { timestamps: true })

const Answer = mongoose.model('answers', answerSchema)

module.exports = Answer;