const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

/**
 * @route GET api/auth
 * @desc Auth the user
 * @access Public
 */
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // simple validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  // Check existing user
  User.findOne({ email }).then(user => {
    if (!user) { return res.status(400).json({ message: 'User does not exist' }); }

    // validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) { return res.status(400).json({ message: 'Invalid credentials' }); }

      jwt.sign({ id: user._id }, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
        if (err) { throw err; }
        res.json({
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
        });
      });
    });
  });
});

/**
 * @route GET api/auth/user
 * @desc Get user data
 * @access Private
 */
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

module.exports = router;
