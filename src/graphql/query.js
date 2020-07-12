import bitcoin from "../bitcoin.js";
import BlockType from "./block.js";
import TransacionType from "./transaction.js";

const typeDefs = `
type Query {
  info: Info! 
  block(hash: String, height: Int): Block
  transaction(txid: String!, blockhash: String!): Transaction
}
`;

const resolvers = {
  Query: {
    info: async () => bitcoin.getBlockchainInfo(),
    block: async (root, { hash, height }) => {
      if (hash == undefined)
        if (height == undefined) hash = await bitcoin.getBestBlockHash();
        else hash = await bitcoin.getBlockHash(height);

      return BlockType.fetch(hash);
    },
    transaction: (root, { txid, blockhash }) =>
      TransacionType.fetch(txid, blockhash),
  },
};

export default { typeDefs, resolvers };
