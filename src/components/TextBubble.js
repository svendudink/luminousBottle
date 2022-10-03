import React from "react";
import "./Popup.css";
import { useContext, useReducer, useState, useEffect } from "react";
import { GlobalContext } from "./context/GlobalContext";
import QrScanner from "./QrScanner.js";
import { ReactDOM } from "react";
import { QrReader } from "react-qr-reader";
import Storys from "../media/background/Storys/Storys";

function TextBubble(props) {
  const { infoVisibility, setInfoVisibility, setLampBackground } =
    useContext(GlobalContext);
  const [localInfoVisibility, setLocalInfoVisibility] = useState("hidden");

  console.log(infoVisibility);

  return (
    <div
      onMouseEnter={() => setLocalInfoVisibility("visible")}
      onMouseLeave={() => setLocalInfoVisibility("hidden")}
      style={{
        position: "fixed",
        top: `${props.coords.y}`,
        left: `${props.coords.x}`,
        width: "200px",
        height: "100px",
        backgroundColor: "#1A2036",
        visibility: `${
          infoVisibility === "hidden" && localInfoVisibility === "hidden"
            ? "hidden"
            : "visible"
        }`,
        transition: "0.4s ease",
        borderRadius: "10px",
        outlineColor: "black",
        outlineWidth: "4px",
        outlineStyle: "dashed",
      }}
    >
      {props.text}

      <Storys story={props.story} />
    </div>
  );
}

export default TextBubble;
