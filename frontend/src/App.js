import "./App.css";
import getBlockchain from "./ethereum";
import { useEffect, useState } from "react";
import socketClient from "socket.io-client";

function App() {
  const [donation, setDonation] = useState(undefined);
  let socket = socketClient("http://localhost:5000/");

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
