const express = require("express");
const cors = require("cors");
const app = express();

const http = require("http");
const { Server } = require("socket.io");

app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://splendid-capybara-4deac6.netlify.app",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("user connected : ", socket.id);
  socket.on("join_room", (data) => {
    socket.join(data);
    // console.log("user with id : ", socket.id, "room : ", data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnect", socket.id);
  });
});

server.listen(5000, () => {
  console.log("server running");
});
