import { useContext, useState } from "react";
import { ioContext } from "./context/IoConnectContext";
import testImage from "../media/splash.jpg";

const testImg = false;

const Video = () => {
  const [liveVideo, setLiveVideo] = useState("");

  const { socket } = useContext(ioContext);

  socket.on("image", setLiveVideo);

  return liveVideo === "" && testImg === false ? (
    <div></div>
  ) : (
    <img
      style={{ width: "40%", height: "40%" }}
      src={testImg ? testImage : `data:image/jpeg;base64,${liveVideo}`}
      alt={""}
    />
  );
};

export default Video;
