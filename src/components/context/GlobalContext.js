import { createContext, useState } from "react";

export const GlobalContext = createContext();
export const GlobalContextProvider = (props) => {
  const [tempMarkers, setTempMarkers] = useState([]);
  const [bulbIdList, setBulbIdList] = useState("");
  const [activeMap, setActiveMap] = useState("(Select)");
  const [eventList, setEventList] = useState("");
  const [eventcoords, setEventcoords] = useState("");
  const [markers, setMarkers] = useState([]);
  const [currentLampId, setCurrentLampId] = useState("");
  const [activePage, setActivePage] = useState("home");
  const [textValue, setTextValue] = useState("");
  const [assignedBulbIds, setAssignedBulbIds] = useState([]);
  const [currentBulbId, setCurrentBulbId] = useState("not assigned");
  const [value, setValue] = useState("No ID");
  const [buttonPopup, setButtonPopup] = useState(false);
  const [qrData, setQrData] = useState("No result");
  const [bulbConfiguratorVisibility, setBulbConfiguratorVisibility] =
    useState("hidden");
  const [map, setMap] = useState();
  const [zoom, setZoom] = useState(17);
  const [centerOption, setCenterOption] = useState();
  const [currentBrightness, setCurrentBrightness] = useState(100);
  const [pageLocation, setPageLocation] = useState("home");
  const [selected, setSelected] = useState([]);
  const [infoVisibility, setInfoVisibility] = useState("hidden");
  const [lampBackGround, setLampBackground] = useState("startPagewhitea");
  const [filteredEventList, setFilteredEventList] = useState([
    {
      schema: "main",
      name: "Empty",
      type: "table",
      ncol: 4,
      wr: 0,
    },
  ]);
  const [center, setCenter] = useState({
    lat: 53.831777322304355,
    lng: 13.239378406704096,
  });
  console.log("blabe");
  const GraphQLHandler = async (
    index,
    lat,
    lng,
    request,
    mapName,
    bulbId,
    brightness,
    extended
  ) => {
    const graphqlQuery = {
      query: `mutation {MapLamps(SetMap: {bulbNumber: "${index}",lat: "${lat}", lng: "${lng}", request: "${request}", bulbId: "${bulbId}", mapName: "${mapName}", brightness: "${brightness}", extended: "${extended}"}){bulbIdList mapArray eventList availableBulbIdList }}`,
    };

    await fetch("http://bottle.hopto.org:8080/graphql", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(graphqlQuery),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (
          request === "verticalScan" ||
          request === "horizontalScan" ||
          request === "deleteActive" ||
          request === "addLampBeforeActive" ||
          request === "brightness"
        ) {
          setMarkers(JSON.parse(resData.data.MapLamps.mapArray));
          console.log(JSON.parse(resData.data.MapLamps.mapArray));
          setBulbIdList(JSON.parse(resData.data.MapLamps.bulbIdList));
        }
        if (request === "load") {
          setMarkers(JSON.parse(resData.data.MapLamps.mapArray));

          setBulbIdList(JSON.parse(resData.data.MapLamps.bulbIdList));
        } else if (request === "firstLoad") {
          setEventList(JSON.parse(resData.data.MapLamps.eventList));

          setFilteredEventList(
            JSON.parse(resData.data.MapLamps.eventList).filter(function (e) {
              e.name = e.name.replaceAll("UNIS20", " ");
              return (
                e.name !== "sqlite_schema" && e.name !== "sqlite_temp_schema"
              );
            })
          );

          setBulbIdList(JSON.parse(resData.data.MapLamps.bulbIdList));
        } else if (request === "newMap") {
          GraphQLHandler(0, center.lat, center.lng, "firstLoad", textValue);
        } else if (request === "updateBulbId" || request === "addLamp") {
          GraphQLHandler(0, 0, 0, "load", activeMap, [
            { comesfrom: "addLamp" },
          ]);
        }
      })
      .then(() => {})
      .catch((error) => console.log(error));
  };

  return (
    <GlobalContext.Provider
      value={{
        bulbIdList,
        setBulbIdList,
        setEventList,
        filteredEventList,
        setFilteredEventList,
        activeMap,
        setActiveMap,
        eventcoords,
        setEventcoords,
        center,
        setCenter,
        markers,
        setMarkers,
        GraphQLHandler,
        currentLampId,
        setCurrentLampId,
        textValue,
        setTextValue,
        assignedBulbIds,
        setAssignedBulbIds,
        currentBulbId,
        setCurrentBulbId,
        value,
        setValue,
        buttonPopup,
        setButtonPopup,
        qrData,
        setQrData,
        bulbConfiguratorVisibility,
        setBulbConfiguratorVisibility,
        map,
        setMap,
        zoom,
        setZoom,
        tempMarkers,
        setTempMarkers,
        centerOption,
        setCenterOption,
        pageLocation,
        setPageLocation,
        selected,
        setSelected,
        infoVisibility,
        setInfoVisibility,
        lampBackGround,
        setLampBackground,
        activePage,
        setActivePage,
        currentBrightness,
        setCurrentBrightness,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
