import { useContext, useState } from "react";
import { useEffect } from "react";
import { GlobalContext } from "../components/context/GlobalContext";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import "./Showroom.css";
import ReactPlayer from "react-player";
import { Button } from "@mui/material";

//Temp images
import IMG_067X from "../media/preproductionpics/IMG_067X.JPG";
import IMG_0677 from "../media/preproductionpics/IMG_0677.JPG";
import IMG_0684 from "../media/preproductionpics/IMG_0684.JPG";
import IMG_0686 from "../media/preproductionpics/IMG_0686.JPG";
import IMG_0687 from "../media/preproductionpics/IMG_0687.JPG";
import IMG_0688 from "../media/preproductionpics/IMG_0688.JPG";
import IMG_0692 from "../media/preproductionpics/IMG_0692.JPG";
import IMG_0693 from "../media/preproductionpics/IMG_0693.JPG";
import IMG_0694 from "../media/preproductionpics/IMG_0694.JPG";
import IMG_0695 from "../media/preproductionpics/IMG_0695.JPG";

export const CarouselRenderer = ({ event }) => {
  let arr = [];
  if (event === "preproductionpics") {
    arr = [
      IMG_067X,
      IMG_0677,
      IMG_0686,
      IMG_0687,
      IMG_0688,
      IMG_0692,
      IMG_0693,
      IMG_0694,
      IMG_0695,
      IMG_0684,
    ];
  }
  return (
    <Carousel
      ariaLabel={"testingblabla"}
      dynamicHeight={true}
      className="carouselspecs"
      showStatus={false}
    >
      {arr.map((e) => (
        <div className="picdiv" key={Math.random()}>
          <img className="images" src={e} alt="none" />
          <p className="legend">Legend 1</p>
        </div>
      ))}
    </Carousel>
  );
};

export const Showroom = () => {
  const { setActivePage } = useContext(GlobalContext);

  const [activeCarousel, setActiveCarousel] = useState("preproductionpics");

  const YoutubeSlide = ({ url, isSelected }) => (
    <ReactPlayer width="100%" url={url} playing={isSelected} />
  );

  const customRenderItem = (item, props) => (
    <item.type {...item.props} {...props} />
  );

  const getVideoThumb = (videoId) =>
    `https://img.youtube.com/vi/${videoId}/default.jpg`;

  const getVideoId = (url) =>
    url.substr("https://www.youtube.com/embed/".length, url.length);

  const customRenderThumb = (children) =>
    children.map((item) => {
      const videoId = getVideoId(item.props.url);
      return <img alt={"none"} src={getVideoThumb(videoId)} />;
    });

  useEffect(() => {
    setActivePage("showroom");
    document.title = "Bottle Luminous: Showroom";
  });
  return (
    <div>
      <div>
        {activeCarousel === "preproductionpics" && (
          <div>
            <CarouselRenderer event={"preproductionpics"} />
          </div>
        )}
        {activeCarousel === "preproductionvideos" && (
          <Carousel
            ariaLabel={"testingblabla"}
            dynamicHeight={true}
            className="carouselspecs"
            showStatus={false}
            renderItem={customRenderItem}
            renderThumbs={customRenderThumb}
          >
            <YoutubeSlide
              key="youtube-1"
              url="https://www.youtube.com/embed/AVn-Yjr7kDc"
            />
            <YoutubeSlide
              key="youtube-2"
              url="https://www.youtube.com/embed/mOdmi9SVeWY"
            />
            <YoutubeSlide
              key="youtube-3"
              url="https://www.youtube.com/embed/n0F6hSpxaFc"
            />
            <YoutubeSlide
              key="youtube-4"
              url="https://www.youtube.com/embed/0uGETVnkujA"
            />
          </Carousel>
        )}
        {activeCarousel === "castlepics" && (
          <Carousel
            ariaLabel={"testingblabla"}
            dynamicHeight={true}
            className="carouselspecs"
            showStatus={false}
          ></Carousel>
        )}
      </div>
      <div>
        <Button onClick={() => setActiveCarousel("preproductionpics")}>
          Production fotos
        </Button>
        <Button onClick={() => setActiveCarousel("preproductionvideos")}>
          Production videos
        </Button>
        <Button onClick={() => setActiveCarousel("castlepics")}>
          Castle Event fotos
        </Button>
        <Button onClick={() => setActiveCarousel("castlevideos")}>
          Castle Event videos
        </Button>
        <Button onClick={() => setActiveCarousel("brandenburgpics")}>
          Brandenburg Burn pictures
        </Button>
        <Button onClick={() => setActiveCarousel("brandenburgvideos")}>
          Brandenburg Burn videos
        </Button>
      </div>
    </div>
  );
};
