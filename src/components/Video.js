import { useContext, useState, useEffect } from "react";
import { ioContext } from "./context/IoConnectContext";
import testImage from "../media/splash.jpg";

const testImg = false;

const Video = () => {
  const [liveVideo, setLiveVideo] = useState("");

  const { socket } = useContext(ioContext);

  socket.on("image", setLiveVideo);

  const [pic, setPic] = useState("");

  socket.on("infoExtractTest", setPic);

  useEffect(() => {
    console.log("test");
    console.log(pic);
    if (pic) {
      console.log(JSON.parse(pic).image_results[0].image);
    }
  }, [pic]);

  return liveVideo === "" && testImg === false ? (
    <div></div>
  ) : (
    <img
      // style={{ width: "100%", height: "100%" }}
      src={testImg ? testImage : `data:image/jpeg;base64,${liveVideo}`}
      alt={""}
    />
  );
};

export default Video;
