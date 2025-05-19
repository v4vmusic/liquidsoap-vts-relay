import axios from 'axios';
import { log } from 'console';
import { EventEmitter } from 'events';

export default class Poller extends EventEmitter {
    constructor(url) {
        super();
        this.url = url;
        this.interval = 2000;
        this.latestResponse = null;
        this.sequenceNumber = 0;
    }

    start() {
        setInterval(() => this.poll(), this.interval);
      }
      
      poll() {
        const sequenceNumber = this.sequenceNumber++;
        // console.log("getting response sequence number", sequenceNumber);
        // console.log("Interval: ", this.interval, this.interval.toString());
        
        
        axios.get(this.url)
          .then((response) => this.handleResponse(response, sequenceNumber))
          .catch((error) => console.error(error));
      }

    handleResponse(response, sequenceNumber) {
        console.log("Checking response...", sequenceNumber, this.sequenceNumber);

        if (sequenceNumber <= this.sequenceNumber) {
            // Update the latest response if this one is newer
            this.latestResponse = response.data;
            // console.log("Latest response: ", this.latestResponse);


            const data = response.data;
            const startTime = new Date(data.startTime);
            console.log("Start time: ",data.startTime, startTime);
            
            const title = data.title;
            const currentTime = new Date();
            const elapsedTime = Math.floor((currentTime - startTime) / 1000);
            console.log("Elapsed time: ", elapsedTime);
            
            const pollData = {
                title: title,
                "elapsedTime": elapsedTime,
            }
            try {
                this.emit('pollData', pollData);
            } catch (error) {
                console.error(error);
            }
            



        }

    }

    getLatestTime() {
        return this.latestResponse;
    }
}