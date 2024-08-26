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
    const { id } = req.params;
    const user = await Users.getById(id);

    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(404).json({ message: "user not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Error retrieving user", error: err.message });
  }
}


function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({message: "missing required name field"})
  }
  next()
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body

  if (!text) {
    return res.status(400).json({message: "missing required text field"})
  }
  next()
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}