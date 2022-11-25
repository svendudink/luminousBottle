import HelpTwoToneIcon from "@mui/icons-material/HelpTwoTone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useState, useContext } from "react";
import Storys from "../media/Storys/Storys";
import { GlobalContext } from "./context/GlobalContext";

const QuestionMark = (props) => {
  const [mouseOver, setMouseOver] = useState(false);

  const [text, setText] = useState("butter");
  const [coords, setCoords] = useState({});
  const [infoVisibility, setInfoVisibility] = useState("hidden");
  const [localInfoVisibility, setLocalInfoVisibility] = useState("hidden");

  const { setLampBackground, setActivePage } = useContext(GlobalContext);
  const boxSize = {
    width: "200px",
    height: "100px",
  };

  if (props.size) {
    boxSize.width = props.size.width;
    boxSize.height = props.size.height;
  }

  const infoWindowHandler = (name, e) => {
    if (name === "hide") {
      setInfoVisibility("hidden");
      setMouseOver(false);
    } else if (e !== "none") {
      setInfoVisibility("visible");
      setMouseOver(true);
      console.log(e.screenX, typeof e.screenY);
    }
    setCoords({
      x: e.screenX + 200,
      y: e.screenY + 600,
    });
    console.log(coords);

    setText(name);
  };

  console.log(mouseOver);

  return (
    <div>
      {mouseOver ? (
        <HelpTwoToneIcon
          onMouseEnter={(e) => infoWindowHandler(props.story, e)}
          onMouseLeave={(e) => infoWindowHandler("hide", e)}
        />
      ) : (
        <HelpOutlineIcon
          onMouseEnter={(e) => infoWindowHandler(props.story, e)}
          onMouseLeave={(e) => infoWindowHandler("hide", e)}
        />
      )}
      <div
        onMouseEnter={() => setLocalInfoVisibility("visible")}
        onMouseLeave={() => setLocalInfoVisibility("hidden")}
        style={{
          position: "fixed",
          zIndex: "2",

          width: boxSize.width,
          height: boxSize.height,
          backgroundColor: "#eeeee4",
          visibility: `${
            infoVisibility === "hidden" && localInfoVisibility === "hidden"
              ? "hidden"
              : "visible"
          }`,

          borderRadius: "10px",
          outlineColor: "black",

          outlineWidth: "4px",
          outlineStyle: "dashed",
        }}
      >
        <Storys story={props.story} />
      </div>
    </div>
  );
};

export default QuestionMark;
