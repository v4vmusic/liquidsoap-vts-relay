## Liquidsoap Metadata Poller and Live Value Time Split Relay

The main use case for this project is so that a value for value music show can broadcast prerecorded shows on an icecast / liquidsoap live stream and have the episode's value time splits be in sync with the playing show.

This project makes use of the podcast:liveItem tag and the [Live Value Updates](https://github.com/Podcastindex-org/podcast-namespace/discussions/547#discussion-5331825) proposal, proposed by [StevenB++](https://github.com/thebells1111)


### How it works

**There are 2 major parts to this project:**
- A bash script that polls liquidsoap's telnet interface for guids and timing information
    - The bash script saves a json data file at path on a web server
- An index.js script polling script that polls the json data file for changes.
    - it uses the data to retrieve value time split information from the stream's podcast feed
    - it creates a socketio server and broadcasts the valueData (timesplit) information to listening podcast apps

### Prerequisites
- A VPS with nginx (or other webserver) installed
- An icecast / liquid soap server on the same machine
- a pre recorded live stream that has an rss feed with value time splits.
- a [podcastindex](https://api.podcastindex.org/) api key
- A fearless attitude 🙂

### Before You do Anything Else!
The mp3 files that liquid soap is playing MUST have The podcast's feedGuid and itemGuid in their "Title" id3 tags
It MUST be in the form {feedGuid}{itemGuid}

Example:
`7 - Lightning Thrashes - {d5e73072-64a2-56a3-9dcd-4a00bfe561d5}{59d9348b-7895-4538-bba4-96e2647455b5}`

I understand that this totally sucks and is a pain in the ass to have to modify all your id3 tags, but until I can find a better way to get the info from liquid soap this is what I've settled on.

There is a very handy command line mp3 tag editor called [eyeD3](https://eyed3.readthedocs.io/en/latest/) that can be used with some scripting foo to automatically do it for you.
### Installation

This project has only been tested using Ubuntu, liquidsoap, icecast, and nginx.

Note: The methods that I am using are likely not the most efficient way to do things. Pull requests are welcome 🙂

```

mkdir /prefered/path/to/scripts

cd /prefered/path/to/scripts

git clone https://github.com/v4vmusic/liquidsoap-vts-relay

cd liquidsoap-vts-relay
npm install

cp sample.env .env

```

Edit the .env file to match your needs.

#### Create Systemd Service to Run the Telnet Poller

Edit the file at `./server-scripts/liquid-soap-telnet-poller.sh` to match your environment

Make script executable
`chmod +x ./server-scripts/liquid-soap-telnet-poller.sh`

`sudo cp ./server-scripts/liquid-soap-telnet-poller.service /etc/systemd/system/`

Edit the file at `/etc/systemd/system/liquid-soap-telnet-poller.service` to match your environment.

Start and enable and check the service
```
sudo systemctl daemon-reload
sudo systemctl enable liquid-soap-telnet-poller.service
sudo systemctl start liquid-soap-telnet-poller.service
sudo systemctl status liquid-soap-telnet-poller.service
```

You should be able to monitor the telnet poller's out put with
`journalctl -u icecastpoller.service -f`

Verify that the desired json file is being created
`cat /path/to/your/web/directory/current-episode.json`


#### Create Systemd Service to Run the Relay script
Same as before.
`sudo cp ./server-scripts/vts-relay.service /etc/systemd/system/`

Edit the file at `/etc/systemd/system/vts-relay.servicee` to match your environment.

Start and enable and check the service

```
sudo systemctl daemon-reload
sudo systemctl enable vts-relay.service
sudo systemctl start vts-relay.service
sudo systemctl status vts-relay.service
```
You should be able to monitor the telnet poller's out put with
`journalctl -u vts-relay.service -f`

Make sure that the port in your .env file is open
`sudo ufw allow 3033` 
replace 3033 if you changed the port in the .env

You should be able to now connect to the socket and view VTSs as they get triggered.

I'll flesh this guide out more later.