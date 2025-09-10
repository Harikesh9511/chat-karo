import { useState } from "react";
import { createContext } from "react";
import { useAuthContext } from "./AuthContext";
import { useEffect } from "react";
import io from "socket.io-client";
import { useContext } from "react";

 const SocketContext = createContext();

 export const useSocketContext = () => {
  //this export for using anywhere in app
  return useContext(SocketContext);
 }

export const SocketContextProvider = ({ children }) => {
  //this export for main.jsx
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();
  // these things we can use anywhere

  useEffect(() => {
    if (authUser) {
      const socket = io("https://chat-karo-kvl0.onrender.com", {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
