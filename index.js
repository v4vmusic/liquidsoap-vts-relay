import Poller from './poller.js';
import { getEpisodesFromPCIbyGuid } from './pci.js';
import { Server } from "socket.io";

import dotenv from 'dotenv';
dotenv.config();

const io = new Server({
  cors: {
    origin: (origin, callback) => {
      callback(null, true);
    }
  }
});

const ICECAST_STREAM_URL = process.env.ICECAST_STREAM_URL;

const pollerUrl = process.env.POLLER_URL;

if (!ICECAST_STREAM_URL) {
    throw new Error('Missing ICECAST_STREAM_URL in your .env file');
}
let currentTitle = '';
let oldTitle = '';
let currentVTS = {};
let oldVTS = {};
let streamItems = {};

// TODO: Clean up redundant stuff and optimize

const poller = new Poller(pollerUrl);

poller.on('pollData', async pollData => {
    currentTitle = pollData.title;
    console.log("Current title: ", currentTitle);
    io.emit('metadata', pollData.elapsedTime + " " +currentTitle)

    const metaGiuds = parseGuids(pollData.title);

    if (currentTitle !== oldTitle) {
        oldTitle = currentTitle;
        // The title has changed a new stream is being played
        console.log("New title: ", currentTitle);
        streamItems = await getEpisodesFromPCIbyGuid(metaGiuds.feedGuid);
        
    }
    currentVTS = await getCurrentTimeSplit(pollData.elapsedTime, metaGiuds.itemGuid, streamItems);
    

    if (currentVTS?.itemGuid !== oldVTS?.itemGuid) {
        // The VTS has changed
        oldVTS = currentVTS;
        // TODO: Normalize splits and inject streamFeed splits percentage
        io.emit('remoteValue', currentVTS) //send to all connected clients
        console.log("New VTS: ", currentVTS);
        
    }

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

async function getCurrentTimeSplit(elapsedTime, guid, streamItems) {
    let remoteValue = {};
    // Find the currently playing song (timeSplit) in the stream
    const item = streamItems.items.find(item => item.guid === guid); 

    if (!item) {
        throw new Error(`Stream item with guid ${guid} not found`);
    }

    const timeSplits = item.timesplits.sort((a, b) => a.startTime - b.startTime);
  
    const currentTimeSplit = timeSplits.find(timeSplit =>
        elapsedTime >= timeSplit.startTime && elapsedTime < timeSplit.startTime + timeSplit.duration
    ) || null;

    currentVTS = currentTimeSplit;
    // console.log("streamItems: ", streamItems);
    if (currentTimeSplit === null) {
        // No current time split found
        // set the vts to the main feed.
        console.log("No current time split found, building one from stream feed");
        // TODO: I don't like this redundant code
        
        
        remoteValue = {
            "image": streamItems.image ?? "",
            "title": streamItems.title ?? "Unknown Title",
            "line": [streamItems.title ?? "", streamItems.author ?? ""],
            "description": (streamItems.description ?? "").substring(0, 100),
            "value": streamItems.value ?? {},
            "type": streamItems.value?.model?.type ??  "",
            "link": streamItems.link ?? "",
            "chaptersUrl": streamItems.chaptersUrl,
            "enclosureUrl": streamItems.enclosureUrl ?? "",
            "feedGuid": streamItems.feedGuid ?? "",
            "feedUrl": streamItems.rssUrl ?? "",
            "medium":  streamItems.medium ?? "",
            "itemGuid": streamItems.guid ?? "",
            "duration": streamItems.duration ?? 33,
            "startTime": 0
        }

        return remoteValue;
    }
    
        const currentVtsFeed = await getEpisodesFromPCIbyGuid(currentTimeSplit.feedGuid);
        const currentVtsItem = currentVtsFeed.items.find(item => item.guid === currentTimeSplit.itemGuid);
        
        // Line 1 is the album, line 2 is the artist
        remoteValue = {
            "image": currentVtsFeed.image ?? "",
            "title": currentVtsItem.title ?? "Unknown Title",
            "line": [currentVtsItem.title ?? "", currentVtsFeed.author ?? ""],
            "description": (currentVtsItem.description ?? "").substring(0, 100),
            "value": currentVtsItem.value ?? currentVtsFeed.value ?? {},
            "type": currentVtsItem.value?.model?.type ?? currentVtsFeed.value?.model?.type ?? "",
            "link": currentVtsFeed.link ?? "",
            "chaptersUrl": currentVtsItem.chaptersUrl,
            "enclosureUrl": currentVtsItem.enclosureUrl ?? "",
            "feedGuid": currentVtsItem.podcastGuid ?? "",
            "feedUrl": currentVtsItem.feedUrl ?? "",
            "medium":  currentVtsFeed.medium ?? "",
            "itemGuid": currentVtsItem.guid ?? "",
            "duration": currentVtsItem.duration ?? 33,
            "startTime": 0
        }
    return remoteValue;
}

function normalizeDestinations(data) {
    console.log(clone(data));
    const nonFeeItems = data.filter((item) => !item.fee);
    const feeItems = data.filter((item) => item.fee);
  
    // Calculate total split of non-fee items
    const totalSplit = nonFeeItems.reduce(
      (acc, item) => acc + Number(item.split),
      0
    );
  
    // Normalize splits to percentages of the total
    nonFeeItems.forEach(
      (item) => (item.split = (Number(item.split) / totalSplit) * 100)
    );
  
    // Merge fee and non-fee items
    const normalizedData = nonFeeItems.concat(feeItems);
  
    return normalizedData;
  }