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

    users.push({ name, id: socket.id, room: { name: "", id: "" } });

    io.emit("users", { users });

    callback();
  });

  socket.on("join", ({ roomName, roomId }, callback) => {
    if (!roomName || !roomId) return callback("bad request");

    const user = getUserById(socket.id);

    user.room = { name: roomName, id: roomId };

    const filtered = users.filter((u) => u.id !== user.id);

    users = [...filtered, user];

    socket.join(user.room.id);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to room ${user.room.name}`,
    });
    socket.broadcast
      .to(user.room.id)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    io.to(user.room.id).emit("roomData", {
      room: user.room.name,
      roomMate: getUsersInRoom(user.room.id),
    });
  });

  socket.on("disconnect", () => {
    const user = getUserById(socket.id);

    if (!user) return;

    const filtered = users.filter((u) => u.id !== user.id);

    users = [...filtered];

    // admin message
    io.to(user.room.id).emit("message", {
      user: "admin",
      text: `${user.name} has left.`,
    });
    // room data
    io.to(user.room.id).emit("roomData", {
      room: user.room.name,
      roomMate: getUsersInRoom(user.room.id),
    });
    // users data
    io.emit("users", { users });
  });
});

server.listen(5000, () => console.log("I am listening at port: 5000 :)"));
