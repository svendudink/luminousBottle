import { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
let socket = io();

export const ioContext = createContext();
export const IoContextProvider = (props) => {
  console.log("isTriggered");
  const [isConnected, setIsConnected] = useState(false);
  const [connect, setConnect] = useState(false);
  const [serverStatus, setServerStatus] = useState("");

  useEffect(() => {
    if (!connect) {
      console.log("connect");
      console.log(socket.connected);
      setConnect(true);

      socket = io.connect("http://79.215.208.36:8081", {
        allowRequest: (req, callback) => {
          callback(null, req.headers.origin === undefined);
        },
      });
      console.log(socket.connected);
    }
  }, []);

  return (
    <ioContext.Provider
      value={{
        socket,
        isConnected,
        setIsConnected,
        connect,
        setConnect,
        serverStatus,
        setServerStatus,
      }}
    >
      {props.children}
    </ioContext.Provider>
  );
};
