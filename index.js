import Poller from './poller.js';
import { getEpisodesFromPCIbyGuid } from './pci.js';
    

import dotenv from 'dotenv';
dotenv.config();

const ICECAST_STREAM_URL = process.env.ICECAST_STREAM_URL;
const streamUrl = ICECAST_STREAM_URL.endsWith('/') ? ICECAST_STREAM_URL + 'status-json.xsl' : ICECAST_STREAM_URL + '/status-json.xsl';

const pollerUrl = process.env.POLLER_URL;

if (!ICECAST_STREAM_URL) {
    throw new Error('Missing ICECAST_STREAM_URL in your .env file');
}
let currentTitle = '';
let oldTitle = '';
let currentVTS = {};
let oldVTS = {};
let streamItems = {};
let currentTimeSplit = {};



const poller = new Poller(pollerUrl);

poller.on('pollData', async pollData => {
    currentTitle = pollData.title;

    if (currentTitle !== oldTitle) {
        oldTitle = currentTitle;
        // The title has changed
        console.log("New title: ", currentTitle);
        console.log("streamGuids: ", parseGuids(pollData.title));
        streamItems = await getEpisodesFromPCIbyGuid(parseGuids(pollData.title).feedGuid);
    }
    // console.log("pollData: ", pollData);
    currentVTS = getCurrentTimeSplit(pollData.elapsedTime, parseGuids(pollData.title).itemGuid, streamItems);
    if (currentVTS !== oldVTS) {
        oldVTS = currentVTS;
        // The VTS has changed
        console.log("New VTS: ", currentVTS);
        
    }
    if (currentVTS) {
        // The host is talking, default to 
    }
    
    console.log("currentTimeSplit: ", JSON.stringify(currentVTS));


});

poller.start();


function parseGuids(inString) {
    const regex = /{([^}]*)}/g;
    const matches = inString.match(regex);
    if (!matches || matches.length < 2) {
        throw new Error('Expected at least two GUIDs in the input string');
    }
    return {
        feedGuid: matches[0].replace('{', '').replace('}', ''),
        itemGuid: matches[1].replace('{', '').replace('}', '')
    };
}

function getCurrentTimeSplit(elapsedTime, guid, streamItems) {
    // guid is the item (episode) guid for the stream

    const item = streamItems.items.find(item => item.guid === guid); 
    // item is the current episode being played in the stream

    // console.log("streamItems.items: ", JSON.stringify(streamItems.items)); // Too long to debug
    // console.log("item: ", JSON.stringify(item));
    // console.log("Item: ", item);
    

    // Find the currently playing song (timeSplit) in the stream
    if (!item) {
        throw new Error(`Item with guid ${guid} not found`);
    }
    const timeSplits = item.timesplits.sort((a, b) => a.startTime - b.startTime);
    const currentTimeSplit = timeSplits.find(timeSplit =>
        elapsedTime >= timeSplit.startTime && elapsedTime < timeSplit.startTime + timeSplit.duration
    ) || null;
    // console.log("TimeSplits: ", timeSplits);
    

    return currentTimeSplit;
}





