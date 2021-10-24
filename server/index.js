const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(
  router.get("/", (req, res) => {
    res.send({ response: "Server is up and running." }).status(200);
  })
);

let users = [];

// const user = {
//     name:"",
//     id:"",
//     room:{ name:"", id:"" }
// }

const getUserById = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (roomId) =>
  users.filter((user) => user.room.id === roomId);

io.on("connect", (socket) => {
  socket.on("online", ({ name }, callback) => {
    const existingUser = users.some((user) => user.name === name);

    if (existingUser) return callback("name is already taken");

    users.push({
      name,
      id: socket.id,
      room: { name: "", id: "", admin: "" },
      color: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
    });

    io.emit("users", { users });

    callback();
  });

  socket.on("join", ({ roomName, roomId }, callback) => {
    if (!roomName || !roomId) return callback("bad request");

    const user = getUserById(socket.id);

    const userIndex = users.findIndex((u) => u.id === socket.id);

    const usersInRoom = getUsersInRoom(roomId);

    if (usersInRoom.length)
      users[userIndex].room = {
        name: roomName,
        id: roomId,
        admin: usersInRoom[0].room.admin,
      };
    else
      users[userIndex].room = {
        name: roomName,
        id: roomId,
        admin: user.name,
      };

    socket.join(user.room.id);

    socket.emit("message", {
      user: "system",
      text: `${user.name}, welcome to room ${user.room.name}`,
    });
    socket.broadcast
      .to(user.room.id)
      .emit("message", { user: "system", text: `${user.name} has joined!` });

    io.to(user.room.id).emit("roomData", {
      room: user.room.name,
      id: user.room.id,
      admin: user.room.admin,
      roomMate: getUsersInRoom(user.room.id),
    });

    io.emit("users", { users });

    callback();
  });

  socket.on("sendMessage", ({ message }, callback) => {
    const user = getUserById(socket.id);

    io.to(user.room.id).emit("message", {
      user: user.name,
      text: message,
    });

    callback();
  });

  socket.on("inviteUser", ({ target }, callback) => {
    if (target.room.id) return callback("user already in room");

    const user = getUserById(socket.id);

    if (!user) return callback("user not found");

    socket
      .to(target.id)
      .emit("invite", { roomName: user.room.name, roomId: user.room.id });

    callback();
  });

  socket.on("kickUser", ({ target }, callback) => {
    const user = getUserById(socket.id);

    if (user.room.admin !== user.name || !user) return callback("forbidden");

    socket.to(target.id).emit("kicked", "you has kicked by admin");

    io.to(user.room.id).emit("message", {
      user: "system",
      text: `${target.name} has kicked by ${user.name}!`,
    });

    callback();
  });

  socket.on("disconnect", () => {
    const user = getUserById(socket.id);

    if (!user) return;

    socket.leave(user.room.id);

    const filtered = users.filter((u) => u.id !== user.id);

    users = [...filtered];

    // admin message
    io.to(user.room.id).emit("message", {
      user: "system",
      text: `${user.name} has left.`,
    });
    // room data
    io.to(user.room.id).emit("roomData", {
      room: user.room.name,
      id: user.room.id,
      admin: user.room.admin,
      roomMate: getUsersInRoom(user.room.id),
    });
    // users data
    io.emit("users", { users });
  });
});

server.listen(5000, () => console.log("I am listening at port: 5000 :)"));
