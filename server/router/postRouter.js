const express = require('express');
const router = express.Router();
const { PostController } = require('../controllers');
const auth = require('../middleware/auth');

router.get('/getPosts', PostController.getAll);
router.get('/getPost/:id', PostController.getOne);
router.post('/createPost', auth, PostController.createPost);
router.patch('/updatePost/:id', auth, PostController.updatePost);
router.delete('/removePost/:id', auth, PostController.removePost);
router.get('/getUserPost', auth, PostController.getMyPosts);
router.get('/search', PostController.getPostsByTags);
router.get('/getPopularTags', async (req, res) => {
    try {
        const popularTags = await PostController.getPopularTags();
        res.status(200).json({ popularTags });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

module.exports = router;
