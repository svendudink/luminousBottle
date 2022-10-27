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

import { GlobalContext } from "../components/context/GlobalContext";
import Draggable from "react-draggable";

import { ioContext } from "../components/context/IoConnectContext";
import Video from "../components/Video";

const BasicController = () => {
  const { filteredEventList, GraphQLHandler, bulbIdList, setActivePage } =
    useContext(GlobalContext);

  const { socket, connect, setConnect, isConnected, setIsConnected } =
    useContext(ioContext);

  const [bulbMovement, setBulbMovement] = useState("0");
  const [bulbColours, setbulbColours] = useState("0");
  const [mapping, setMapping] = useState(`Empty`);
  const [liveVideo, setLiveVideo] = useState("");
  const liveVideRef = useRef();

  const fps = 15;

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

  /////////////////////////////////////Sven's//Coding/ Date: 21-10-2022 15:41 ////////////
  // play live video
  /////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

  // const socket = io.connect("http://localhost:8080");
  // socket.on("image", (image) => {
  //   console.log('data', data);
  //   const img = document.getElementById("image");
  //   img.src = `data:image/jpeg;base64,${image}`;
  //   setLiveVideo(`data:image/jpeg;base64,${image}`);
  // });

  // const img = document.getElementById("image");
  // img.src = `data:image/jpeg;base64,${image}`;
  // setLiveVideo(`data:image/jpeg;base64,${image}`);

  // const socket = io.connect("http://localhost:8081", {
  //   allowRequest: (req, callback) => {
  //     callback(null, req.headers.origin === undefined); // cross-origin requests will not be allowed
  //   },
  // });

  // socket.on("image", (image) => {
  //   setLiveVideo(image);
  //   socket.off("disconnect");
  // });

  //socket.on("connect");

  // socket.on("image", (image) => {
  //   setLiveVideo(image);
  //   socket.off("image");
  // });
  console.log("rendertest");

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

    await fetch("http://localhost:8080/graphql", {
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

  const [preAlphaCheckBox, setPreAlphaCheckBox] = useState(true);

  const handleCheckBoxChange = (e) => {
    console.log(e.target.checked);
    setPreAlphaCheckBox(e.target.checked);
  };

  const directColorHandler = (e) => {
    GraphQLHandler(
      0,
      "center.lat",
      "center.lng",
      "directColor",
      "textValue",
      "none",
      "none",
      e
    );
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
      <Button id={0} onClick={clickHandler} variant="contained">
        Reboot Device in download mode and write lightfile to phone
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
          <div
            style={{
              borderTop: "2px solid #fff ",
              marginLeft: 20,
              marginRight: 20,
              marginTop: 30,
            }}
          ></div>
          Project: Direct control of lightbulbs, technology used: ADB send touch
          event to control <br />
          Status: works but delay is +500ms, possible solution is using
          monkeyrunner in SDK package
          <br />
          <Button
            id={0}
            onClick={() => directColorHandler("red")}
            variant="contained"
          >
            RED
          </Button>
          <Button
            id={0}
            onClick={() => directColorHandler("green")}
            variant="contained"
          >
            GREEN
          </Button>
          <Button
            id={0}
            onClick={() => directColorHandler("blue")}
            variant="contained"
          >
            BLUE
          </Button>
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
