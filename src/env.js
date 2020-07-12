import dotenv from "dotenv";

dotenv.config();

const {
  BITCOIN_USERNAME,
  BITCOIN_PASSWORD,
  BITCOIN_NETWORK,
  BITCOIN_PORT,
} = process.env;

export { BITCOIN_USERNAME, BITCOIN_PASSWORD, BITCOIN_NETWORK, BITCOIN_PORT };
