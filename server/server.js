import express from "express";
import { Server } from "socket.io";
import {createServer} from "http"
import  cors  from "cors"


const port = 3000;
const app  = express();

const server = new createServer(app)

const io = new Server(server, {
    cors:{
        origin: "*",
        methods: ["GET", "POST"],
        credentials: "true"
    }
});


app.use(cors(
    {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: "true"
}))

io.on("connection", (socket)=>{
console.log("user connected")
console.log("Id", socket.id)


// socket.emit("welcome", "Welcome to the server");
// socket.broadcast.emit("welcome", `${socket.id} joined the server`)

socket.on("message", (data)=>{{

    console.log(data)
    io.to(data.room).emit("receive-message", data.message)
}})

socket.on("room-join", (data)=>{

    socket.join(data);
    console.log(" User joined the room",data)

})

socket.on("disconnect", ()=>{
    console.log("User disconnected", socket.id)
})

})

app.get("/", (req, res)=>{
  res.send("Hello world")
})


server.listen(port, ()=>{

console.log(`Sever is running on port ${port} `)

})

