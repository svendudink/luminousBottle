import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { GlobalContext } from "../../components/context/GlobalContext";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import "./Storys.css";

const Storys = (props) => {
  const { setLampBackground } = useContext(GlobalContext);
  const [textColor, setTextColor] = useState("#195B8E");

  if (props.story === "mesh") {
    return (
      <div style={{ color: textColor }}>
        Bottle Luminous has a total of 132 Bottles, all connected over a
        Blueooth MESH network
      </div>
    );
  }
  if (props.story === "QR") {
    return (
      <div style={{ color: textColor }}>
        every Bulb has its own Unique QR code,
      </div>
    );
  }
  if (props.story === "lamp1") {
    return (
      <div style={{ color: textColor }}>
        Advanced individual mapping through google maps interface
      </div>
    );
  }
  if (props.story === "lamp2") {
    return (
      <div style={{ color: textColor }}>
        Completely waterproof as bulbs are sealed inside glass
      </div>
    );
  }
  if (props.story === "lamp3") {
    return (
      <div
        style={{ color: textColor }}
        onMouseLeave={() => setLampBackground("startPagewhitea")}
      >
        <p1> 16.7 Million colours to choose from, try a few </p1>
        <Button onClick={() => setLampBackground("lamp3b")}>Red</Button>
        <Button onClick={() => setLampBackground("lamp3d")}>Yellow</Button>
        <Button onClick={() => setLampBackground("lamp3c")}>Blue</Button>
      </div>
    );
  }

  if (props.story === "lamp4") {
    return (
      <div style={{ color: textColor }}>
        Bulbs are all controlled from 1 Rooted android device, which is in turn
        controlled by the NodeJS server
      </div>
    );
  }
  if (props.story === "mapManager") {
    return (
      <div style={{ color: "black" }}>
        Select a map to change the colors or<br></br>
        Create your own event map <br></br>
        this will be the first step setting up a light event
      </div>
    );
  }
  if (props.story === "colors") {
    return (
      <div style={{ color: "black" }}>
        Select different colors, <br></br>if no colors are selected,
        <br /> its will pick a random color,
        <br /> if one color is selected,
        <br /> it will remain on that color,
        <br /> if multiple colors are selected
        <br /> it will randomly rotate
        <br /> in between the colors selected
      </div>
    );
  }
  if (props.story === "bulbId") {
    return (
      <div style={{ color: "black" }}>
        Every Lamp has its own Bulb ID.
        <br /> on the neck of the lamp you can find a QR code,
        <br /> scan the QR code or select the bulb manually, <br />
        this is done so the software knows
        <br /> where your bulb is placed and when to <br />
        perform the action requested
      </div>
    );
  }

  if (props.story === "googleMap") {
    return (
      <div style={{ color: "black" }}>
        Bulbs who are added will be visible here,
        <br /> simply click on a bulb to give it a<br /> color or drag it to the
        position matching the position
        <br /> of the physical bulb
      </div>
    );
  }
  if (props.story === "addLamp") {
    return (
      <div style={{ color: "black" }}>
        Add new Lamp: Add a lamp and it will be visible on the map,
        <br />
        Add before selected lamp: there will always be chronoligical order,{" "}
        <br />
        this makes it possible to add a lamp later without deleting a bunch of
        lights
        <br />
        Delete selected Lamp: this will delete the selected and move all
        <br />
        numbers down by one to keepthe chronological order <br /> Vertical and
        horizontal scan: have the lights move from left to right or from up to
        <br />
        down
      </div>
    );
  }
  if (props.story === "video") {
    return (
      <div style={{ color: "black" }}>
        this is a live video stream of 11 of the 132 bluetooth <br />
        lamps i made for events
        <br />
        the video stops after 4 minutes to keep the stress on the server low,
        <br />
        the video might be laggy, this is because it runs on a Ebay
        <br />
        kleinanzeigen purchased broken 25 euro laptop
      </div>
    );
  }
  if (props.story === "eventControl") {
    return (
      <div style={{ color: "black" }}>
        the bulbs travel with a speed of 0.625sec per bulbs, the travel pattern
        configures which direction they travel, up and down in chronological
        order, the whole group changing colors at the same time, or random
        changes, bulb colors can be set to the colors set in the event building
        section, or the can be set to fully random, this will ignore colors set
        in the event builder, the last one is to select the map the first step
        is to build the light file, when its ready it Can be send to the
        controller, starting of events can take up to 5 minutes, but can also
        only take a few seconds, the reason for this is, there is a lot of
        bluetooth interference in the house, which makes it often take a very
        long time to find its MESH path, in real live situations this is not a
        issue since the controller will not have 11 lights in its sight
      </div>
    );
  }
  if (props.story === "server") {
    return (
      <div style={{ color: "black" }}>
        Server updates is there to view what happens <br />
        in between the server and the controller, <br />
        much is done with ADB, extracting frames, <br />
        from the android device to verify <br />
        and to send touch events which control the device in <br />
        direct control mode
      </div>
    );
  }
};

export default Storys;

