export default class StreamFeed {
    constructor(rssUrl) {
        this.feedGuid = null
        this.rssUrl = rssUrl
        this.items = []
       
    }
}

class items {
    constructor(feedGuid, itemGuid) {
        this.feedGuid = feedGuid
        this.itemGuid = itemGuid
        this.remoteItems = []
    }
}

class valueTimeSplit {
    // <podcast:valueTimeSplit startTime="4.856327" duration="126.271429" remotePercentage="80">
    //     <podcast:remoteItem feedGuid="d970aad3-61d4-5979-b8a5-de9b9a7a1355" itemGuid="614bdcdd-de15-4d58-8ff4-156a36f0e4cc"/>
    // </podcast:valueTimeSplit>
    constructor(startTime, duration, remotePercentage, feedGuid, itemGuid) {
        this.startTime = startTime
        this.duration = duration
        this.remotePercentage = remotePercentage
        this.feedGuid = feedGuid
        this.itemGuid = itemGuid
    }
}




/*
<rss xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:podcast="https://github.com/Podcastindex-org/podcast-namespace/blob/main/docs/1.0.md" version="2.0">
<channel>
<title>Lightning Thrashes</title>
<description>The Worlds first Value for Value enabled Metal Music show. Hosted by Kolomona Myer AKA Sir Libre</description>
<title>Lightning Thrashes</title>
<item>
<title>2 - Lightning Thrashes</title>
<itunes:image href="https://cdn.kolomona.com/podcasts/lightning-thrashes/002-Lightning-Thrashes-1000.jpg"/>
<enclosure url="https://op3.dev/e/ipfspodcasting.net/e/cdn.kolomona.com/podcasts/lightning-thrashes/002-Lightning-Thrashes.mp3" length="0" type="audio/mpeg"/>
<podcast:person href="https://libreleaf.com" img="https://cdn.kolomona.com/media/images/profiles/sunflower01.jpg" group="cast" role="host">Kolomona Myer - Sir Libre</podcast:person>
<podcast:images srcset="https://cdn.kolomona.com/podcasts/lightning-thrashes/002-Lightning-Thrashes-1000.jpg 1000w"/>
<podcast:value type="lightning" method="keysend" suggested="0.00000005000">
<podcast:valueTimeSplit startTime="3.737016" duration="311.275125" remotePercentage="95">
<podcast:remoteItem feedGuid="f57b50b7-4b92-571b-8ed7-7927ad9a6b51" itemGuid="1e92f82d-5802-485f-8b8b-37572f0233ec"/>
</podcast:valueTimeSplit>
<podcast:valueTimeSplit startTime="311.340522" duration="170.318367" remotePercentage="95">
<podcast:remoteItem feedGuid="0a8495bd-9b8f-5e6b-b522-f5b986d5faac" itemGuid="c5f930ab-1e02-4790-9703-e41fe867086e"/>
</podcast:valueTimeSplit>
<podcast:valueTimeSplit startTime="487.109258" duration="389.2506" remotePercentage="95">
<podcast:remoteItem feedGuid="a94f5cc9-8c58-55fc-91fe-a324087a655b" itemGuid="https://podcastindex.org/podcast/4148683#5"/>
</podcast:valueTimeSplit>
<podcast:valueTimeSplit startTime="960.719313" duration="229.041633" remotePercentage="95">
<podcast:remoteItem feedGuid="2960ba9d-be5a-5fe4-b4e0-18b527e2519c" itemGuid="14f6219e-16a0-4237-8522-849b4f7d0f17"/>
</podcast:valueTimeSplit>
<podcast:valueTimeSplit startTime="1231.395768" duration="130.35102" remotePercentage="95">
<podcast:remoteItem feedGuid="d970aad3-61d4-5979-b8a5-de9b9a7a1355" itemGuid="5d4a334b-9f4d-49fe-b67a-9d5ec8e9eb6b"/>
</podcast:valueTimeSplit>
<podcast:valueTimeSplit startTime="1358.674484" duration="230.0343" remotePercentage="95">
<podcast:remoteItem feedGuid="483dde8e-7e94-59a7-8eb0-2b0dc64a87bd" itemGuid="c17f0010-9461-47fe-b1f4-5775e2040b1e"/>
</podcast:valueTimeSplit>
<podcast:valueTimeSplit startTime="1576.573197" duration="280.32" remotePercentage="95">
<podcast:remoteItem feedGuid="5b803975-a124-5573-a1a8-b8f84af0b90e" itemGuid="c2e1a93a-4d05-4e75-abd1-56ed8611abcf"/>
</podcast:valueTimeSplit>
<podcast:valueTimeSplit startTime="1950.650541" duration="294.112653" remotePercentage="95">
<podcast:remoteItem feedGuid="5847498b-9db5-509f-860f-3f3c3c422698" itemGuid="0624efde-d0e5-4327-b67a-1773001a4693"/>
</podcast:valueTimeSplit>
<podcast:valueTimeSplit startTime="2248.919673" duration="238.210612" remotePercentage="95">
<podcast:remoteItem feedGuid="52774071-2c41-51d1-b55f-4345ef178fc2" itemGuid="53a66b39-bcfd-4028-962c-8b80f5dbc766"/>
</podcast:valueTimeSplit>
<podcast:valueTimeSplit startTime="2484.001882" duration="200.620408" remotePercentage="95">
<podcast:remoteItem feedGuid="ad6bfff9-4d5e-54ef-b5d3-dcc6eaf26e3b" itemGuid="6fb40af1-f27a-4434-b93f-9e1111796950"/>
</podcast:valueTimeSplit>
<podcast:valueTimeSplit startTime="2989.830851" duration="239.72" remotePercentage="95">
<podcast:remoteItem feedGuid="c73b1a23-1c28-5edb-94c3-10d1745d0877" itemGuid="0842d07e-76a3-47da-b253-946f090836c2"/>
</podcast:valueTimeSplit>
</podcast:value>
<guid isPermaLink="false">47fed9fd-c948-49f1-913e-f2f5a0acd5cb</guid>
<itunes:subtitle>2 - Lightning Thrashes</itunes:subtitle>
<link>https://sirlibre.com/lightning-thrashes/lightning-thrashes-episode-2/</link>
</item>
<item>
<title>1 - Lightning Thrashes</title>
<description>
<![CDATA[ <p><img src="https://cdn.kolomona.com/podcasts/lightning-thrashes/001-Lightning-Thrashes-500.jpg" alt="" /></p> <p><audio src="https://cdn.kolomona.com/podcasts/lightning-thrashes/001-Lightning-Thrashes.mp3" controls="controls"></audio></p> <h2>This is the first episode of Lightning Thrashes</h2> <p>A value for value (v4v) enabled heavy metal music show. With your host <strong>Kolomona</strong> AKA <strong>Sir Libre</strong>.</p> <p>This show uses the new revolutionary <a href="https://podcastindex.org">podcasting 2.0</a> value time split technology (wallet switching.) Your streaming satoshis and boostagrams automatically get routed directly to the artist currently playing with a small split going to the <strong>Lightning Thrashes</strong>&nbsp;show.</p> <p>Go to <a href="https://newpodcastapps.com">https://newpodcastapps.com</a> to get a modern podcast app capable of spreading the love. <a href="https://fountain.fm">https://fountain.fm</a> is probably the easiest to get started with but there are many, many more to choose from.</p> <p><a href="https://nostr.com/npub15z2javq62eh2xpms7yew0uzqsk4dr7t3q3dq4903uuxdyw2ca3kstx6q95">Sir Libre on Nostr</a></p> <p>npub15z2javq62eh2xpms7yew0uzqsk4dr7t3q3dq4903uuxdyw2ca3kstx6q95</p> <h3><br />Music played in this show</h3> <ul> <li><a href="https://podcastindex.org/podcast/4148683">Torcon VII - 13</a></li> <li><a href="https://www.wavlake.com/album/aa979224-3bb8-4475-9112-0e8d61e09624">ColdBlueSky - Holding Shadows</a></li> <li><a href="https://podcastindex.org/podcast/6443203">Longy - Katherine's Wheel</a></li> <li><a href="https://podcastindex.org/podcast/6421816">Radon - A Fist Full of Potash</a></li> <li><a href="https://podcastindex.org/podcast/6422399">Dogs - No Quarter</a></li> <li><a href="https://podcastindex.org/podcast/6422311">IROH - Heaven Knows</a></li> <li><a href="https://podcastindex.org/podcast/6422466">Boys Home - Lighten up Kid</a></li> <li><a href="https://podcastindex.org/podcast/6422123">Polanski - Minor Heart</a></li> <li><a href="https://podcastindex.org/podcast/6477242">FM Rodeo - Pop song (Disaster)</a></li> <li><a href="https://podcastindex.org/podcast/6571305">Death of Rock and Roll - Long Hard nightstick</a></li> </ul> <h3><br />Background Music</h3> <ul> <li><a href="https://nostr.com/npub1freed0mjs46cpkczxqddsgdtfhcx2xypep77wvy54rw68gkcug8sszvm6w">Dark Guest - On The Way</a> darkguest@getalby.com</li> <li><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&amp;hosted_button_id=D9MCSHQU6KPUJ">Alexander NakaradaB - Beyond Part 2</a></li> <li><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&amp;hosted_button_id=QL4T5W3SDDBZA">Kevin MacLoud - Cumbish</a></li> </ul> <h3><br />Software Used</h3> <p>This episode of Lightning Thrashes has been produced entirely with free libre open source software.</p> <ul> <li><a href="https://podcastindex.org">Podcasting 2.0</a></li> <li><a href="https://ardour.org/">Ardour - Open Source DAW</a></li> <li><a href="https://calf-studio-gear.org/">Calf Studio - Open Source Audio Plugins</a></li> <li><a href="https://ffmpeg.org">FFMPEG - Open Source Swiss Army Knife for Audio</a></li> <li><a href="https://www.gimp.org/">Gimp</a></li> <li><a href="https://kid3.kde.org">kid3</a></li> <li><a href="https://github.com/AUTOMATIC1111/stable-diffusion-webui">Stable Diffusion - Automatic1111</a></li> <li><a href="https://ipfspodcasting.net/">IPFS Podcasting</a></li> </ul> <p><br /><strong>Special Thanks to free, but not necessarily open source Podcasting 2.0 Tools</strong></p> <ul> <li><a href="https://www.thesplitkit.com/">The Split Kit</a></li> <li><a href="https://wavlake.com">Wavlake</a></li> <li><a href="https://lnbeats.com">lnbeats</a></li> <li><a href="https://saturn.fly.dev">Saturn.fly</a></li> <li><a href="https://getalby.com">Alby Lightning Wallet</a></li> <li><a href="https://freepd.com">FreePD.com</a></li> </ul> <h3><br />Support V4V</h3> <p><br />You can support the show directly by:</p> <ul> <li>Sending sats to kolomona@getalby.com</li> <li>Boosting the show</li> <li><a href="https://paypal.me/KolomonaM">PayPal</a></li> </ul> <h3><br />Feedback is needed</h3> <p><br />Please let me know what you think about the show. Good, bad or otherwise.</p> <p>Send via boostagram or <a href="https://nostr.com/npub15z2javq62eh2xpms7yew0uzqsk4dr7t3q3dq4903uuxdyw2ca3kstx6q95">Sir Libre on Nostr</a></p> ]]>
</description>
<itunes:image href="https://cdn.kolomona.com/podcasts/lightning-thrashes/001-Lightning-Thrashes-1000.jpg"/>
<enclosure url="https://op3.dev/e/ipfspodcasting.net/e/cdn.kolomona.com/podcasts/lightning-thrashes/001-Lightning-Thrashes.mp3" length="0" type="audio/mpeg"/>
<podcast:person href="https://libreleaf.com" img="https://cdn.kolomona.com/media/images/profiles/sunflower01.jpg" group="cast" role="host">Kolomona Myer - Sir Libre</podcast:person>
<podcast:images srcset="https://cdn.kolomona.com/podcasts/lightning-thrashes/001-Lightning-Thrashes-1000.jpg 1000w"/>
<podcast:value type="lightning" method="keysend" suggested="0.00000005000">
<podcast:valueRecipient name="SirLibre Node" type="node" address="03460a453d13c98ff06b36b3b6a8c06a7b48328ad5f983dacc3a7b0991b841bc57" split="95"/>
<podcast:valueRecipient type="lnaddress" name="Sovereign Feeds-TheSplitKit" address="steven@getalby.com" split="2"/>
<podcast:valueRecipient name="IPFS Podcasting" type="node" address="028eb5be336f7fdf2a4e40c57ff55d3d5d71277bb4197ea14957f756bff249e623" split="5" fee="true"/>
<podcast:valueRecipient name="Podcastindex.org" type="node" address="03ae9f91a0cb8ff43840e3c322c4c61f019d8c1c3cea15a25cfc425ac605e61a4a" split="1" fee="true"/>
<podcast:valueTimeSplit startTime="5.909" duration="239.662" remotePercentage="90">
<podcast:remoteItem feedGuid="a94f5cc9-8c58-55fc-91fe-a324087a655b" itemGuid="https://podcastindex.org/podcast/4148683#1"/>
</podcast:valueTimeSplit>
<podcast:valueTimeSplit startTime="237.288516" duration="197.093878" remotePercentage="90">
<podcast:remoteItem feedGuid="1d35cd0f-61bc-5f92-a106-80e2db1ca280" itemGuid="a0dd6275-40b1-444c-9b42-e6348f26ff3c"/>
</podcast:valueTimeSplit>
<podcast:valueTimeSplit startTime="434.689" duration="70" remotePercentage="90">
<podcast:valueRecipient name="Kolomona - Sir Libre" split="95" type="node" address="030a58b8653d32b99200a2334cfe913e51dc7d155aa0116c176657a4f1722677a3" customValue="912ezE5oAMbMPuxCiHq8" customKey="696969"/>
<podcast:valueRecipient name="darkguest@getalby.com" split="5" type="node" address="030a58b8653d32b99200a2334cfe913e51dc7d155aa0116c176657a4f1722677a3" customValue="wbM7Qek89CnC9YDCL4lj" customKey="696969"/>
</podcast:valueTimeSplit>
<podcast:valueTimeSplit startTime="502.184985" duration="116.088163" remotePercentage="90">
<podcast:remoteItem feedGuid="6b111f5d-3cc8-5af7-8640-152ca2f5c031" itemGuid="42bdf099-9dfb-4400-871f-f6a10fd298e7"/>
</podcast:valueTimeSplit>
<podcast:valueTimeSplit startTime="608.785013" duration="219.08898" remotePercentage="90">
<podcast:remoteItem feedGuid="cf2fe766-9923-5101-b57e-5f5b754c0de5" itemGuid="f86de07f-786b-41ba-8fa1-08f68567775c"/>
</podcast:valueTimeSplit>
<podcast:valueTimeSplit startTime="835.685443" duration="212.427755" remotePercentage="90">
<podcast:remoteItem feedGuid="bfd83193-932e-5ef0-b557-418769038ead" itemGuid="812689fc-fd76-4c5c-9cab-7023eb757d8a"/>
</podcast:valueTimeSplit>
<podcast:valueTimeSplit startTime="1046.059678" duration="185.338776" remotePercentage="90">
<podcast:remoteItem feedGuid="ad6bfff9-4d5e-54ef-b5d3-dcc6eaf26e3b" itemGuid="78d2bd3b-0d77-4c3a-95d1-eda18a5be552"/>
</podcast:valueTimeSplit>
<podcast:valueTimeSplit startTime="1310.07229" duration="201.508571" remotePercentage="90">
<podcast:remoteItem feedGuid="b3a58c5d-4aaa-5160-9755-ca9e9d869172" itemGuid="ebecb860-d963-40a8-be22-aca5995539b1"/>
</podcast:valueTimeSplit>
<podcast:valueTimeSplit startTime="1517.985406" duration="248.058776" remotePercentage="90">
<podcast:remoteItem feedGuid="54d743de-5a01-5405-8c32-b792e99db350" itemGuid="0ef8617e-2e91-4cd6-975e-285b8edee328"/>
</podcast:valueTimeSplit>
<podcast:valueTimeSplit startTime="1765.682127" duration="180.336" remotePercentage="90">
<podcast:remoteItem feedGuid="84c4d46d-4155-5f9f-a6b6-2a01c3440dcf" itemGuid="3ef2da90-57be-4614-aa7d-24ceeb19a5e4"/>
</podcast:valueTimeSplit>
<podcast:valueTimeSplit startTime="2393.310626" duration="186.2" remotePercentage="90">
<podcast:remoteItem feedGuid="c73b1a23-1c28-5edb-94c3-10d1745d0877" itemGuid="0f27f38c-a795-44e4-8ae0-43cb819fbfaf"/>
</podcast:valueTimeSplit>
</podcast:value>
<guid isPermaLink="false">d94615f5-e11c-4d48-a397-bcac020e0fad</guid>
<itunes:subtitle>1 - Lightning Thrashes</itunes:subtitle>
<link>https://sirlibre.com/lightning-thrashes/lightning-thrashes-episode-1/</link>
<pubDate>Thu, 07 Sep 2023 03:10:24 +0000</pubDate>
<author>Kolomona Myer AKA Sir LKibre</author>
<itunes:author>Kolomona Myer AKA Sir LKibre</itunes:author>
<itunes:keywords>v4v, metal, music, hard rock, rock, indie</itunes:keywords>
<itunes:duration>2598</itunes:duration>
<podcast:chapters url="https://cdn.kolomona.com/podcasts/lightning-thrashes/001-Lightning-Thrashes.json" type="application/json"/>
</item>
</channel>
</rss>
*/