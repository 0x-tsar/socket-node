import "./App.css";
import getBlockchain from "./ethereum";
import { useEffect, useState } from "react";

// import socketClient from "socket.io-client";
import { io } from "socket.io-client";

function App() {
  const [donation, setDonation] = useState(undefined);
  const [event, setEvents] = useState([]);

  // let socket = socketClient("http://localhost:5000/");
  const socket = io("http://localhost:5000/");

  socket.on("connect", function () {
    socket.emit("join", "room_one");
    // socket.emit('room_message',{hello:'hello'});
  });
  // const socket = io("http://localhost:5000/");

  socket.on("new_event", (data) => {
    console.log(data);
  });

  useEffect(() => {
    const done = async () => {
      const { donations } = await getBlockchain();
      setDonation(donations);
      // const balance = await nft.balanceOf(
      //   nft.provider.provider.selectedAddress
      // );
    };
    done();
  }, []);

  return <div className="App">Hello world</div>;
}

export default App;