export const AboutStory = () => {
  return (
    <div className="AboutStory">
      <meta content="text/html; charset=UTF-8" httpEquiv="content-type" />
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html:
            'ol{margin:0;padding:0}table td,table th{padding:0}.c0{color:#000000;font-weight:400;text-decoration:none;vertical-align:baseline;font-size:11pt;font-family:"Arial";font-style:normal}.c1{padding-top:0pt;padding-bottom:0pt;line-height:1.15;orphans:2;widows:2;text-align:left;height:11pt}.c2{padding-top:0pt;padding-bottom:0pt;line-height:1.15;orphans:2;widows:2;text-align:left}.c3{background-color:#ffffff;max-width:451.4pt;padding:72pt 72pt 72pt 72pt}.title{padding-top:0pt;color:#000000;font-size:26pt;padding-bottom:3pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}.subtitle{padding-top:0pt;color:#666666;font-size:15pt;padding-bottom:16pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}li{color:#000000;font-size:11pt;font-family:"Arial"}p{margin:0;color:#000000;font-size:11pt;font-family:"Arial"}h1{padding-top:20pt;color:#000000;font-size:20pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h2{padding-top:18pt;color:#000000;font-size:16pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h3{padding-top:16pt;color:#434343;font-size:14pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h4{padding-top:14pt;color:#666666;font-size:12pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h5{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h6{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;font-style:italic;orphans:2;widows:2;text-align:left}',
        }}
      />
      <p className="c2">
        <span className="c0">How did it begin:</span>
      </p>
      <p className="c1">
        <span className="c0" />
      </p>
      <p className="c2">
        <span className="c0">
          Bottle Luminous started when my Partner Sarah, and i, (Sven) showed
          interest in doing the path lightning for a small art festival around
          berlin.
        </span>
      </p>
      <p className="c2">
        <span className="c0">
          &nbsp;as Sven already had some experience with smart-lights at home,
          it seemed like something to expand upon, and really make some cool
          path lightning which would actually do something more than just have
          one colour,
        </span>
      </p>
      <p className="c1">
        <span className="c0" />
      </p>
      <p className="c2">
        <span className="c0">Controlling the lights:</span>
      </p>
      <p className="c1">
        <span className="c0" />
      </p>
      <p className="c2">
        <span className="c0">
          One of the biggest challenges was, that the LED bulbs are controlled
          by an android app with very limited functionality, here the first
          programming challenge started, as a junior web developer Sven did not
          have the skills yet to write a complex low level Bluetooth driver. The
          chosen approach was: reverse engineering, Sven rooted an android
          device, and made 2 clone images of the phone, one with a lightbulb on,
          and one with the lightbulb off, by doing a deep compare of the 2 clone
          images, it came to light which file and line was responsible for
          turning the lights on and off, form here on it was just simply
          modifying the android file, create modified routines with javascript,
          and send those commands through (Android Debugging Mode),
        </span>
      </p>
      <p className="c1">
        <span className="c0" />
      </p>
      <p className="c2">
        <span className="c0">How are the Bulbs Connected:</span>
      </p>
      <p className="c1">
        <span className="c0" />
      </p>
      <p className="c2">
        <span className="c0">
          The lightbulbs are connected through Bluetooth MESH, this means, the
          Bridge (android smartphone), is only connected to one lightbulb, this
          lightbulb is connected to every lightbulb in its reach, so far the
          longest chain we made, was 700 Meters, but there is no reason to
          believe that this length is anywhere near the maximum
        </span>
      </p>
      <p className="c1">
        <span className="c0" />
      </p>
      <p className="c2">
        <span className="c0">Why the QR code on the Bottle:</span>
      </p>
      <p className="c2">
        <span className="c0">
          Every Bottle has its own unique ID, this ID lets the script know where
          it is positioned, this is important for patterns like going up and
          down, and for individual dimming
        </span>
      </p>
      <p className="c1">
        <span className="c0" />
      </p>
      <p className="c1">
        <span className="c0" />
      </p>
      <p className="c2">
        <span className="c0">
          How would setting up the bulbs look like on an event:
        </span>
      </p>
      <p className="c2">
        <span className="c0">
          Step 1: Placing the bottles into position on the event and connect
          them with power
        </span>
      </p>
      <p className="c2">
        <span className="c0">
          Step 2: Create and event map in the event manager
        </span>
      </p>
      <p className="c2">
        <span className="c0">
          Step 3: Add lamps and position them on the google maps according to
          their location
        </span>
      </p>
      <p className="c2">
        <span className="c0">
          Step 4: Click on the bulbs, and the popup window shows up to assign an
          ID to your lamp{" "}
        </span>
      </p>
      <p className="c2">
        <span className="c0">
          position, this can be done through the scan function, or this is
          possible by manually{" "}
        </span>
      </p>
      <p className="c2">
        <span className="c0">
          Step 5: Click Create a lightfile in the Basic controller functions
          tab,{" "}
        </span>
      </p>
      <p className="c2">
        <span className="c0">
          Step 6: Click Reboot device in download mode (make sure the android
          device is connected)
        </span>
      </p>
      <p className="c2">
        <span className="c0">
          Step 7: start routine on OSRAM app, the routine is around 24 hours
          long, it might take upto 5 minutes before the routine will show, the
          reason for this is, it sends a custom step by step routine file to the
          device, with around 300.000 steps, the app was not made to be reverse
          engineered, it did work very well though
        </span>
      </p>
      <p className="c1">
        <span className="c0" />
      </p>
      <p className="c2">
        <span className="c0">Can i rent the lights for my event?:</span>
      </p>
      <p className="c2">
        <span className="c0">
          No, the lights are not for rent, if you would like the lights to be at
          your event.
        </span>
      </p>
      <p className="c2">
        <span className="c0">
          you can contact me, if i like your event i might consider coming to
          your event and i could bring the lights, what i wish for is, to cover
          the costs for some spare bulbs and cables, and to cover any travel
          costs, we can pre negotiate the costs, and it would be spend as an art
          grand, also, after the event i would like to have any fancy empty
          glass bottles
        </span>
      </p>
    </div>
  );
};
