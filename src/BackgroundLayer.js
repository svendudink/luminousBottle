/////////////////////////////////////Sven's//Coding/ Date: 17-10-2022 15:28 ////////////
// i used a seperate view in between App.js and the routes to make the background dynamic
/////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

import {
  Router,
  Route,
  BrowserRouter,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { useState, useEffect, useContext } from "react";
import DrawerAppBar from "./components/DrawerAppBar";
import BasicController from "./views/BasicController";
import CreateMapping from "./views/CreateMapping";
import Home from "./views/Home";
import About from "./views/about";
import { GlobalContext } from "./components/context/GlobalContext";
import { Showroom } from "./views/Showroom";
import { IoContextProvider } from "./components/context/IoConnectContext";

/////////////////////////////////////Sven's//Coding/ Date: 17-10-2022 15:27 ////////////
// Load images for showroom carousel
/////////////////////////////////////////gnidoC//s'nevS////////////////////////////////
import startPagewhitea from "./media/background/IMG_7184.JPG";
import lamp1a from "./media/background/IMG_7185.JPG";
import lamp2a from "./media/background/IMG_7188.JPG";
import lamp2b from "./media/background/IMG_7189.JPG";
import lamp2c from "./media/background/IMG_7190.JPG";
import lamp2d from "./media/background/IMG_7191.JPG";
import lamp3a from "./media/background/IMG_7192.JPG";
import lamp3b from "./media/background/IMG_7193.JPG";
import lamp3c from "./media/background/IMG_7194.JPG";
import lamp3d from "./media/background/IMG_7195.JPG";
import lamp4a from "./media/background/IMG_7187.JPG";
import lamp4b from "./media/background/IMG_7179.JPG";
import otherPages from "./media/background/IMG_7179.JPG";

function BackgroundLayer() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [background, setBackground] = useState(12);

  const { lampBackGround, setLampBackground, activePage } =
    useContext(GlobalContext);

  const preloadSrcList = [
    startPagewhitea,
    lamp1a,
    lamp2a,
    lamp2b,
    lamp2c,
    lamp2d,
    lamp3a,
    lamp3b,
    lamp3c,
    lamp3d,
    lamp4a,
    lamp4b,
    otherPages,
  ];

  const preloadSrcListString = [
    "startPagewhitea",
    "lamp1a",
    "lamp2a",
    "lamp2b",
    "lamp2c",
    "lamp2d",
    "lamp3a",
    "lamp3b",
    "lamp3c",
    "lamp3d",
    "lamp4a",
    "lamp4b",
    "otherPages",
  ];

  useEffect(() => {
    setBackground(preloadSrcListString.indexOf(lampBackGround));
  }, [lampBackGround]);

  /////////////////////////////////////Sven's//Coding/ Date: 17-10-2022 15:30 ////////////
  // Pre loading of background for a smooth image experience when scrolling over
  // background
  /////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

  function preloadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = function () {
        resolve(img);
      };
      img.onerror = img.onabort = function () {
        reject(src);
      };
      img.src = src;
    });
  }

  useEffect(() => {
    let isCancelled = false;

    async function effect() {
      if (isCancelled) {
        return;
      }

      const imagesPromiseList = [];
      for (const i of preloadSrcList) {
        imagesPromiseList.push(preloadImage(i));
      }

      await Promise.all(imagesPromiseList);

      if (isCancelled) {
        return;
      }

      setAssetsLoaded(true);
    }

    effect();

    return () => {
      isCancelled = true;
    };
  }, []);

  if (!assetsLoaded) {
    return <p>Preloading Assets</p>;
  }

  return (
    <BrowserRouter>
      <div
        style={{
          textAlign: "center",
          backgroundImage:
            activePage === "showroom"
              ? "none"
              : activePage !== "home"
              ? ` linear-gradient(
      rgba(255, 255, 255, 0.95),
      rgba(255, 255, 255, 0.8)
    ),
    url(${preloadSrcList[background]})`
              : `url(${preloadSrcList[background]})`,
          backgroundSize: "cover",
          width: "100vw",
          height: "100vh",
          transition: "0.8s ease",
        }}
      >
        <DrawerAppBar />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/Home"} element={<Home />} />

          <Route
            path="/BasicController"
            element={
              <IoContextProvider>
                <BasicController />
              </IoContextProvider>
            }
          />

          <Route path="/CreateMapping" element={<CreateMapping />} />
          <Route path="/About" element={<About />} />
          <Route path="/Showroom" element={<Showroom />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default BackgroundLayer;
