const Post = require('../models/Post')

const getLastTags = async (req, res) => {
    try {
        const posts = await Post.find().limit(5).exec();

        const tags = posts
            .map((obj) => obj.tags)
            .flat()
            .slice(0, 5);
        res.json(tags);
    } catch (error) {
        res.status(500).json({ message: 'Не вдалось отримати теги' })
    }
}

const getPopularTags = async (req, res) => {
    try {
        const popularTags = await Post.aggregate([
            { $unwind: '$tags' },
            {
                $group: {
                    _id: '$tags',
                    viewsCount: { $sum: '$viewsCount' },
                },
            },
            { $sort: { viewsCount: -1 } },
            { $limit: 5 },
        ]);

        return popularTags;
    } catch (error) {
        console.error('Error retrieving popular tags:', error);
        throw error;
    }
}

const getAll = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'nickname').exec();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Не вдалось отримати статті" })
    }
}

const getPostsByTags = async (req, res) => {
    try {
        const { values } = req.query;
        const tagsArr = typeof values === 'string' ? values.split(', ').map(tag => tag.trim()) : [];
        if (tagsArr.length < 2) {
            const posts = await Post.find({ tags: { $in: values } })
                .populate('user', 'nickname')
                .exec();
            res.status(200).json(posts);
        } else if (tagsArr.length !== 0) {
            const posts = await Post.find({ tags: { $all: tagsArr } })
                .populate('user', 'nickname')
                .exec();
            res.status(200).json(posts);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

const getMyPosts = async (req, res) => {
    try {
        const usid = req.user;
        const gotPosts = await Post.find({ user: usid })
        res.status(200).json(gotPosts);
    } catch (error) {
        res.status(500).json({ message: "не вдалось отримати пости" });
    }
}

const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                $inc: { viewsCount: 1 },
            },
            {
                returnDocument: 'after',
            }
        ).populate('user', 'nickname');

        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Не вдалось отримати статтю " });
    }
}

const createPost = async (req, res) => {
    try {
        const doc = new Post({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(', '),
            user: req.user
        });

        const post = await doc.save();
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Не вдалось створити статтю" })
    }
}

const removePost = async (req, res) => {
    try {
        const postId = req.params.id;

        const delPost = await Post.findOneAndDelete(
            {
                _id: postId,
            }
        );

        res.status(200).json(delPost)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Не вдалось отрмати статті" })
    }
}

const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;

        await Post.updateOne(
            {
                _id: postId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                user: req.user,
                tags: req.body.tags.split(', '),
            },
        );

        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'не вдалось отримати статтю' })
    }
}

module.exports = {
    getLastTags,
    getOne,
    getAll,
    createPost,
    removePost,
    updatePost,
    getMyPosts,
    getPostsByTags,
    getPopularTags
}