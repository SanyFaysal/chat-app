const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const http = require("http");
const { Server } = require("socket.io");

app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
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

// const uri =
//   "mongodb+srv://user:BDpqnUpnFm5aZARO@cluster0.io2rf.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });
async function run() {
  try {
    // await client.connect();
    // const userCollection = client.db("mern-stack-project").collection("user");
    // const messageCollection = client
    //   .db("mern-stack-project")
    //   .collection("messages");
    // const projectCollection = client
    //   .db("mern-stack-project")
    //   .collection("project");
    // app.post("/user", async (req, res) => {
    //   const user = req.body;
    //   const result = await userCollection.insertOne(user);
    //   res.send(result);
    // });
    // app.get("/user/:email", async (req, res) => {
    //   const result = await userCollection
    //     .find({ email: req.params.email })
    //     .toArray();
    //   res.send(result);
    // });
    // app.post("/message", async (req, res) => {
    //   const user = req.body;
    //   const result = await messageCollection.insertOne(user);
    //   res.send(result);
    // });
    // app.get("/message", async (req, res) => {
    //   const result = await messageCollection.find({}).toArray();
    //   res.send(result);
    // });
    // app.post("/project", async (req, res) => {
    //   const project = req.body;
    //   const result = await projectCollection.insertOne(project);
    //   res.send(result);
    // });
    // app.get("/project", async (req, res) => {
    //   const result = await projectCollection.find({}).toArray();
    //   res.send(result);
    // });
    // app.put("/user/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const details = req.body;
    //   const filter = { _id: ObjectId(id) };
    //   const options = { upsert: true };
    //   const updateDoc = {
    //     $set: {
    //       name: details?.name,
    //       email: details?.email,
    //       phone: details?.phone,
    //       address: details?.address,
    //       dob: details?.dob,
    //       graduation: details?.graduation,
    //       img: details?.img,
    //     },
    //   };
    //   const result = await userCollection.updateOne(filter, updateDoc, options);
    //   res.send(result);
    // });
  } finally {
  }
}

run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("hello world ");
});
app.listen(5001, () => {
  console.log("example app listening port  ", 5001);
});
