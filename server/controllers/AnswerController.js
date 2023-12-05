const Answer = require('../models/Answer');
const Comment = require('../models/Comment');
const User = require('../models/User');

const getByCommentId = async (req, res) => {
    const { commentId } = req.params.id;

    const retrieveAllAnswers = async (parentId) => {
        const answers = await Answer.find({ parentId }).populate('user').sort({ createdAt: 1 });

        const childAnswers = await Promise.all(
            answers.map(answer => retrieveAllAnswers(answer._id))
        )

        const flattenedChildAnswers = childAnswers.flat();

        return [...answers, ...flattenedChildAnswers].sort((a, b) => a.createdAt - b.createdAt)
    }
    const allAnswers = await retrieveAllAnswers(commentId);

    res.status(200).json(allAnswers);
}

const create = async (req, res) => {
    const { parentId, parentType } = req.params;
    const { body, commentId } = req.body;
}