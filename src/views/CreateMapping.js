import GoogleMap from "../components/Map";
import { useReducer, useContext, useEffect } from "react";
import { GlobalContext } from "../components/context/GlobalContext";
import { TextField } from "@mui/material";
import Popup from "../components/Popup";
import EnhancedTable from "../components/EnhancedTable";
import "./CreateMapping.css";
import Button from "@mui/material/Button";
import IconMenu from "../components/IconMenu";
import QuestionMark from "../components/QuestionMark";
import { Image } from "react-bootstrap";

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
  } = useContext(GlobalContext);

  /////////////////////////////////////Sven's//Coding/ Date: 17-10-2022 15:40 ////////////
  // Initial loading of values
  /////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

  useEffect(() => {
    setActivePage("createMapping");
    document.title = "Bottle Luminous: Create event map";
  });

  useEffect(() => {
    setMap(null);

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
    setMarkers([]);
    GraphQLHandler("id", "lat", "lng", "delete", activeMap);
    let temp;
    temp = filteredEventList.filter((e) => {
      return e.name !== activeMap;
    });
    setFilteredEventList(temp);
    setActiveMap("(Select)");
  };

  return (
    <div className="main">
      <Toolbar />
      <div className="headgrid">
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

          {/* <TextField value={textValue} onChange={inputText}></TextField> */}
          <TextField
            id="outlined-helperText"
            label="New map name:"
            value={textValue}
            onChange={inputText}
          />
          <Button onClick={() => createNewMap()}>Add new map</Button>
          <div>
            <Dropdown
              label="Event name:"
              options={filteredEventList}
              value={activeMap}
              onChange={dropdownHandleChange}
            />
          </div>
          <Button
            onClick={deleteMap}
            disabled={activeMap === "(Select)" ? true : false}
          >
            Delete map
          </Button>
        </div>
      </div>
      <div className="main">
        <div className="map">
          <div>
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
          <GoogleMap />
        </div>
        <div className="enhancedTable">
          <EnhancedTable />
        </div>
      </div>
      <Popup trigger={buttonPopup} />
    </div>
  );
};

export default CreateMapping;
