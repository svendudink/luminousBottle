import { useContext, useState } from "react";
import { ioContext } from "./context/IoConnectContext";

const Video = () => {
  const [liveVideo, setLiveVideo] = useState("");

  const { socket } = useContext(ioContext);

  socket.on("image", setLiveVideo);

  return <img alt="" src={`data:image/jpeg;base64,${liveVideo}`} />;
};

export default Video;
