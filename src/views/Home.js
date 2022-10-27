import { GlobalContext } from "../components/context/GlobalContext";
import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Home.css";

import TextBubble from "../components/TextBubble";

// Load images
import Image1 from "../media/background/IMG_7184.JPG";
import Image2 from "../media/background/IMG_7185.JPG";
import Image3 from "../media/background/IMG_7188.JPG";
import Image4 from "../media/background/IMG_7189.JPG";
import Image5 from "../media/background/IMG_7190.JPG";
import Image6 from "../media/background/IMG_7191.JPG";
import Image7 from "../media/background/IMG_7192.JPG";
import Image8 from "../media/background/IMG_7193.JPG";
import Image9 from "../media/background/IMG_7194.JPG";
import Image10 from "../media/background/IMG_7195.JPG";
import Image11 from "../media/background/IMG_7187.JPG";
import Image12 from "../media/background/IMG_7179.JPG";

const Home = () => {
  const preloadSrcList = [
    Image1,
    Image2,
    Image3,
    Image4,
    Image5,
    Image6,
    Image7,
    Image8,
    Image9,
    Image10,
    Image11,
    Image12,
  ];

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

  const {
    infoVisibility,
    setInfoVisibility,
    setLampBackground,
    setActivePage,
  } = useContext(GlobalContext);

  const [text, setText] = useState("butter");
  const [coord, setCoords] = useState({ x: "0", y: "0" });
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  /////////////////////////////////////Sven's//Coding/ Date: 17-10-2022 16:11 ////////////
  // initial loading of values and background
  /////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

  useEffect(() => {
    setActivePage("home");
    document.title = "Bottle Luminous: Home";
  }, []);

  useEffect(() => {
    const arr = [
      { lamp: "lamp1", images: "1" },
      { lamp: "lamp2", images: "4" },
      { lamp: "lamp3", images: "4" },
      { lamp: "lamp4", images: "2" },
    ];
    setTimeout(() => {
      backGround(arr[0].lamp, arr[0].images, "none");
    }, 500);
    setTimeout(() => {
      backGround(arr[1].lamp, arr[1].images, "none");
    }, 1400);
    setTimeout(() => {
      backGround(arr[2].lamp, arr[2].images, "none");
    }, 2300);
    setTimeout(() => {
      backGround(arr[3].lamp, arr[3].images, "none");
    }, 3200);
  }, []);

  /////////////////////////////////////Sven's//Coding/ Date: 17-10-2022 16:12 ////////////
  // deal with background changes when scrolling over background
  /////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

  const backGround = (name, images, e) => {
    infoWindowHandler(name, images, e);
    let number = Math.floor(Math.random() * images);
    let finalString = "";
    const arr = ["a", "b", "c", "d", "e", "f"];
    finalString = name.concat(arr[number]);
    setLampBackground(finalString);
  };

  const infoWindowHandler = (name, images, e) => {
    if (name === "startPagewhite") {
      setInfoVisibility("hidden");
    } else if (e !== "none") {
      setInfoVisibility("visible");

      let temp = e.target.attributes.cy.nodeValue.slice(0, -1);
      temp = Number(temp) - 12;

      setCoords({
        x: e.target.attributes.cx.nodeValue,
        y: temp + "%",
      });
      setText(name);
    }
  };

  /////////////////////////////////////Sven's//Coding/ Date: 17-10-2022 16:13 ////////////
  // Preloading of images
  /////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

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
    <div>
      <div></div>
      <svg height={window.innerHeight - 116} width={window.innerWidth}>
        <circle
          onMouseEnter={(e) => backGround("lamp1", 1, e)}
          onMouseLeave={(e) => backGround("startPagewhite", 1, e)}
          cx="50%"
          cy="21%"
          r={"100"}
          stroke="black"
          strokeWidth="0"
          fill="black"
          fillOpacity="0"
          opacity={10}
        />
        <circle
          onMouseEnter={(e) => backGround("lamp2", 4, e)}
          onMouseLeave={(e) => backGround("startPagewhite", 1, e)}
          cx="38%"
          cy="90%"
          r="7%"
          stroke="black"
          strokeWidth="0"
          fill="black"
          fillOpacity="0"
          opacity={10}
        />

        <circle
          onMouseEnter={(e) => backGround("lamp3", 4, e)}
          onMouseLeave={(e) => backGround("startPagewhite", 1, e)}
          cx="27%"
          cy="50%"
          r="7%"
          stroke="black"
          strokeWidth="0"
          fill="black"
          fillOpacity="0"
          opacity={10}
        />
        <circle
          onMouseEnter={(e) => backGround("lamp4", 2, e)}
          onMouseLeave={(e) => backGround("startPagewhite", 1, e)}
          cx="75%"
          cy="65%"
          r="9%"
          stroke="black"
          strokeWidth="0"
          fill="black"
          fillOpacity="0"
          opacity={10}
        />
        <circle
          onMouseEnter={(e) => infoWindowHandler("QR", 2, e)}
          onMouseLeave={(e) => infoWindowHandler("startPagewhite", 1, e)}
          cx="56%"
          cy="58%"
          r="5%"
          stroke="#1A2036"
          strokeWidth="3"
          fill="black"
          fillOpacity="0"
          opacity={10}
        />
        <circle
          onMouseEnter={(e) => infoWindowHandler("mesh", 2, e)}
          onMouseLeave={(e) => infoWindowHandler("startPagewhite", 1, e)}
          cx="46%"
          cy="79%"
          r="5%"
          stroke="#1A2036"
          strokeWidth="2"
          fill="black"
          fillOpacity="0"
          opacity={10}
        />
      </svg>
      <TextBubble visibility={infoVisibility} story={text} coords={coord} />
    </div>
  );
};

export default Home;
