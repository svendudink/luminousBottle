import { useContext, useRef, useState, useEffect } from "react";
import { ioContext } from "./context/IoConnectContext";
import "./AndroidServerStatus.css";
import QuestionMark from "./QuestionMark";

const AndroidServerStatus = () => {
  const bottomRef = useRef(null);
  const [eventList, setEventList] = useState([]);

  // testing purposes

  // end of testing purposes DELETE
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
    <div>
      <div style={{ paddingRight: "400px" }}>
        <QuestionMark
          size={{ height: "290px", width: "250px" }}
          story="server"
        />
      </div>
      <h1>Server updates</h1>
      <div className="textarea">
        {renderList}
        {/* <div ref={bottomRef} /> */}
      </div>
    </div>
  );
};

export default AndroidServerStatus;
