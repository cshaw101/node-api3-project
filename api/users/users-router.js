const express = require('express');
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware');
const Users = require('./users-model')
const Posts = require('../posts/posts-model')


// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving users", error: err.message });
  }
});

router.get('/:id', validateUserId,  (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user);
});

router.post('/',validateUser, async (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  try {
  const newUser = await Users.insert(req.body);
  res.status(201).json(newUser)
  }catch (err) {
  res.status(500).json({ message: "Error creating user", error: err.message });
  }
});

router.put('/:id', validateUserId, validateUser, async (req, res) => {
  try {
    const updatedUser = await Users.update(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Error updating user", error: err.message });
  }
});

router.delete('/:id', validateUserId, async (req, res) => {
  try {
    const deletedCount = await Users.remove(req.params.id);
    if (deletedCount) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  try {
    const posts = await Users.getUserPosts(req.params.id);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving user's posts", error: err.message });
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
  try {
    const newPost = await Posts.insert({ ...req.body, user_id: req.params.id });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: "Error creating post", error: err.message });
  }
});

// do not forget to export the router

module.exports = router