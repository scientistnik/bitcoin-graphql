import bitcoin from "../bitcoin.js";

const typeDefs = `
type Transaction {
  id: String!
  hash: String!
  inChain: Boolean!
  version: Int!
  size: Int!
  vsize: Int!
  weight: Int!
  locktime: Int!
  vin: [TransactionIn!]
  vout: [TransactionOut!]
  hex: String!
  blockhash: String!
  confirmations: Int!
  blocktime: Int!
  time: Int!
}
`;

const resolvers = {
  Transaction: {
    id: tx => tx.txid,
    inChain: tx => tx.in_active_chain,
  },
};

const fetch = (txid, blockhash) =>
  bitcoin.getRawTransaction(txid, true, blockhash);

export default { typeDefs, resolvers, fetch };
