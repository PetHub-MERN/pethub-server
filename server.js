const app = require("./app");

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT || 5005;

const server = require('http').Server(app);

const socketIO = require('socket.io')(server, {
  cors: {
    origin: process.env.ORIGIN
  }
})

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('disconnection', () => {
    console.log('🔥: A user disconnected');
  })
})

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
