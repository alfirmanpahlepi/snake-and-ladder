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

let online = [];

// const user = {
//     name:"",
//     id:"",
//     room:""
// }

const getUserById = (id) => online.find((user) => user.id === id);

const getUsersInRoom = (room) => online.filter((user) => user.room === room);

io.on("connect", (socket) => {
  socket.on("online", ({ name }, callback) => {
    const existingUser = online.some((user) => user.name === name);

    if (existingUser) return callback("name is already exist");

    online.push({ name, id: socket.id, room: "" });

    io.emit("users", { users: online });

    callback();
  });

  socket.on("disconnect", () => {
    const user = getUserById(socket.id);

    if (!user) return;

    const filtered = online.filter((u) => u.id !== user.id);

    online = [...filtered];

    // admin message
    io.to(user.room).emit("message", {
      user: "Admin",
      text: `${user.name} has left.`,
    });
    // room data
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    // online data
    io.emit("users", { users: online });
  });
});

server.listen(5000, () => console.log("I am listening at port: 5000 :)"));
