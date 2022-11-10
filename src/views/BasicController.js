/////////////////////////////////////Sven's//Coding/ Date: 17-10-2022 15:33 ////////////
// this view is the basic control for sending commands to the android device for writing the XML file to the device and set the specs
/////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

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

import FormGroup from "@mui/material";
import { GlobalContext } from "../components/context/GlobalContext";
import Draggable from "react-draggable";
import image from "../media/Untitled-fococlipping-standard.png";

import { ioContext } from "../components/context/IoConnectContext";
import Video from "../components/Video";

const BasicController = () => {
  const { filteredEventList, GraphQLHandler, bulbIdList, setActivePage } =
    useContext(GlobalContext);

  const { serverStatus } = useContext(ioContext);

  const [bulbMovement, setBulbMovement] = useState("0");
  const [bulbColours, setbulbColours] = useState("0");
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
    if (serverStatus === "Direct control mode started") {
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
        bulbMovement === "0" ? "0" : bulbMovement.target.value
      }", bulbColours: "${
        bulbColours === "0" ? "0" : bulbColours.target.value
      }"}){notDefined}}`,
    };

    await fetch("http://bottle.hopto.org:8080/graphql", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(graphqlQuery),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
      });
  };

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
      currentBrightness,
      "brightness"
    );
    console.log(event);
  };

  return (
    <div>
      <div>
        {" "}
        Enable Pre-Alpha functionality:{" "}
        <Checkbox
          checked={preAlphaCheckBox}
          onChange={handleCheckBoxChange}
          inputProps={{ "aria-label": "controlled" }}
        />
        (Warning, enabling Pre-Alpha functions is unstable and might break other
        functions as well)
      </div>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">Bulb travel pattern</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={bulbMovement === "0" ? "0" : bulbMovement.target.value}
          label="Bulb travel pattern"
          onChange={setBulbMovement}
        >
          <MenuItem value=""></MenuItem>
          <MenuItem value={"0"}>Breathing whole group</MenuItem>
          <MenuItem value={"2"}>Up and down random</MenuItem>
          <MenuItem value={"1"}>Fully random</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">Bulb Colours</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={bulbColours === "0" ? "0" : bulbColours.target.value}
          label="Bulb travel pattern"
          onChange={setbulbColours}
        >
          <MenuItem value=""></MenuItem>
          <MenuItem value={"0"}>Full random colours</MenuItem>
          <MenuItem value={"1"}>Specified colours, set in backend</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
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
          })}
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
        disabled={eventsDisabled}
        id={0}
        onClick={clickHandler}
        variant="contained"
      >
        send to phone and start event
      </Button>
      <br></br>
      <br></br>
      <div></div>
      <Button id={2} onClick={clickHandler} variant="contained">
        Read file from android
      </Button>
      {/* /////////////////////////////////////Sven's//Coding/ Date: 18-10-2022 12:35 ////////////  
       //  Pre Alpha
       /////////////////////////////////////////gnidoC//s'nevS//////////////////////////////// */}
      {preAlphaCheckBox && (
        <div>
          <div>
            <div
              style={{
                borderTop: "2px solid #fff ",
                marginLeft: 20,
                marginRight: 20,
                marginTop: 30,
              }}
            ></div>
            <AndroidServerStatus />
          </div>
          <div
            style={{
              borderTop: "2px solid #fff ",
              marginLeft: 20,
              marginRight: 20,
              marginTop: 30,
            }}
          >
            {" "}
            <Switch onChange={directControl} />
            Enable direct control of lights, this will stop any running event
            and will need to wait for reconnect
          </div>
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
          Off
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
          <div
            style={{
              width: "150px",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
          <div>
            <div
              style={{
                borderTop: "2px solid #fff ",
                marginLeft: 20,
                marginRight: 20,
                marginTop: 30,
              }}
            ></div>
          </div>
          <div>
            <div>
              <Video />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicController;
