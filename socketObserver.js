import { io } from 'socket.io-client';  
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.RELAY_PORT;
console.log("Atempting to connect to: http://vts.lightningthrashes.com:"+port);

// const socket = io('http://localhost:'+port); // Replace with your Socket.IO server URL
const socket = io('http://vts.lightningthrashes.com:'+port); // Replace with your Socket.IO server URL

socket.on('connect', () => {
    console.log('Connected to Socket.IO server');
});

socket.on('remoteValue', (data) => {
    // console.log('Received remoteValue:', JSON.stringify(data, null, 2));
    console.log(data.line[0], data.line[1]);
    
});

socket.on('metadata', (data) => {
    // console.log('Received metadata:', data);
});

/*
I sometimes get this error when the episode changes or when I start the server when no song is playing:

file:///home/hapa/k/code/v4v/vts-tsk-relay/liquidsoap-vts-relay/index.js:77
    const item = streamItems.items.find(item => item.guid === guid); 
                                   ^

TypeError: Cannot read properties of undefined (reading 'find')
    at getCurrentTimeSplit (file:///home/hapa/k/code/v4v/vts-tsk-relay/liquidsoap-vts-relay/index.js:77:36)

*/