import {
  BITCOIN_USERNAME,
  BITCOIN_PASSWORD,
  BITCOIN_NETWORK,
  BITCOIN_PORT,
} from "./env.js";
import Client from "bitcoin-core";

const client = new Client({
  network: BITCOIN_NETWORK || "mainnet",
  username: BITCOIN_USERNAME,
  password: BITCOIN_PASSWORD,
  port: BITCOIN_PORT || 8332,
});

export default client;
