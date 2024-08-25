const Users = require('../posts/posts-model')


function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )}`
  );

  next();
}

async function validateUserId(req, res, next) {
  try {
    const { id } = req.params;  // Extract the id from request parameters

    // Find the user by id (await is necessary since it's asynchronous)
    const user = await Users.getById(id);  // Assumes getById is a method in users-model.js

    if (user) {
      // If user exists, attach the user object to req.user and proceed
      req.user = user;
      next();
    } else {
      // If no user is found, send a 404 error
      res.status(404).json({ message: "user not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error retrieving user", error: err.message });
  }
}


function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}