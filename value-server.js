import { createServer } from "http";
import { Server } from "socket.io";

const io = new Server(httpServer, { 
  origin: "*"
 });

 let remoteValue = {};
 let extended_data = {
  "image": "https://assets.godcaster.fm/image_18_1733337133.jpg",
  "title": "Unknown Title",
  "line": `line`,
  "description": "Hello Fred! - 830-326-6365",
  "value": {},
  "type": "music",
  "link": `link`,
  "chaptersUrl": `None`,
  "enclosureUrl": "https://c21.radioboss.fm:8239/stream",
  "feedGuid": "35f494b2-cf5a-57cf-860e-198676e27d6f",
  "feedUrl": "https://feeds.godcaster.fm/player_18.xml",
  "medium": "music",
  "itemGuid": "35f494b2-cf5a-57cf-860e-198676e27d6f1740401883",
  "duration": 333.33,
  "startTime": 0
}

// TODO: fill out extended_data

io.on("connection", (socket) => {
  console.log("a user connected: ", socket.id);
  // self.sio.emit('remoteValue', extended_data)
  io.emit('remoteValue', extended_data) //send to all connected clients
});


io.socket.on('remoteValue', function(data) {
  console.log(data);
  remoteValue = data;
  io.emit('remoteValue', remoteValue) //send to all connected clients
})


httpServer.listen(3033);