const app = require("./app");

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT || 5005;

const server = require('http').Server(app);

const socketIO = require('socket.io')(server, {
  cors: {
    origin: process.env.ORIGIN
  }
})

let users = [];

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  // sends the message to all the users on the server
  socket.on('message', (data) => {
    socketIO.emit('messageResponse', data);
  })

  socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

  // listens when a new user joins the server
  socket.on('newUser', (data) => {
    // adds the new user to the list of users
    let userAlreadyExists = false;
    let userIndex;

    users.forEach((user, index) => {
      if(user.userNameFromAuth === data.userNameFromAuth) {
        userAlreadyExists = true;
        userIndex = index;
        console.log(index)
        return;
      }
    })

    if(userAlreadyExists) {
      console.log(users);
      users.splice(userIndex, 1);
      users.push(data);
    } else {
      users.push(data);
    }

    // sends the list of users back to the client
    socketIO.emit('newUserResponse', users)
  })

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    // updates the list of users when one is disconnected
    users = users.filter((user) => user.socketID !== socket.id);
    socketIO.emit('newUserResponse', users);
    socket.disconnect();
  })
})

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
