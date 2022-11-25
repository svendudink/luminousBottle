import React from "react";
import "./Popup.css";
import { useContext, useState } from "react";
import { GlobalContext } from "./context/GlobalContext";
import Storys from "../media/Storys/Storys";

function TextBubble(props) {
  const { infoVisibility } = useContext(GlobalContext);
  const [localInfoVisibility, setLocalInfoVisibility] = useState("hidden");

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
        backgroundColor: "#eeeee4",
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
