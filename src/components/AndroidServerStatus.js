import { useContext, useRef, useState, useEffect } from "react";
import { ioContext } from "./context/IoConnectContext";
import "./AndroidServerStatus.css";

const AndroidServerStatus = () => {
  const bottomRef = useRef(null);
  const [eventList, setEventList] = useState([]);

  const { socket, serverStatus, setServerStatus } = useContext(ioContext);

  socket.on("serverStatus", setServerStatus);

  useEffect(() => {
    setEventList((eventList) => [...eventList, serverStatus]);
  }, [serverStatus]);

  console.log(eventList);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [eventList]);

  const renderList = eventList.map((item, index) => (
    <div key={index}>{item}</div>
  ));

  return (
    <div className="textarea">
      {renderList}
      <div ref={bottomRef} />
    </div>
  );
};

export default AndroidServerStatus;
