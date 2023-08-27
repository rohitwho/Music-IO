

const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utls/auth.js");
const routes = require("./routes/index.js");

const dotenv = require("dotenv").config();
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
var bodyParser = require("body-parser");

var cors = require("cors");

const PORT = process.env.PORT || 3002;

const app = express();
app.use(cors());
const { createServer } = require ( "http");
const { Server } = require  ("socket.io");

const httpServer = createServer(app);






app.use(bodyParser.json());
app.use(routes);
app.use(express.urlencoded({ extended: false }));

// const httpServer = createServer(app);


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
}
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  try {
    console.log("Apollo Server Running....")
    await server.start();
    server.applyMiddleware({ app });

    const io = new Server(httpServer, {
      cors: {
        origin: "http://localhost:5173"
      }
    });
  
    io.on('connection', socket => {
      console.log("Socket connection", socket.id);



      
      
      socket.on("join_room",(data)=>{
        socket.join(data)
        
        console.log(`user with id : ${socket.id} joined room:${data}`)
      })
      socket.on("users",(data)=>{
        console.log(data)
        socket.to(data.chatRoom).emit("user_data",data)
      })


      socket.on("send_message",(data)=>{
socket.to(data.chatRoom).emit("message_Recieved", data)
      })


      socket.on("disconnect",(data)=>{
        socket.emit("user_disconnected",data)
        console.log(`user with ${socket.id} disconnected ${data}`)
      })


    });
  
    httpServer.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
     
    });
  } catch (error) {
    console.error("Error during server startup:", error);
  }
};
startApolloServer();
//   // db.once("open", () => {
//   //   // sServer.listen(PORT, () => {
//   //   //   console.log(`API server running on port ${PORT}!`);
//   //   //   console.log(
//   //   //     `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
//   //   //   );
//   //   // });
//   // });

// // Call the async function to start the server
