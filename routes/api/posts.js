const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Post = require('../../models/Post').default;

/**
 * @route POST api/posts
 * @desc Submit a post
 * @access Private
 */
router.post('/', auth, (req, res) => {
  const { text } = req.body;

  // simple validation
  if (!text) {
    return res.status(400).json({ message: 'Please enter some text' });
  }

  const post = new Post({ text, userId: req.user.id });
  post.save().then(post => res.status(200).json({ success: true }));
});


/**
 * @route GET api/posts
 * @dec Fetches posts for the current user
 * @access Private
 */
router.get('/', auth, (req, res) => {
  Post.find({ userId: req.user.id })
    .select('-userId')
    .sort({ creationDate: 'desc' })
    .then(posts => {
      res.status(200).json(posts.toJSON({ virtuals: true }));
    });
});

module.exports = router;
