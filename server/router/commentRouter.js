const express = require('express');
const router = express.Router();
const { CommentController } = require('../controllers');
const auth = require('../middleware/auth');

router.get('/:id/getCommentsByPost', auth, CommentController.getByPostId);
router.post('/:id/createComment', auth, CommentController.createComment);

module.exports = router;

