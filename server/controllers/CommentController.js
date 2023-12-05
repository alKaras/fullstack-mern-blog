const Comment = require('../models/Comment')
const Post = require('../models/Post')

const getByPostId = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user;

        const comments = await Comment.find({ post: postId }).populate('user');

        res.status(200).json(comments);

    } catch (err) {
        res.status(404).json({ message: "Коментарів не знайдено" })
    }
}

const createComment = async (req, res) => {
    const postId = req.params.id;
    const { body } = req.body;
    const user = req.user;

    const comment = new Comment({
        body,
        post: postId,
        user: user
    })

    await comment.save();
    await comment.populate('user');
    const post = await Post.findById(postId);

    if (!post) {
        res.status(404).json({ message: 'Статті не знайдено' });
    }

    post.comments.push(comment._id)
    await post.save();

    res.status(200).json(comment);
}

module.exports = {
    getByPostId,
    createComment
}