const Comment = require('../models/Comment')
const Post = require('../models/Post')

const getByPostId = async (req, res) => {
    try {
        const postId = req.params.id;

        const comments = await Comment.find({ post: postId }).populate('user', 'nickname');

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
        body: body,
        post: postId,
        user: user
    })

    await comment.save();
    await comment.populate('user', 'nickname');
    const post = await Post.findByIdAndUpdate(
        {
            _id: postId,
        },
        {
            $inc: { commentsCount: 1 },
        }
    );

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