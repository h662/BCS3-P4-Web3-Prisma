import Web3, { Personal } from "web3";

export const web3 = new Web3(typeof window !== "undefined" && window.ethereum);
export const personal = new Personal(
  typeof window !== "undefined" && window.ethereum
);
