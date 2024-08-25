// require your server and launch it
const server = require('./api/server')

const port = process.env.PORT || 3001;



server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });