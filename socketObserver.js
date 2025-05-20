import { io } from 'socket.io-client';  

const socket = io('http://localhost:3033'); // Replace with your Socket.IO server URL

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