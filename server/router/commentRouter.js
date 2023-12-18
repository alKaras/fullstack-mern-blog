const express = require('express');
const router = express.Router();
const { CommentController } = require('../controllers');
const auth = require('../middleware/auth');

router.get('/:id/getCommentsByPost', CommentController.getByPostId);
router.get('/:id/getAmount', CommentController.getAmountComments);
router.post('/:id/createComment', auth, CommentController.createComment);

module.exports = router;

