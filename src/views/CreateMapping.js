import GoogleMap from "../components/Map";
import { useReducer, useContext, useEffect } from "react";
import { GlobalContext } from "../components/context/GlobalContext";
import { TextField } from "@mui/material";
import Popup from "../components/Popup";
import EnhancedTable from "../components/EnhancedTable";
import "./CreateMapping.css";
import Button from "@mui/material/Button";
import IconMenu from "../components/IconMenu";
import { useLocation } from "react-router-dom";

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

    textValue,
    setTextValue,

    buttonPopup,
    bulbConfiguratorVisibility,
    setBulbConfiguratorVisibility,
    map,
    setMap,

    setCenterOption,
    setZoom,
    centerOption,
    setActivePage,
  } = useContext(GlobalContext);

  useEffect(() => {
    setActivePage("createMapping");
  });

  useEffect(() => {
    setMap(null);

    if (activeMap !== "(Select)") {
      setCenterOption("firstMarker");
    }
  }, []);

  const [, forceRerender] = useReducer((x) => x + 1, 0);

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

  let firstLoad = (e) => {
    GraphQLHandler(0, center.lat, center.lng, "firstLoad", textValue);
  };
  if (bulbIdList === "") {
    firstLoad();
  }

  const dropdownHandleChange = async (event) => {
    setBulbConfiguratorVisibility("hidden");

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

  let addNewLampHandler = async () => {
    setCenterOption("mapCenter");

    const lat = map.center.lat();
    const lng = map.center.lng();
    const ind = markers.length === 0 ? 1 : markers.length;
    const newId =
      markers.length === 0 ? 1 : Number(markers[markers.length - 1].id) + 1;
    console.log(newId);

    let err = markers.filter((e) => {
      return e.id === ind;
    });

    await GraphQLHandler(newId, lat, lng, "addLamp", activeMap);
    //setCenter({ lat: map.center.lat(), lng: map.center.lng() });

    markers[markers.length] = { id: newId, lat, lng };

    //forceRerender();
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
            disabled={activeMap === "(Select)" ? true : false}
            onClick={() => addNewLampHandler()}
            style={{
              maxWidth: "300px",
              maxHeight: "300px",
              minWidth: "30px",
              minHeight: "30px",
            }}
          >
            add new lamp
          </Button>
        </div>
        <div className="mapOps">
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
