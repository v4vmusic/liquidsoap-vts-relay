import dotenv from 'dotenv';
dotenv.config();

const PCI_KEY = process.env.PCI_KEY;
const PCI_SECRET = process.env.PCI_SECRET;
const USER_AGENT = process.env.USER_AGENT;
const PCI_BASEURL = process.env.PCI_BASEURL;
if (!PCI_KEY || !PCI_SECRET) {
  throw new Error('Missing API keys in your .env file - Visit podcastindex.org to obtain keys');
}




async function createHeaders(key, secret) {
  const input = key + secret + Math.floor(Date.now() / 1000);
  // console.log('input:', input);
  const data = new TextEncoder().encode(input);
  // console.log('Attempting to create hash from data:', data);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  // console.log('hashBuffer:', hashBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  return {
    'X-Auth-Date': Math.floor(Date.now() / 1000).toString(),
    'X-Auth-Key': key,
    Authorization: hashHex,
  };
}


// // Function to get feed from PCI by GUID
export async function getFeedFromPCIbyGuid(guid, caller) {
  // console.log("getFeedFromPCIbyGuid caller: " + caller);
  
  // console.log('getFeedFromPCIbyGuid line 36 pci.js (call to the index! guid: ):', guid, caller);
  try {
    if (!PCI_KEY || !PCI_SECRET) {
      throw new Error('Missing API keys');
    }
    const headers = await createHeaders(PCI_KEY, PCI_SECRET);
    // console.log('headers:', headers);

    const url = `${PCI_BASEURL}podcasts/byguid?guid=${guid}`;
    // console.log('url:', url);
    const response = await fetch(url, { 
      headers: {
        ...headers,
        'User-Agent': USER_AGENT
      } 
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse JSON response:', responseText.substring(0, 100));
      throw new Error(`Invalid JSON response: ${parseError.message}`);
    }
    // console.log('data:', data);

    // const episodes = data.items;
    // episodes.forEach(episode => {
    //     console.log(episode);
    // });
    return data;
  } catch (error) {
    console.error('getFeedFromPCIbyGuid error:', error.message);
  }
}


// Function to get episodes from PCI by GUID
// Also returns feed data (because the Author is not included in the episode data)
//https://api.podcastindex.org/api/1.0/episodes/bypodcastguid?guid=d5e73072-64a2-56a3-9dcd-4a00bfe561d5&pretty&max=1000
export async function getEpisodesFromPCIbyGuid(feedGuid) {
  console.log('getEpisodesFromPCIbyGuid line 65 pci.js (call to the index):', feedGuid);

  try {
    if (!PCI_KEY || !PCI_SECRET) {
      throw new Error('Missing API keys');
    }
    const headers = await createHeaders(PCI_KEY, PCI_SECRET);
    const url = `${PCI_BASEURL}episodes/bypodcastguid?guid=${feedGuid}&max=1000`;
    // console.log('url:', url);
    
    const response = await fetch(url, { 
      headers: {
        ...headers,
        'User-Agent': USER_AGENT
      } 
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse JSON response:', responseText.substring(0, 100));
      throw new Error(`Invalid JSON response: ${parseError.message}`);
    }
    const feedData = await getFeedFromPCIbyGuid(feedGuid, "pci.js getEpisodesFromPCIbyGuid");
    if (!feedData || !feedData.feed || feedData.description == 'No feeds match this guid.') {
      console.log('No feed found for GUID:', feedGuid);
      return null;
    }
      
    data.feedGuid = feedGuid;
    data.author = feedData.feed.author;
    data.title = feedData.feed.title;
    data.image = feedData.feed.image;
    data.link = feedData.feed.link;
    data.description = feedData.feed.description;
    data.rssUrl = feedData.feed.originalUrl;
    data.value = feedData.feed.value;
    data.medium = feedData.feed.medium;
    
    // console.log("feedData!!!!!!!!!!!!! \n", feedData);
    

    return data;
  } catch (error) {
    console.error('getEpisodeFromPCIbyGuids error:', error.message);
    return null;
  }
}

export async function getEpisodeFromPCIbyGuids(feedGuid, itemGuid) {
  // console.log('pci.js line 103 getEpisodeFromPCIbyGuids (Call to the index): ', feedGuid, itemGuid);

  try {
    if (!PCI_KEY || !PCI_SECRET) {
      throw new Error('Missing API keys');
    }
    const headers = await createHeaders(PCI_KEY, PCI_SECRET);
    // TODO: Get the correct api endpoint
    const url = `${PCI_BASEURL}episodes/bypodcastguid?guid=${feedGuid}&TOGO=${itemGuid}`;
    const response = await fetch(url, { headers });
    const data = await response.json();
    //console.log(data);

    return data;
  } catch (error) {
    console.error('getEpisodeFromPCIbyGuids error:', error.message);
  }
}

export async function searchPciAlbums(query) {
  // console.log('pci.js(118) searchPciAlbums (Call to the index): ' + query);
  
  try {
    if (!PCI_KEY || !PCI_SECRET) {
      throw new Error('Missing API keys');
    }
    const headers = await createHeaders(PCI_KEY, PCI_SECRET);
    const url = `${PCI_BASEURL}search/music/byterm?q=${query}`;
    const response = await fetch(url, { headers });
    //console.log("url:", url);
    const data = await response.json();
    // console.log("data:", data);
    return data;
  } catch (error) {
    console.error('searchPciAlbums error:', error.message);
  }
}

// Function to get episodes from PCI by GUID
export async function getPlaylistEpisodesFromPCIbyGuid(feedGuid) {
  // console.log('pci.js line 143 getPlaylistEpisodesFromPCIbyGuid (Call to the index): ' + feedGuid);
  const feedL = await getFeedFromPCIbyGuid(guid, "pci.js getPlaylistEpisodesFromPCIbyGuid");

  // fetch playlist feedL
  playlist.title = feedL.title
  playlist.description = feedL.description
  playlist.image = feedL.image
  playlist.items = []

  //TODO: Fetch feedGuids only once and cache
  feedL.remoteItems.forEach(async item => {
    let song = {}
    remoteFeed = await getEpisodeFromPCIbyGuid(item.feedGuid)
    remoteItem = await getEpisodeFromPCIbyGuids(item.feedGuid, item.itemGuid)
    song.title = remoteItem.title
    song.artist = remoteFeed.author
    song.enclosurUrl = item.enclosurUrl
    playlist.items.push(song)
  });
  return playlist;
}


export async function getRssUrlFromGuid(feedGuid) {
  // console.log('pci.js line 167 getRssUrlFromGuid : ' + feedGuid);
  

  const feed = await getFeedFromPCIbyGuid(feedGuid, "pci.js getRssUrlFromGuid");
  // console.log('pci.js line 171 getRssUrlFromGuid feed: ', feed);
  
  return feed.feed.url

}