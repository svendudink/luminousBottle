import {
  createContext,
  useState,
  useRef,
  useEffect,
  useReducer,
  memo,
} from "react";
import { useLocation } from "react-router-dom";

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
  // const refBulbIdList = useRef("");
  // const refMarkers = useRef([]);

  const [center, setCenter] = useState({
    lat: 53.831777322304355,
    lng: 13.239378406704096,
  });

  const memoizedComponent = memo(
    GlobalContextProvider,
    (prevProps, nextProps) => {
      console.log(prevProps === nextProps);

      /*
      When using this function you always need to return
      a Boolean. For now we'll say the props are NOT equal
      which means the component should rerender.
    */
      return false;
    }
  );

  const GraphQLHandler = async (
    index,
    lat,
    lng,
    request,
    mapName,
    bulbId,
    extendedOptions
  ) => {
    // console.log("latlngcheckup", lat, lng);
    const graphqlQuery = {
      query: `mutation {MapLamps(SetMap: {bulbNumber: "${index}",lat: "${lat}", lng: "${lng}", request: "${request}", bulbId: "${bulbId}", mapName: "${mapName}"}){bulbIdList mapArray eventList availableBulbIdList }}`,
    };

    await fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(graphqlQuery),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (request === "load") {
          setMarkers(JSON.parse(resData.data.MapLamps.mapArray));
          // refMarkers.current = JSON.parse(resData.data.MapLamps.mapArray);

          setBulbIdList(JSON.parse(resData.data.MapLamps.bulbIdList));
          //refBulbIdList.current = JSON.parse(resData.data.MapLamps.bulbIdList);

          // if (JSON.parse(resData.data.MapLamps.mapArray)[0].lat) {
          //   setEventcoords({
          //     lat: JSON.parse(resData.data.MapLamps.mapArray)[0].lat,
          //     lng: JSON.parse(resData.data.MapLamps.mapArray)[0].lng,
          //   });
          // }

          // forceRerender();
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
          GraphQLHandler(0, 0, 0, "load", activeMap);
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
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
