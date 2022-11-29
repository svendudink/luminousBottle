/////////////////////////////////////Sven's//Coding/ Date: 17-10-2022 15:33 ////////////
// this view is the basic control for sending commands to the android device for writing the XML file to the device and set the specs
/////////////////////////////////////////gnidoC//s'nevS////////////////////////////////
import "./BasicController.css";
import { Button } from "@mui/material";
import { useState, useContext, useEffect, useRef } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Checkbox } from "@mui/material";
import AndroidServerStatus from "../components/AndroidServerStatus";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material";
import { Slider } from "@mui/material";
import QuestionMark from "../components/QuestionMark";
import FormGroup from "@mui/material";
import { GlobalContext } from "../components/context/GlobalContext";
import Draggable from "react-draggable";
import image from "../media/Untitled-fococlipping-standard.png";
import { UserContext } from "../components/context/UserContext";
import { useNavigate } from "react-router-dom";
import { ioContext } from "../components/context/IoConnectContext";
import Video from "../components/Video";

const BasicController = () => {
  const navigate = useNavigate();

  const {
    filteredEventList,
    GraphQLHandler,
    bulbIdList,
    setActivePage,
    selectServer,
    setSelectServer,
  } = useContext(GlobalContext);
  const { loggedIn } = useContext(UserContext);

  const { serverStatus } = useContext(ioContext);

  console.log(serverStatus);

  const [bulbMovement, setBulbMovement] = useState("2");
  const [bulbColours, setbulbColours] = useState("1");
  const [mapping, setMapping] = useState(`Empty`);
  const [liveVideo, setLiveVideo] = useState("");
  const [eventsDisabled, setEventsDisabled] = useState(false);
  const [lightDisabled, setLightDisabled] = useState(true);
  const [currentBrightness, setCurrentBrightness] = useState(100);

  /////////////////////////////////////Sven's//Coding/ Date: 17-10-2022 15:33 ////////////
  // Initial Loading of the list of Events
  /////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

  useEffect(() => {
    setActivePage("basicController");
    document.title = "Bottle Luminous: Basic controller functions";
  });

  if (bulbIdList === "") {
    GraphQLHandler(0, "center.lat", "center.lng", "firstLoad", "textValue");
  }

  useEffect(() => {
    if (serverStatus.includes("Direct control mode started")) {
      setLightDisabled(false);
    }
  }, [serverStatus]);

  

  /////////////////////////////////////Sven's//Coding/ Date: 17-10-2022 15:33 ////////////
  // sends parameters to backend for control of android device
  /////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

  const clickHandler = async (e) => {
    console.log(mapping);
    const graphqlQuery = {
      query: `mutation {ControlDevice(SetValues: {sendToAndroid: "${
        e.target.id === "0" ? true : false
      }", createLightFile: "${
        e.target.id === "1" ? true : false
      }",mapping: "${mapping}", readFileFromAndroid: "${
        e.target.id === "2" ? true : false
      }", bulbMovement: "${
        bulbMovement === "2" ? "2" : bulbMovement.target.value
      }", bulbColours: "${
        bulbColours === "1" ? "1" : bulbColours.target.value
      }"}){notDefined}}`,
    };

    await fetch(`https://${selectServer}:8080/graphql`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(graphqlQuery),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
      });
  };
  /////////////////////////////////////Sven's//Coding/ Date: 26-11-2022 16:44 ////////////
  // Demo mode
  /////////////////////////////////////////gnidoC//s'nevS////////////////////////////////
  useEffect(() => {
    if (!loggedIn) {
      GraphQLHandler(
        0,
        "center.lat",
        "center.lng",
        "directEvent",
        "textValue",
        "none",
        "none",
        "enableDirectControl"
      );
      setLightDisabled(false);
    }
  }, [loggedIn]);

  /////////////////////////////////////Sven's//Coding/ Date: 18-10-2022 12:27 ////////////
  // Pre Alpha functionality
  /////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

  const directControl = (e) => {
    if (e.target.checked) {
      console.log("checked");
      setEventsDisabled(true);
      GraphQLHandler(
        0,
        "center.lat",
        "center.lng",
        "directEvent",
        "textValue",
        "none",
        "none",
        "enableDirectControl"
      );
    } else {
      setLightDisabled(true);
      setEventsDisabled(false);
      GraphQLHandler(
        0,
        "center.lat",
        "center.lng",
        "directEvent",
        "textValue",
        "none",
        "none",
        "disableDirectControl"
      );
    }
  };

  const [preAlphaCheckBox, setPreAlphaCheckBox] = useState(true);

  const handleCheckBoxChange = (e) => {
    console.log(e.target.checked);
    setPreAlphaCheckBox(e.target.checked);
    if (e.target.checked) {
      setSelectServer("bottle.hopto.org");
    } else {
      setSelectServer("bottleluminousback.herokuapp.com");
    }
  };

  const directEventHandler = (e) => {
    GraphQLHandler(
      0,
      "center.lat",
      "center.lng",
      "directEvent",
      "textValue",
      "none",
      "none",
      e
    );
  };

  /////////////////////////////////////Sven's//Coding/ Date: 24-11-2022 13:19 ////////////
  // before closing tab
  /////////////////////////////////////////gnidoC//s'nevS////////////////////////////////
  useEffect(() => {
    const handleTabClose = (event) => {
      event.preventDefault();

      console.log("beforeunload event triggered");

      GraphQLHandler(
        0,
        "center.lat",
        "center.lng",
        "directEvent",
        "textValue",
        "none",
        currentBrightness,
        "close"
      );
      return console.log("killedServer");
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);

  /////////////////////////////////////Sven's//Coding/ Date: 09-11-2022 23:07 ////////////
  // Brightness handling
  /////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

  const brightnessHandler = (event) => {
    setCurrentBrightness(event.target.value);
  };

  const brightnessCommitHandler = (event) => {
    GraphQLHandler(
      0,
      "center.lat",
      "center.lng",
      "directEvent",
      "textValue",
      "none",
      currentBrightness === 0 ? 1 : currentBrightness,
      "brightness"
    );
    console.log(event);
  };
  /////////////////////////////////////Sven's//Coding/ Date: 27-11-2022 14:46 ////////////
  // Scaling of website, possibly also doable with CSS, but as my interest in very little learning CSS,
  // i prefer just to build a JS scaling
  /////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

  return (
    <div className="tenKFieldBasic">
      <div className="videoQuestionMark">
        <QuestionMark
          story="video"
          size={{ height: "190px", width: "300px" }}
        />
      </div>
      <div className="video">
        <Video />
      </div>
      <div className="welcome">
        {loggedIn ? (
          <div style={{ cursor: "pointer", color: "green", fontSize: 24 }}>
            You are Logged in, all functions are available
          </div>
        ) : (
          <div
            onClick={() => navigate("/LoginCreateUser")}
            style={{ color: "red" }}
          >
            Register and login to unlock map building, in demo mode only direct
            control is available
          </div>
        )}
      </div>
      <div className="directControl">
        <div>
          {loggedIn ? (
            <div>
              {lightDisabled
                ? "Enable direct control of lights"
                : "direct control is enabled, switch off to use the event build mode"}
            </div>
          ) : (
            <div>Welcome to Demo mode, change the color and the brightness</div>
          )}
          {loggedIn ? (
            <Switch disabled={!loggedIn} onChange={directControl} />
          ) : (
            ""
          )}
        </div>

        <div style={{ paddingTop: "10px" }}>
          <Button
            id={0}
            onClick={() => directEventHandler("red")}
            variant="contained"
            disabled={lightDisabled}
          >
            RED
          </Button>
          <Button
            id={0}
            onClick={() => directEventHandler("green")}
            variant="contained"
            disabled={lightDisabled}
          >
            GREEN
          </Button>
          <Button
            id={0}
            onClick={() => directEventHandler("blue")}
            variant="contained"
            disabled={lightDisabled}
          >
            BLUE
          </Button>
          <br></br>
          1%
          <Slider
            size="large"
            value={Number(currentBrightness)}
            aria-label="Small"
            valueLabelDisplay="auto"
            onChange={brightnessHandler}
            onChangeCommitted={brightnessCommitHandler}
            disabled={lightDisabled}
            style={{
              width: "150px",
            }}
          />{" "}
          100%
        </div>
      </div>
      <div className="buildEvent">
        <div style={{ paddingRight: "500px" }}>
          <QuestionMark
            story="eventControl"
            size={{ height: "190px", width: "650px" }}
          />
        </div>
        <br />
        <FormControl
          disabled={!loggedIn}
          sx={{ m: 1, minWidth: 120 }}
          size="small"
        >
          <InputLabel id="demo-select-small">Bulb travel pattern</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={bulbMovement === "2" ? "2" : bulbMovement.target.value}
            label="Bulb travel pattern"
            onChange={setBulbMovement}
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value={"2"}>Up and down</MenuItem>
            <MenuItem value={"0"}>Breathing whole group</MenuItem>
            <MenuItem value={"1"}>Fully random</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          disabled={!loggedIn}
          sx={{ m: 1, minWidth: 120 }}
          size="small"
        >
          <InputLabel id="demo-select-small">Bulb Colours</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={bulbColours === "1" ? "1" : bulbColours.target.value}
            label="Bulb travel pattern"
            onChange={setbulbColours}
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value={"0"}>Full random colours</MenuItem>
            <MenuItem value={"1"}>Specified colours</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          disabled={!loggedIn}
          sx={{ m: 1, minWidth: 120 }}
          size="small"
        >
          <InputLabel id="demo-select-small">Mapping</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={mapping}
            label="Mapping"
            onChange={(e) => {
              setMapping(e.target.value);
            }}
          >
            <MenuItem key={Math.random()} value="Empty">
              Select
            </MenuItem>
            {filteredEventList.map((option) => {
              return (
                <MenuItem key={Math.random()} value={option.name}>
                  {option.name}
                </MenuItem>
              );
            })}{" "}
          </Select>
        </FormControl>
        <br></br>
        <br></br>
        <Button
          disabled={mapping === "Empty" ? true : false}
          id={1}
          onClick={clickHandler}
          variant="contained"
        >
          Create LightFile
        </Button>
        <br></br>
        <br></br>
        <Button
          disabled={!loggedIn || eventsDisabled ? true : false}
          id={0}
          onClick={clickHandler}
          variant="contained"
        >
          send to phone and start event
        </Button>
        <br></br>
        <br></br>
        <div></div>
      </div>

      <div className="serverStatusMonitor">
        <AndroidServerStatus />
      </div>
    </div>
  );
};

export default BasicController;

//  const temp = (
//    <div className="tenKField">
//      {loggedIn ? (
//        <div>You are Logged in, all functions are available</div>
//      ) : (
//       <div>
//         Register and login to unlock map building, in demo mode only direct
//         control is available
//       </div>
//     )}
//     <div className="video">
//       <Video />
//     </div>
//     <div
//       style={{
//         borderTop: "2px solid #fff ",
//         marginLeft: 20,
//         marginRight: 20,
//         marginTop: 30,
//       }}
//     >
//       {" "}
//       {/* Direct control */}
//   <div className="directControl">
//     <div>
//       <Switch disabled={!loggedIn} onChange={directControl} />
//       Enable direct control of lights, this will stop any running event and
//       will need to wait for reconnect
//     </div>
//     <Button
//       id={0}
//       onClick={() => directEventHandler("red")}
//       variant="contained"
//       disabled={lightDisabled}
//     >
//       RED
//     </Button>
//     <Button
//       id={0}
//       onClick={() => directEventHandler("green")}
//       variant="contained"
//       disabled={lightDisabled}
//     >
//       GREEN
//     </Button>
//     <Button
//       id={0}
//       onClick={() => directEventHandler("blue")}
//       variant="contained"
//       disabled={lightDisabled}
//     >
//       BLUE
//     </Button>
//     <br></br>
//     1%
//     <Slider
//       size="large"
//       value={Number(currentBrightness)}
//       aria-label="Small"
//       valueLabelDisplay="auto"
//       onChange={brightnessHandler}
//       onChangeCommitted={brightnessCommitHandler}
//       disabled={lightDisabled}
//       style={{
//         width: "150px",
//       }}
//     />{" "}
//     100%
//     <div
//       style={{
//         width: "150px",
//         position: "relative",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     ></div>
//     <div>
//       <div
//         style={{
//           borderTop: "2px solid #fff ",
//           marginLeft: 20,
//           marginRight: 20,
//           marginTop: 30,
//         }}
//       ></div>
//     </div>
//     {/* end of Direct control */}
//   </div>
// </div>
//     {/* Event control */}
//     <div>
//       <br />
//       <FormControl
//         disabled={!loggedIn}
//         sx={{ m: 1, minWidth: 120 }}
//         size="small"
//       >
//         <InputLabel id="demo-select-small">Bulb travel pattern</InputLabel>
//         <Select
//           labelId="demo-select-small"
//           id="demo-select-small"
//           value={bulbMovement === "2" ? "2" : bulbMovement.target.value}
//           label="Bulb travel pattern"
//           onChange={setBulbMovement}
//         >
//           <MenuItem value=""></MenuItem>
//           <MenuItem value={"2"}>Up and down</MenuItem>
//           <MenuItem value={"0"}>Breathing whole group</MenuItem>
//           <MenuItem value={"1"}>Fully random</MenuItem>
//         </Select>
//       </FormControl>
//       <FormControl
//         disabled={!loggedIn}
//         sx={{ m: 1, minWidth: 120 }}
//         size="small"
//       >
//         <InputLabel id="demo-select-small">Bulb Colours</InputLabel>
//         <Select
//           labelId="demo-select-small"
//           id="demo-select-small"
//           value={bulbColours === "1" ? "1" : bulbColours.target.value}
//           label="Bulb travel pattern"
//           onChange={setbulbColours}
//         >
//           <MenuItem value=""></MenuItem>
//           <MenuItem value={"0"}>Full random colours</MenuItem>
//           <MenuItem value={"1"}>Specified colours</MenuItem>
//         </Select>
//       </FormControl>
//       <FormControl
//         disabled={!loggedIn}
//         sx={{ m: 1, minWidth: 120 }}
//         size="small"
//       >
//         <InputLabel id="demo-select-small">Mapping</InputLabel>
//         <Select
//           labelId="demo-select-small"
//           id="demo-select-small"
//           value={mapping}
//           label="Mapping"
//           onChange={(e) => {
//             setMapping(e.target.value);
//           }}
//         >
//           <MenuItem key={Math.random()} value="Empty">
//             Select
//           </MenuItem>
//           {filteredEventList.map((option) => {
//             return (
//               <MenuItem key={Math.random()} value={option.name}>
//                 {option.name}
//               </MenuItem>
//             );
//           })}{" "}
//         </Select>
//       </FormControl>
//       <br></br>
//       <br></br>
//       <Button
//         disabled={mapping === "Empty" ? true : false}
//         id={1}
//         onClick={clickHandler}
//         variant="contained"
//       >
//         Create LightFile
//       </Button>
//       <br></br>
//       <br></br>
//       <Button
//         disabled={!loggedIn || eventsDisabled ? true : false}
//         id={0}
//         onClick={clickHandler}
//         variant="contained"
//       >
//         send to phone and start event
//       </Button>
//       <br></br>
//       <br></br>
//       <div></div>
//     </div>
//     {/* end of Event control */}

//     <div>
//       <div
//         style={{
//           borderTop: "2px solid #fff ",
//           marginLeft: 20,
//           marginRight: 20,
//           marginTop: 30,
//         }}
//       >
//         Connection time to lights might take upto 3-4 minutes, this is due to
//         the many bluetooth devices in the area and the lamps all being
//         positioned in the range of the main controller, in real live situations
//         this is not the case and therefore this will not be fixed
//       </div>
//       <div>
//         <div
//           style={{
//             borderTop: "2px solid #fff ",
//             marginLeft: 20,
//             marginRight: 20,
//             marginTop: 30,
//           }}
//         ></div>
//         <div>
//           <AndroidServerStatus />
//         </div>
//       </div>
//     </div>
//   </div>
// );
