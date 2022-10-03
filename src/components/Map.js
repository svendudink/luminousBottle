import React, { useReducer, useContext } from "react";
import "./styles.css";
import { Wrapper } from "@googlemaps/react-wrapper";

import IconMenu from "./IconMenu";
import { TextField } from "@mui/material";
import { GlobalContext } from "./context/GlobalContext";
import Popup from "./Popup";
import EnhancedTable from "./EnhancedTable";

// const markers = [
//   { lat: -25.363, lng: 131.044 },
//   { lat: -15.363, lng: 122.044 },
// ];

const Map = ({ onClick, onIdle, children, style, ...options }) => {
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
    map,
    setMap,
    zoom,
    setZoom,
  } = useContext(GlobalContext);

  let firstLoad = (e) => {
    GraphQLHandler(0, center.lat, center.lng, "firstLoad", textValue);
  };
  if (bulbIdList === "") {
    firstLoad();
  }

  const ref = React.useRef(null);

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  React.useEffect(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  React.useEffect(() => {
    if (map) {
      map.addListener("dragend", () => {
        //setCenter({ lat: map.center.lat(), lng: map.center.lng() });
        setZoom(map.zoom);
      });
    }
  }, [map]);

  React.useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        window.google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} />

      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker = (options) => {
  const {
    tempMarkers,
    setTempMarkers,
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
    zoom,
    setZoom,
    map,
    centerOption,
    setCenterOption,
  } = useContext(GlobalContext);

  const [marker, setMarker] = React.useState();
  const contentRef = React.useRef(null);

  React.useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
      setCenterOption("firstMarker");

      marker.addListener("dragend", (e, t, b) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        const id = marker.lampId;
        const bulbId = markers[marker.index].bulbId;
        markers[marker.index] = { id, lat, lng, bulbId };

        setMarkers(markers);
        GraphQLHandler(id, lat, lng, "update", activeMap);
      });
    }
  }, [marker, options]);

  React.useEffect(() => {
    if (marker) {
      marker.addListener("click", (e, t, b) => {
        setBulbConfiguratorVisibility("visible");
        setCurrentLampId(marker.lampId);
        setZoom(map.zoom);
        console.log(currentLampId);

        setCenter({ lat: marker.position.lat(), lng: marker.position.lng() });
        let temp = markers.filter((filterMarker) => {
          return filterMarker.id === marker.lampId;
        });
        setCurrentBulbId(temp[0].bulbId);
        setValue(temp[0].bulbId);
      });
    }
  }, [marker]);

  React.useEffect(() => {
    if (markers && centerOption === "firstMarker") {
      setCenter({ lat: Number(markers[0].lat), lng: Number(markers[0].lng) });
    }
  }, [markers]);

  return null;
};

export default function GoogleMap() {
  const {
    markers,
    setMarkers,
    GraphQLHandler,
    activeMap,
    center,
    map,
    zoom,
    setZoom,
    setCenter,
    currentLampId,
    bulbIdList,
    marker,
    setMarker,
    centerOption,
  } = useContext(GlobalContext);

  const mapStyles = {
    width: "100%",
    height: "100%",
  };

  return (
    <div style={{ display: "flex", height: "50vh", width: "50vw" }}>
      <Wrapper apiKey={"AIzaSyD2ZcdhauruGPbtzIEqEMPWERuq9x8FVxA"}>
        <Map
          center={{
            lat: centerOption === "mapCenter" ? map.center.lat() : center.lat,
            lng: centerOption === "mapCenter" ? map.center.lng() : center.lng,
          }}
          zoom={zoom}
          style={mapStyles}
          mapTypeId={"satellite"}
        >
          {markers.map((marker, val) => {
            return (
              <Marker
                draggable={true}
                key={marker.id}
                position={{ lat: Number(marker.lat), lng: Number(marker.lng) }}
                index={val}
                lampId={marker.id}
                bulbId={marker.bulbId}
                icon={{
                  url: `https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_red${
                    marker.id ? marker.id : 1
                  }.png`,
                }}
              />
            );
          })}
        </Map>
      </Wrapper>
    </div>
  );
}
