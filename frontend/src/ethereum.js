import { Contract, ethers } from "ethers";
import Donations from "./contracts/Donations.json";

const getBlockchain = () =>
  new Promise((resolve, reject) => {
    window.addEventListener("load", async () => {
      if (window.ethereum) {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const donations = new Contract(
          Donations.networks[window.ethereum.networkVersion].address,
          Donations.abi,
          signer
        );
        resolve({ donations });
      }
      resolve({ donations: undefined });
    });
  });

export default getBlockchain;
