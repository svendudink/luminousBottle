import GoogleMap from "../components/Map";
import { useReducer, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../components/context/GlobalContext";
import { TextField } from "@mui/material";
import Popup from "../components/Popup";
import EnhancedTable from "../components/EnhancedTable";
import "./CreateMapping.css";
import Button from "@mui/material/Button";
import IconMenu from "../components/IconMenu";
import QuestionMark from "../components/QuestionMark";
import { Image } from "react-bootstrap";
import "./CreateMapping.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Toolbar = () => {
  return <div className="head"></div>;
};

const CreateMapping = () => {
  const {
    bulbIdList,
    activeMap,
    setActiveMap,
    filteredEventList,
    setFilteredEventList,
    center,
    markers,
    setMarkers,
    GraphQLHandler,
    currentLampId,
    setCurrentLampId,
    textValue,
    setTextValue,
    buttonPopup,
    bulbConfiguratorVisibility,
    setBulbConfiguratorVisibility,
    map,
    setMap,
    setCenter,
    setCenterOption,
    setZoom,
    setActivePage,
    maxBulbIdLength,
    demo,
  } = useContext(GlobalContext);

  /////////////////////////////////////Sven's//Coding/ Date: 17-10-2022 15:40 ////////////
  // Initial loading of values
  /////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

  useEffect(() => {
    console.log(filteredEventList);
  }, [filteredEventList]);

  useEffect(() => {
    setActivePage("createMapping");
    document.title = "Bottle Luminous: Create event map";
  });

  useEffect(() => {
    setMap(null);
    if (activeMap === "AlexanderPlatz Demo")
      GraphQLHandler(0, 0, 0, "load", "AlexanderPlatz Demo");
    if (activeMap !== "(Select)") {
      setCenterOption("firstMarker");
    }
  }, []);

  let firstLoad = (e) => {
    GraphQLHandler(0, center.lat, center.lng, "firstLoad", textValue);
  };
  if (bulbIdList === "") {
    firstLoad();
  }

  const [, forceRerender] = useReducer((x) => x + 1, 0);

  /////////////////////////////////////Sven's//Coding/ Date: 26-11-2022 10:50 ////////////
  // Search functionality for map
  /////////////////////////////////////////gnidoC//s'nevS////////////////////////////////
  const [searchInput, setSearchInput] = useState("");

  const searchText = (e) => {
    setSearchInput(e.target.value);
  };

  const searchMap = async (search) => {
    let response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${searchInput}%2015&key=AIzaSyD2ZcdhauruGPbtzIEqEMPWERuq9x8FVxA`
    );

    if (response.ok) {
      // if HTTP-status is 200-299
      // get the response body (the method explained below)
      let json = await response.json();
      console.log(
        json.results[0].geometry.location.lat,
        json.results[0].geometry.location.lng
      );
      setCenterOption("search");
      setCenter({
        lat: json.results[0].geometry.location.lat,
        lng: json.results[0].geometry.location.lng,
      });
      setSearchInput("");
    } else {
      alert("HTTP-Error: " + response.status);
    }
  };

  /////////////////////////////////////Sven's//Coding/ Date: 17-10-2022 15:48 ////////////
  // Dropdown menu
  /////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

  const Dropdown = ({ label, value, options, onChange }) => {
    return (
      <label>
        {label}
        <select value={activeMap} onChange={onChange}>
          <option value={"Select"}>{"(Select)"}</option>
          {options.map((option) => (
            <option key={Math.random()} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
      </label>
    );
  };

  const dropdownHandleChange = async (event) => {
    setBulbConfiguratorVisibility("hidden");
    setCurrentLampId(0);
    setCenterOption("firstMarker");
    setMarkers([]);
    setZoom(17);

    if (event.target.value !== "Select") {
      await GraphQLHandler(0, 0, 0, "load", event.target.value);
      setActiveMap(event.target.value);
    } else {
      setActiveMap("(Select)");
    }
  };

  console.log(maxBulbIdLength, markers.length);

  /////////////////////////////////////Sven's//Coding/ Date: 17-10-2022 16:09 ////////////
  // Sending the map action buttons to backend over GraphQL
  /////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

  const actionHandler = async (action) => {
    console.log(currentLampId);
    let findMiddle = false;

    if (activeMap.includes(demo)) {
      if (action === "deleteActive" || action === "addLampBeforeActive") {
        window.alert(
          "Cant delete lamps on Demo events, your are limited to brightness and color change,feel free to create your own event, ofcourse you can delete lamps on your own event"
        );
        return;
      }
    }
    if (action === "deleteActive" && markers.length <= currentLampId) {
      console.log("checked");
      setCurrentLampId(currentLampId - 1);
      if (currentLampId === 1) {
        setBulbConfiguratorVisibility("hidden");
      }
    }

    if (markers.length > 1 && currentLampId !== 1 && currentLampId !== 0) {
      findMiddle = markers.filter((el) => {
        return (
          el.id === currentLampId.toString() ||
          el.id === (currentLampId - 1).toString()
        );
      });
    }

    await GraphQLHandler(
      currentLampId,
      findMiddle
        ? (Number(findMiddle[0].lat) + Number(findMiddle[1].lat)) / 2
        : map.center.lat(),
      findMiddle
        ? (Number(findMiddle[0].lng) + Number(findMiddle[1].lng)) / 2
        : map.center.lng(),
      action,
      activeMap
    );
  };

  let addNewLampHandler = async () => {
    console.log("addnewlamp", demo, activeMap, activeMap.includes(demo));
    if (activeMap.includes(demo)) {
      window.alert(
        "Cant add lamps on Demo events,your are limited to brightness and color change, feel free to create your own event, ofcourse you can add lamps on your own event"
      );
      return;
    }
    setCenterOption("mapCenter");
    setCenter({
      lat: map.center.lat(),
      lng: map.center.lng(),
    });

    const lat = map.center.lat();
    const lng = map.center.lng();
    const newId = markers.length === 0 ? 1 : Number(markers.length + 1);

    await GraphQLHandler(newId, lat, lng, "addLamp", activeMap, "none", 100);
    markers[markers.length] = { id: newId, lat, lng };
  };

  let inputText = (input) => {
    setTextValue(input.target.value);
  };

  let createNewMap = (e) => {
    GraphQLHandler(0, center.lat, center.lng, "newMap", textValue);
    setTextValue("");
    forceRerender();
  };

  const deleteMap = () => {
    if (activeMap.includes(demo)) {
      window.alert(
        "Hi there this is a demo Event, created with much love, feel free to make your own event, and afterwards you can ofcourse delete it"
      );
    } else {
      let confirmAction = window.confirm(
        `Are you sure you wish to delete ${activeMap} ?`
      );
      if (confirmAction) {
        setMarkers([]);
        GraphQLHandler("id", "lat", "lng", "delete", activeMap);
        let temp;
        temp = filteredEventList.filter((e) => {
          return e.name !== activeMap;
        });
        setFilteredEventList(temp);
        setActiveMap("AlexanderPlatz Demo");
      }
    }
  };

  return (
    <div className="tenKField">
      <div className="googleMap">
        <div style={{ paddingRight: "800px" }}>
          <QuestionMark
            size={{ height: "190px", width: "200px" }}
            story="googleMap"
          />
        </div>
        <GoogleMap />
      </div>
      <div
        className="iconMenu"
        style={{
          visibility: `${bulbConfiguratorVisibility}`,
        }}
      >
        <IconMenu id={currentLampId} bulbIdList={bulbIdList} />
      </div>
      <div className="addLampContainer">
        <div className="addLamp">
          <QuestionMark
            size={{ height: "150px", width: "600px" }}
            story="addLamp"
          />
          <Button
            size="large"
            variant="outlined"
            disabled={
              activeMap === "(Select)" || maxBulbIdLength <= markers.length
            }
            onClick={() => addNewLampHandler()}
            style={{
              maxWidth: "300px",
              maxHeight: "300px",
              minWidth: "30px",
              minHeight: "30px",
              marginTop: "20px",
              marginRight: "20px",
              marginLeft: "10px",
            }}
          >
            {maxBulbIdLength <= markers.length
              ? "MAX BULBS REACHED"
              : "add new lamp"}
          </Button>
          <Button
            size="large"
            variant="outlined"
            disabled={
              currentLampId === 0
                ? true
                : false ||
                  bulbIdList.length < currentLampId ||
                  maxBulbIdLength <= markers.length
            }
            onClick={() => actionHandler("addLampBeforeActive")}
            style={{
              maxWidth: "300px",
              maxHeight: "300px",
              minWidth: "30px",
              minHeight: "30px",
              marginLeft: "20px",
              marginRight: "20px",
              marginTop: "20px",
            }}
          >
            {maxBulbIdLength <= markers.length
              ? "MAX BULBS REACHED"
              : " Add before selected Lamp"}
          </Button>
          <Button
            size="large"
            variant="outlined"
            disabled={currentLampId === 0 ? true : false}
            onClick={() => actionHandler("deleteActive")}
            style={{
              maxWidth: "300px",
              maxHeight: "300px",
              minWidth: "30px",
              minHeight: "30px",
              marginLeft: "20px",
              marginRight: "20px",
              marginTop: "20px",
            }}
          >
            Delete Selected Lamp
          </Button>

          <Button
            size="large"
            variant="outlined"
            disabled={activeMap === "(Select)" || markers.length < 2}
            onClick={() => actionHandler("verticalScan")}
            style={{
              maxWidth: "300px",
              maxHeight: "300px",
              minWidth: "30px",
              minHeight: "30px",
              marginLeft: "20px",
              marginRight: "20px",
              marginTop: "20px",
            }}
          >
            Vertical Scan
          </Button>

          <Button
            size="large"
            variant="outlined"
            disabled={activeMap === "(Select)" || markers.length < 2}
            onClick={() => actionHandler("horizontalScan")}
            style={{
              maxWidth: "300px",
              maxHeight: "300px",
              minWidth: "30px",
              minHeight: "30px",
              marginLeft: "20px",
              marginRight: "20px",
              marginTop: "20px",
            }}
          >
            Horizontal Scan
          </Button>
        </div>
      </div>
      <div className="mapManager">
        <div className="mapOps">
          <div
            style={{
              position: "absolute",
            }}
          >
            <QuestionMark
              size={{ height: "100px", width: "200px" }}
              story="mapManager"
            />
          </div>
          <div>Map Manager:</div>

          <TextField
            id="outlined-helperText"
            label="New map name:"
            value={textValue}
            onChange={inputText}
            onKeyPress={(ev) => {
              if (ev.key === "Enter") {
                createNewMap();
                ev.preventDefault();
              }
            }}
          />
          <Button onClick={() => createNewMap()}>Add new map</Button>
          <div>
            {filteredEventList[1] && (
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Choose map</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={activeMap}
                  label="Mapping"
                  onChange={dropdownHandleChange}
                >
                  <MenuItem key={Math.random()} value={"Empty"}></MenuItem>
                  {filteredEventList.map((option) => {
                    return (
                      <MenuItem key={Math.random()} value={option.name}>
                        {option.name}
                      </MenuItem>
                    );
                  })}{" "}
                </Select>
              </FormControl>
            )}
          </div>
          <Button
            onClick={deleteMap}
            disabled={activeMap === "(Select)" ? true : false}
          >
            Delete map
          </Button>
        </div>
      </div>
      <div className="legendaContainer">
        <div className="legenda">
          <div style={{ position: "left" }}></div>
          <div>
            <TextField
              id="outlined-helperText"
              label="Search"
              value={searchInput}
              onChange={searchText}
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  createNewMap();
                  ev.preventDefault();
                }
              }}
            />
            <Button onClick={() => searchMap()}>Search</Button>
          </div>
          Legenda:{"        "}
          <img
            src={
              "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_black.png"
            }
            alt={"none"}
          />
          = Turned of.{"     "}
          <img
            src={
              "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_red.png"
            }
            alt={"none"}
          />
          <img
            src={
              "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_green.png"
            }
            alt={"none"}
          />
          <img
            src={
              "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blue.png"
            }
            alt={"none"}
          />
          <img
            src={
              "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_orange.png"
            }
            alt={"none"}
          />
          <img
            src={
              "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_yellow.png"
            }
            alt={"none"}
          />
          <img
            src={
              "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_purple.png"
            }
            alt={"none"}
          />
          = Color of lamp
          <img
            src={
              "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_white.png"
            }
            alt={"none"}
          />{" "}
          = Lamp is set to multiColor
        </div>
      </div>
      <div className="enhancedTableContainer">
        <div className="enhancedTable">
          <EnhancedTable />{" "}
        </div>
        <div>
          <Popup trigger={buttonPopup} />
        </div>
      </div>
    </div>
  );
};

export default CreateMapping;

/* <Toolbar />
      <div>
        <div
          className="iconMenu"
          style={{
            visibility: `${bulbConfiguratorVisibility}`,
          }}
        >
          <IconMenu id={currentLampId} bulbIdList={bulbIdList} />
        </div>

        <div className="addLamp">
          <Button
            size="large"
            variant="outlined"
            disabled={
              activeMap === "(Select)" || maxBulbIdLength <= markers.length
            }
            onClick={() => addNewLampHandler()}
            style={{
              maxWidth: "300px",
              maxHeight: "300px",
              minWidth: "30px",
              minHeight: "30px",
            }}
          >
            {maxBulbIdLength <= markers.length
              ? "MAX BULBS REACHED"
              : "add new lamp"}
          </Button>
          <Button
            size="large"
            variant="outlined"
            disabled={
              currentLampId === 0
                ? true
                : false ||
                  bulbIdList.length < currentLampId ||
                  maxBulbIdLength <= markers.length
            }
            onClick={() => actionHandler("addLampBeforeActive")}
            style={{
              maxWidth: "300px",
              maxHeight: "300px",
              minWidth: "30px",
              minHeight: "30px",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            {maxBulbIdLength <= markers.length
              ? "MAX BULBS REACHED"
              : " Add before selected Lamp"}
          </Button>
          <Button
            size="large"
            variant="outlined"
            disabled={currentLampId === 0 ? true : false}
            onClick={() => actionHandler("deleteActive")}
            style={{
              maxWidth: "300px",
              maxHeight: "300px",
              minWidth: "30px",
              minHeight: "30px",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            Delete Selected Lamp
          </Button>

          <Button
            size="large"
            variant="outlined"
            disabled={activeMap === "(Select)" || markers.length < 2}
            onClick={() => actionHandler("verticalScan")}
            style={{
              maxWidth: "300px",
              maxHeight: "300px",
              minWidth: "30px",
              minHeight: "30px",
              marginLeft: "20px",
            }}
          >
            Vertical Scan
          </Button>

          <Button
            size="large"
            variant="outlined"
            disabled={activeMap === "(Select)" || markers.length < 2}
            onClick={() => actionHandler("horizontalScan")}
            style={{
              maxWidth: "300px",
              maxHeight: "300px",
              minWidth: "30px",
              minHeight: "30px",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            Horizontal Scan
          </Button>
        </div>
        <div className="mapOps">
          <div
            style={{
              position: "absolute",
            }}
          >
            <QuestionMark story="mapManager" />
          </div>

          <div>Map Manager:</div>

          {/* <TextField value={textValue} onChange={inputText}></TextField> */

//     <TextField
//       id="outlined-helperText"
//       label="New map name:"
//       value={textValue}
//       onChange={inputText}
//     />
//     <Button onClick={() => createNewMap()}>Add new map</Button>
//     <div>
//       <Dropdown
//         label="Event name:"
//         options={filteredEventList}
//         value={activeMap}
//         onChange={dropdownHandleChange}
//       />
//     </div>
//     <Button
//       onClick={deleteMap}
//       disabled={activeMap === "(Select)" ? true : false}
//     >
//       Delete map
//     </Button>
//   </div>
// </div>
// <div className="main">
//   <div className="map">
//     <div>
//       <div>
//         <TextField
//           id="outlined-helperText"
//           label="Search"
//           value={searchInput}
//           onChange={searchText}
//         />
//         <Button onClick={() => searchMap()}>Search</Button>
//       </div>
//       Legenda:{"        "}
//       <img
//         src={
//           "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_black.png"
//         }
//         alt={"none"}
//       />
//       = Turned of.{"     "}
//       <img
//         src={
//           "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_red.png"
//         }
//         alt={"none"}
//       />
//       <img
//         src={
//           "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_green.png"
//         }
//         alt={"none"}
//       />
//       <img
//         src={
//           "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blue.png"
//         }
//         alt={"none"}
//       />
//       <img
//         src={
//           "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_orange.png"
//         }
//         alt={"none"}
//       />
//       <img
//         src={
//           "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_yellow.png"
//         }
//         alt={"none"}
//       />
//       <img
//         src={
//           "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_purple.png"
//         }
//         alt={"none"}
//       />
//       = Color of lamp
//       <img
//         src={
//           "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_white.png"
//         }
//         alt={"none"}
//       />{" "}
//       = Lamp is set to multiColor
//     </div>

//     <GoogleMap />
//   </div>
//   <div className="enhancedTable">
//     <EnhancedTable />
//   </div>
// </div>
// <Popup trigger={buttonPopup} />
