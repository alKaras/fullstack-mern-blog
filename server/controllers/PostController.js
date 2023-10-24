const Post = require('../models/Post')

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user').exec();
        return res.status(200).json({ post: posts });
    } catch (error) {
        return res.status(500).json({ message: "Пости не знайдені" });
    }
}

const getPost = async (req, res) => {
    try {
        const postId = req.params.id;
        Post.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                $inc: { viewsCount: 1 },
            },
            {
                returnDocument: 'after',
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Не вдається отримати статті',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Стаття не знайдено',
                    });
                }

                res.json(doc);
            },
        ).populate('user');

    } catch (error) {
        res.status(500).json({
            message: 'Не вдалось знайти статті'
        })
    }
}

const createPost = async (req, res) => {
    try {
        const { title, text, tags, imageUrl } = req.body;
        const doc = new Post.create({
            title: title,
            text: text,
            tags: tags.split(","),
            user: req.userId,
            imageURL: imageUrl,
        });
        const post = await doc.save();
        res.status(200).json(post);

    } catch (error) {
        res.status(500).json({
            message: "Не вдалось створити статтю"
        })
    }
}

const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, text, tags, imageUrl } = req.body;

        const updatedPost = await Post.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                title: title,
                text: text,
                imageURL: imageUrl,
                tags: tags.split(','),
                user: req.userId,
            }
        )
    } catch (error) {
        res.status(500).json({ message: 'Статтю не знайдено' });
    }
}