import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { GlobalContext } from "../../../components/context/GlobalContext";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import "./Storys.css"

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
