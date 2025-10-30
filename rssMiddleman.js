import axios from 'axios';
import fs from 'fs';

const rssURL = 'https://sirlibre.com/lightning-thrashes-rss.xml'
rssMiddleman(rssURL);



export default async function rssMiddleman(rssUrl) {


    const response = await axios.get(rssUrl);
    const rssContent = response.data;
    const modifiedRssContent = insertGuidIntoItems(rssContent);
    console.log(modifiedRssContent);

    const rssUrlParts = rssUrl.split('/');
    const fileName = rssUrlParts[rssUrlParts.length - 1];
    // const fs = require('fs');
    fs.writeFileSync(fileName, modifiedRssContent);
}

function insertGuidIntoItems(rssContent) {
  // Find the line where <podcast:guid> occurs at the channel level
  const contentArray = rssContent.split('\n');
  const guidLine = "  " + contentArray.find(line => line.includes('<podcast:guid>'));

  for (let i = 0; i < contentArray.length; i++) {
    if (contentArray[i].includes('<item>')) {
      contentArray.splice(i + 1, 0, guidLine);
      // increment i to account for the newly inserted element
      i++;
    }
  }

  return contentArray.join('\n');
}

/*
<rss xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:podcast="https://github.com/Podcastindex-org/podcast-namespace/blob/main/docs/1.0.md" version="2.0">
  <channel>
    <title>Lightning Thrashes</title>
    <description>The Worlds first Value for Value enabled Metal Music show. Hosted by Kolomona Myer AKA Sir Libre</description>
    <language>en</language>
    <itunes:image href="https://cdn.kolomona.com/podcasts/lightning-thrashes/043/043-Lightning-Thrashes-1000.jpg"/>
    <link>http://lightningthrashes.com</link>
    <generator>Sovereign Feeds</generator>
    <itunes:category text="Music"/>
    <podcast:medium>podcast</podcast:medium>
    <podcast:publisher>
      <podcast:remoteItem medium="publisher" feedGuid="c8ec3dba-ed28-5662-9509-094d769f9597" feedUrl="https://cdn.kolomona.com/podcasts/publisher-rss.xml"/>
    </podcast:publisher>
    <podcast:complete>no</podcast:complete>
    <podcast:block>no</podcast:block>
    <itunes:owner>
      <itunes:email>kolomona@kolomona.com</itunes:email>
      <itunes:name>Kolomona</itunes:name>
    </itunes:owner>
    <pubDate>Wed, 26 Jun 2024 20:47:09 +0000</pubDate>
    <lastBuildDate>Wed, 26 Jun 2024 20:47:09 +0000</lastBuildDate>
    <podcast:podping usesPodping="true"/>
    <podcast:guid>d5e73072-64a2-56a3-9dcd-4a00bfe561d5</podcast:guid>
    <podcast:images srcset="https://cdn.kolomona.com/podcasts/lightning-thrashes/043/043-Lightning-Thrashes-1000.jpg 1000w"/>
    <podcast:person href="https://sirlibre.com" img="https://cdn.kolomona.com/media/images/profiles/sunflower01.jpg" group="cast" role="host">Sir Libre</podcast:person>
    <podcast:value type="lightning" method="keysend" suggested="0.00000005000">
      <podcast:valueRecipient name="kolomona@getalby.com" type="node" address="030a58b8653d32b99200a2334cfe913e51dc7d155aa0116c176657a4f1722677a3" customKey="696969" customValue="912ezE5oAMbMPuxCiHq8" split="88"/>
      <podcast:valueRecipient name="Podcastindex.org" type="node" address="03ae9f91a0cb8ff43840e3c322c4c61f019d8c1c3cea15a25cfc425ac605e61a4a" split="1"/>
      <podcast:valueRecipient name="Sovereign Feeds-TheSplitKit" type="node" address="030a58b8653d32b99200a2334cfe913e51dc7d155aa0116c176657a4f1722677a3" customKey="696969" customValue="eChoVKtO1KujpAA5HCoB" split="5"/>
      <podcast:valueRecipient name="IPFS Podcasting" type="node" address="028eb5be336f7fdf2a4e40c57ff55d3d5d71277bb4197ea14957f756bff249e623" split="5"/>
      <podcast:valueRecipient name="Fountain Boost Bot" type="node" address="0332d57355d673e217238ce3e4be8491aa6b2a13f95494133ee243e57df1653ace" split="1" fee="true"/>
      <podcast:valueRecipient name="op3.dev Stats" type="node" address="030a58b8653d32b99200a2334cfe913e51dc7d155aa0116c176657a4f1722677a3" customKey="696969" customValue="x3VXZtbcfIBVLIUqzWKV" split="1" fee="true"/>
    </podcast:value>
    <itunes:keywords>Metal, Music, Heavy Metal, Rock, Grunge, Indie, v4v, Valu4Value</itunes:keywords>
    <itunes:author>Kolomona Myer AKA Sir Libre</itunes:author>
    <managingEditor>Kolomona Myer AKA Sir Libre</managingEditor>
    <podcast:funding url="https://sirlibre.com/donate">Send some value back!</podcast:funding>
    <image>
      <url>https://cdn.kolomona.com/podcasts/lightning-thrashes/043/043-Lightning-Thrashes-1000.jpg</url>
      <link>http://lightningthrashes.com</link>
      <title>Lightning Thrashes</title>
      <description>The Worlds first Value for Value enabled Metal Music show. Hosted by Kolomona Myer AKA Sir Libre</description>
      <width>144</width>
      <height>144</height>
    </image>
    <category>Music</category>
    <podcast:podroll>
      <podcast:remoteItem feedGuid="3aebb7a8-5942-5ee7-a148-8bdc14f1f3d4" feedUrl="https://feeds.rssblue.com/upbeats"/>
      <podcast:remoteItem feedGuid="f20a6d00-9ab4-5b96-9b8e-a2d19498520b" feedUrl="https://www.rollingon.show/feed/podcast/"/>
      <podcast:remoteItem feedGuid="de603d82-40f5-5d0c-957c-35f251fcd103" feedUrl="https://fairly-fun.fra1.cdn.digitaloceanspaces.com/The_Fairly_Fun_Show/feed.xml"/>
    </podcast:podroll>
    <item>
      <title>43 - Lightning Thrashes</title>
      <description><![CDATA[<p></p>]]></description>
      <itunes:image href="https://cdn.kolomona.com/podcasts/lightning-thrashes/043/043-Lightning-Thrashes-1000.jpg"/>
      <enclosure url="https://op3.dev/e/ipfspodcasting.net/e/cdn.kolomona.com/podcasts/lightning-thrashes/043/043-Lightning-Thrashes.mp3" length="84877159" type="audio/mpeg"/>
      <podcast:person href="https://libreleaf.com" img="https://cdn.kolomona.com/media/images/profiles/sunflower01.jpg" group="cast" role="host">Kolomona Myer - Sir Libre</podcast:person>
      <podcast:images srcset="https://cdn.kolomona.com/podcasts/lightning-thrashes/043/043-Lightning-Thrashes-1000.jpg 1000w"/>
      <podcast:value type="lightning" method="keysend" suggested="0.00000005000">
        <podcast:valueRecipient name="kolomona@getalby.com" type="node" address="030a58b8653d32b99200a2334cfe913e51dc7d155aa0116c176657a4f1722677a3" customKey="696969" customValue="912ezE5oAMbMPuxCiHq8" split="100"/>
        <podcast:valueRecipient name="Sovereign Feeds-TheSplitKit" address="030a58b8653d32b99200a2334cfe913e51dc7d155aa0116c176657a4f1722677a3" type="node" customKey="696969" customValue="eChoVKtO1KujpAA5HCoB" fee="true" split="5"/>
        <podcast:valueRecipient name="IPFS Podcasting" type="node" address="028eb5be336f7fdf2a4e40c57ff55d3d5d71277bb4197ea14957f756bff249e623" split="5" fee="true"/>
        <podcast:valueRecipient name="Podcastindex.org" type="node" address="03ae9f91a0cb8ff43840e3c322c4c61f019d8c1c3cea15a25cfc425ac605e61a4a" split="1" fee="true"/>
        <podcast:valueRecipient name="op3.dev Stats" type="node" address="030a58b8653d32b99200a2334cfe913e51dc7d155aa0116c176657a4f1722677a3" customKey="696969" customValue="x3VXZtbcfIBVLIUqzWKV" split="1" fee="true"/>
        <podcast:valueRecipient name="Dame Jennifer for opening jingle - Thank you!" type="node" address="030a58b8653d32b99200a2334cfe913e51dc7d155aa0116c176657a4f1722677a3" customKey="696969" customValue="RThjKHUoP8USAlODivzt" split="5" fee="true"/>
        <podcast:valueTimeSplit startTime="39.763469" duration="266.739782" remotePercentage="80">
          <podcast:remoteItem feedGuid="edcac168-0d8f-59d1-9c6c-297c97462fc3" itemGuid="dac15380-8384-4b8d-9074-ff06c99f6813"/>
        </podcast:valueTimeSplit>
        <podcast:valueTimeSplit startTime="459.063433" duration="312.966744" remotePercentage="80">
          <podcast:remoteItem feedGuid="05b75483-9f5b-5236-bd66-69e9d3e1b995" itemGuid="c7721b42-96f6-4f88-8c0d-bc10f396a6a1"/>
        </podcast:valueTimeSplit>
        <podcast:valueTimeSplit startTime="776.366889" duration="258.648382" remotePercentage="80">
          <podcast:remoteItem feedGuid="05b75483-9f5b-5236-bd66-69e9d3e1b995" itemGuid="7f99ea20-03ad-4253-9f39-89623c67b590"/>
        </podcast:valueTimeSplit>
        <podcast:valueTimeSplit startTime="1041.358627" duration="298.321796" remotePercentage="80">
          <podcast:remoteItem feedGuid="72f2cafd-0535-5089-a2ff-6a54e396d30e" itemGuid="ab49390b-b2aa-4862-8fb7-7147f34e8dcb"/>
        </podcast:valueTimeSplit>
        <podcast:valueTimeSplit startTime="2720.772929" duration="210.123007" remotePercentage="80">
          <podcast:remoteItem feedGuid="f077a7f3-a85d-572f-ba41-147f8bdc3b77" itemGuid="613e4700-f67f-4126-b595-dffb46552f55"/>
        </podcast:valueTimeSplit>
        <podcast:valueTimeSplit startTime="2935.555324" duration="289.067953" remotePercentage="80">
          <podcast:remoteItem feedGuid="38edc858-5731-5221-86bf-86db9f886e2b" itemGuid="6cd3752b-cad0-5f5c-8c2a-b0a1560d6eec"/>
        </podcast:valueTimeSplit>
        <podcast:valueTimeSplit startTime="3224.802620" duration="112.806389" remotePercentage="80">
          <podcast:remoteItem feedGuid="fd68accb-1694-57da-970c-8f0ce035eeda" itemGuid="c7595745-a064-4387-b716-7a01efde2963"/>
        </podcast:valueTimeSplit>
        <podcast:valueTimeSplit startTime="4211.277800" duration="218.430840" remotePercentage="80">
          <podcast:remoteItem feedGuid="abc534b0-cab0-5060-ba1b-61b75bc32e3d" itemGuid="c6635a64-d3bf-4b5c-ac8e-aceace05605c"/>
        </podcast:valueTimeSplit>
        <podcast:valueTimeSplit startTime="4443.632372" duration="191.355925" remotePercentage="80">
          <podcast:remoteItem feedGuid="627d8115-8a57-56f1-ba90-612857b9fd35" itemGuid="7845d7c0-beee-56ba-be18-6afc966e92bf"/>
        </podcast:valueTimeSplit>
        <podcast:valueTimeSplit startTime="4637.103445" duration="161.042256" remotePercentage="80">
          <podcast:remoteItem feedGuid="08991139-d42a-56c0-a3f3-274b1dcc68a3" itemGuid="f5d0abc6-5cf4-4e40-9cf0-2fcb29a172a4"/>
        </podcast:valueTimeSplit>
        <podcast:valueTimeSplit startTime="4922.499095" duration="156.079512" remotePercentage="80">
          <podcast:remoteItem feedGuid="5b803975-a124-5573-a1a8-b8f84af0b90e" itemGuid="4eca5201-798d-4943-8662-829da13aba2c"/>
        </podcast:valueTimeSplit>
        <podcast:valueTimeSplit startTime="5099.963301" duration="194.691393" remotePercentage="80">
          <podcast:remoteItem feedGuid="63d0caef-4b57-576e-8b7d-150082b21775" itemGuid="835325bb-ef2d-5a59-890b-dc9c689610a6"/>
        </podcast:valueTimeSplit>
      </podcast:value>
      <guid isPermaLink="false">8f45ad15-e086-4762-a0ad-5fa5116861bb</guid>
      <itunes:subtitle>43 - Lightning Thrashes</itunes:subtitle>
      <link>https://sirlibre.com/lightning-thrashes/lightning-thrashes-episode-43/</link>
      <itunes:summary><![CDATA[<p></p>]]></itunes:summary>
      <pubDate>Wed, 26 Jun 2024 20:39:00 +0000</pubDate>
      <author>Kolomona Myer AKA Sir LKibre</author>
      <itunes:author>Kolomona Myer AKA Sir LKibre</itunes:author>
      <itunes:keywords>v4v, metal, music, hard rock, rock, indie</itunes:keywords>
      <itunes:duration>5295</itunes:duration>
      <podcast:chapters url="https://cdn.kolomona.com/podcasts/lightning-thrashes/043/043-Lightning-Thrashes.json" type="application/json"/>
      <itunes:explicit>No</itunes:explicit>
    </item>
  </channel>
</rss>
*/