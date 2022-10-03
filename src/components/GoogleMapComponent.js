/////////////////////////////////////////Sven's//Coding////////////////////////////////
// 1.Initial parameters and first load
// 2.input Handlers
// 3.Maps Drag handlers
/////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

import React, { useReducer, useContext } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import IconMenu from "./IconMenu";
import { TextField } from "@mui/material";
import { GlobalContext } from "./context/GlobalContext";

import Popup from "./Popup";

const GoogleMapComponent = (props) => {
  const {
    bulbIdList,
    eventcoords,
    setEventcoords,
    activeMap,
    setActiveMap,
    filteredEventList,
    setFilteredEventList,
    center,
    setCenter,
    markers,
    setMarkers,
    GraphQLHandler,
    currentLampId,
    setCurrentLampId,
    textValue,
    setTextValue,
    setCurrentBulbId,
    setValue,
    buttonPopup,
    bulbConfiguratorVisibility,
    setBulbConfiguratorVisibility,
  } = useContext(GlobalContext);

  const [, forceRerender] = useReducer((x) => x + 1, 0);

  /////////////////////////////////////////Sven's//Coding////////////////////////////////
  // 1.Initial parameters and first load
  /////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

  const mapStyles = {
    width: "70%",
    height: "100%",
    flexGrow: "1",
  };

  let firstLoad = (e) => {
    GraphQLHandler(0, center.lat, center.lng, "firstLoad", textValue);
  };
  if (bulbIdList === "") {
    firstLoad();
  }

  /////////////////////////////////////////Sven's//Coding////////////////////////////////
  // 2.input Handlers
  /////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

  let addNewLampHandler = () => {
    const lat = center.lat;
    const lng = center.lng;
    const ind = markers.length === 0 ? 1 : markers.length;
    const newId =
      markers.length === 0 ? 1 : Number(markers[markers.length - 1].id) + 1;

    let err = markers.filter((e) => {
      return e.id === ind;
    });

    GraphQLHandler(newId, lat, lng, "addLamp", activeMap);
    markers[markers.length] = { id: newId, lat, lng };
    setMarkers(markers);
  };

  let createNewMap = (e) => {
    GraphQLHandler(0, center.lat, center.lng, "newMap", textValue);

    forceRerender();
  };

  let openMenu = (e) => {
    setCurrentLampId(e);
    let temp = markers.filter((marker) => {
      return marker.id === e;
    });
    setCurrentBulbId(temp[0].bulbId);
    setValue(temp[0].bulbId);
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

  const Dropdown = ({ label, value, options, onChange }) => {
    return (
      <label>
        {label}
        <select value={activeMap} onChange={onChange}>
          <option value={"Select"}>{"(Select)"}</option>
          {options.map((option) => (
            <option value={option.name}>{option.name}</option>
          ))}
        </select>
      </label>
    );
  };

  const dropdownHandleChange = (event) => {
    setMarkers([]);

    if (event.target.value === "Select") {
      setActiveMap("(Select)");
      setBulbConfiguratorVisibility("hidden");
    } else {
      setActiveMap(event.target.value);
      setBulbConfiguratorVisibility("visible");

      GraphQLHandler(0, 0, 0, "load", event.target.value);
    }
  };

  let inputText = (input) => {
    setTextValue(input.target.value);
  };

  let clickstat = (e, map, coord) => {
    setCenter({ lat: map.center.lat(), lng: map.center.lng() });

    setEventcoords({ lat: map.center.lat(), lng: map.center.lng() });
  };

  /////////////////////////////////////////Sven's//Coding////////////////////////////////
  // 3.Marker Drag handler
  /////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

  let onMarkerDragEnd = (coord, index, markers, lampId, map, t) => {
    const { latLng } = coord;
    const lat = latLng.lat().toString();
    const lng = latLng.lng().toString();
    const id = lampId.toString();
    const bulbId = markers[index].bulbId;
    markers[index] = { id, lat, lng, bulbId };

    setMarkers(markers);
    GraphQLHandler(id, lat, lng, "update", activeMap);
  };

  let myMarkers =
    markers &&
    Object.entries(markers).map(([key, val, ind]) => (
      <Marker
        key={key}
        icon={{
          url: `https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_red${
            val.id ? val.id : 1
          }.png`,
        }}
        id={key}
        position={{
          lat: val.lat,
          lng: val.lng,
        }}
        onClick={() => openMenu(val.id ? val.id : 1)}
        draggable={true}
        location={"supersecret"}
        onDragend={(t, map, coord) =>
          onMarkerDragEnd(coord, key, markers, val.id, t, map)
        }
      />
    ));

  return (
    <>
      <div>
        {markers && <div></div>}
        <div className="row d-flex justify-content-center text-center">
          <h1>
            <button
              disabled={activeMap === "(Select)" ? true : false}
              onClick={() => addNewLampHandler()}
            >
              add new lamp
            </button>

            {
              <div>
                <Dropdown
                  label="Event name:"
                  options={filteredEventList}
                  value={activeMap}
                  onChange={dropdownHandleChange}
                />
              </div>
            }

            <button
              onClick={deleteMap}
              disabled={activeMap === "(Select)" ? true : false}
            >
              Delete map
            </button>

            <div>new map name:</div>
            <TextField value={textValue} onChange={inputText}></TextField>
            <button onClick={() => createNewMap()}>Add new map</button>
          </h1>
          <Map
            onDragend={(e, map, coord) => clickstat(e, map, coord)}
            google={props.google}
            zoom={18}
            onClick={clickstat}
            style={mapStyles}
            center={{
              lat: eventcoords.lat,
              lng: eventcoords.lng,
            }}
            initialCenter={{
              lat: center.lat,
              lng: center.lng,
            }}
          >
            {myMarkers}

            <div
              style={{
                position: "absolute",
                left: `${10}px`,
                top: `${60}px`,
                visibility: `${bulbConfiguratorVisibility}`,
              }}
            >
              <IconMenu id={currentLampId} bulbIdList={bulbIdList} />
            </div>
            <div>
              <Popup trigger={buttonPopup} />
            </div>
          </Map>
        </div>
      </div>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.GMAPS,
})(GoogleMapComponent);
