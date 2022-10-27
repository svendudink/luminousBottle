import { createContext, useState, useEffect } from "react";
import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

let socket = io();

export const ioContext = createContext();
export const IoContextProvider = (props) => {
  console.log("isTriggered");
  const [isConnected, setIsConnected] = useState(false);
  const [connect, setConnect] = useState(false);

  useEffect(() => {
    if (!connect) {
      console.log("connect");
      socket = io.connect("http://localhost:8081", {
        allowRequest: (req, callback) => {
          callback(null, req.headers.origin === undefined);
        },
      });
    }
    setConnect(true);
  }, []);

  return (
    <ioContext.Provider
      value={{ socket, isConnected, setIsConnected, connect, setConnect }}
    >
      {props.children}
    </ioContext.Provider>
  );
};
