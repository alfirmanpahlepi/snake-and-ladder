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
      isReady: false,
    });

    io.emit("users", { users });

    callback();
  });

  socket.on("join", ({ roomName, roomId }, callback) => {
    if (!roomName || !roomId) return callback("bad request");

    const user = getUserById(socket.id);

    if (!user) return callback("forbidden");

    const userIndex = users.findIndex((u) => u.id === socket.id);

    const usersInRoom = getUsersInRoom(roomId);

    // console.log(use.room.maxPlayer,get);

    if (usersInRoom.length) {
      if (usersInRoom[0].room.maxPlayer == usersInRoom.length)
        return callback("room is full");

      users[userIndex].room = {
        name: roomName,
        id: roomId,
        admin: usersInRoom[0].room.admin,
        maxPlayer: usersInRoom[0].room.maxPlayer,
      };
    } else
      users[userIndex].room = {
        name: roomName,
        id: roomId,
        admin: user.name,
        maxPlayer: 5,
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
      roomMate: getUsersInRoom(user.room.id),
    });

    io.emit("users", { users });

    callback();
  });

  socket.on("sendMessage", ({ message }, callback) => {
    const user = getUserById(socket.id);

    if (!user) return;

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

  socket.on("toggleReady", (callback) => {
    const user = getUserById(socket.id);

    if (!user) return callback("forbidden");

    const userIndex = users.findIndex((u) => u.id === user.id);

    user.isReady
      ? (users[userIndex].isReady = false)
      : (users[userIndex].isReady = true);

    io.emit("users", { users });

    io.to(user.room.id).emit("roomData", {
      roomMate: getUsersInRoom(user.room.id),
    });

    callback();
  });

  socket.on("settings", ({ maxPlayer }, callback) => {
    const user = getUserById(socket.id);

    if (!user) return callback("forbidden");

    const roomMate = getUsersInRoom(user.room.id);

    let userIndex = 0;
    roomMate.forEach((usr) => {
      userIndex = users.findIndex((u) => u.id === usr.id);
      users[userIndex].room.maxPlayer = maxPlayer;
    });

    io.emit("users", { users });

    io.to(user.room.id).emit("roomData", {
      roomMate: getUsersInRoom(user.room.id),
    });

    callback();
  });

  socket.on("play", ({ movement }, callback) => {
    const user = getUserById(socket.id);

    if (!user) return callback("user not found");

    const roomMate = users.filter((u) => u.room.id === user.room.id);

    const userIndexInRoom = roomMate.findIndex((u) => u.id === socket.id);

    const nextIndexPlayer =
      userIndexInRoom < roomMate.length - 1 ? userIndexInRoom + 1 : 0;

    io.to(user.room.id).emit("play", {
      movement,
      username: user.name,
      color: roomMate[nextIndexPlayer].color,
      nextPlayer: roomMate[nextIndexPlayer].name,
    });
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
      roomMate: getUsersInRoom(user.room.id),
    });
    // users data
    io.emit("users", { users });
  });
});

server.listen(5000, () => console.log("I am listening at port: 5000 :)"));
