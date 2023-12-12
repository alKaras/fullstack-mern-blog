const express = require('express');
const router = express.Router();
const { PostController } = require('../controllers');
const auth = require('../middleware/auth');

router.get('/getPosts', PostController.getAll);
router.get('/getPostTags', PostController.getLastTags);
router.get('/getPost/:id', PostController.getOne);
router.post('/createPost', auth, PostController.createPost);
router.patch('/updatePost/:id', auth, PostController.updatePost);
router.delete('/removePost/:id', auth, PostController.removePost);
router.get('/getUserPost', auth, PostController.getMyPosts);
router.get('/search', PostController.getPostsByTags);
router.get('/getTags', PostController.getLastTags);

module.exports = router;
