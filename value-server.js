// import { createServer } from "http";
import { Server } from "socket.io";

import dotenv from 'dotenv';
dotenv.config();


const io = new Server(3033,{
  cors: {
    origin: "*"
  }
});

let remoteValue = {};
let extended_data = {
  "image": "https://cdn.kolomona.com/podcasts/lightning-thrashes/000/000-Lightning-Thrashes-Live-1000.jpg",
  "title": "Lightning Thrashes 24hr Pre-recorded Livestream",
  "line": `line`,
  "description": "This is a test of triggering value time splits for my icecast stream that plays Lightning Thrashes episodes 24/7",
  "value": {},
  "type": "music",
  "link": `link`,
  "chaptersUrl": '',
  "enclosureUrl": process.env.ICECAST_STREAM_URL,
  "feedGuid": "d5e73072-64a2-56a3-9dcd-4a00bfe561d5",
  "feedUrl": "https://sirlibre.com/lightning-thrashes-rss.xml",
  "medium": "podcast",
  "itemGuid": "35f494b2-cf5a-57cf-860e-198676e27d6f1740401883",
  "duration": 333.33,
  "startTime": 0
}

// TODO: fill out extended_data

io.on("connection", (socket) => {
  console.log("a user connected: ", socket.id);
  // self.sio.emit('remoteValue', extended_data)
  socket.on('remoteValueUpdated', function (data) {
    console.log(JSON.stringify(data));
    remoteValue = data;
    io.emit('remoteValue', remoteValue) //send to all connected clients
  })
});


