import "./App.css";
import getBlockchain from "./ethereum";
import { useEffect, useState } from "react";

function App() {
  const [donation, setDonation] = useState(undefined);

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
