import bitcoin from "../bitcoin.js";
import TransactionType from "./transaction.js";
import graphql from "graphql";

const { GraphQLError } = graphql;

const typeDefs = `
type Block {
  hash: String!
  confirmations: Int
  size(stripped: Boolean! = false): Int!
  weight: Int!
  height: Int!
  version(hex: Boolean! = false): Int!
  merkleroot: String!
  transactions(first: Int, after: String): TransactionsConnection!
  time(median: Boolean! = false): String!
  nonce: Int!
  bits: String!
  difficulty: String!
  chainwork: String!
  previous: Block
  next: Block
}

type TransactionsConnection {
  count: Int!
  edges: [TransactionEdge!]
  pageInfo: PageInfo!
}

type PageInfo {
  endCursor: String
  hasNextCursor: Boolean!
}

type TransactionEdge {
  cursor: String!
  node: Transaction!
}
`;

const resolvers = {
  Block: {
    size: (block, { stripped }) => (stripped ? block.strippedsize : block.size),
    version: (block, { hex }) => (hex ? block.versionHex : block.version),
    time: (block, { median }) => (median ? block.mediantime : block.time),
    transactions: (block, { first, after }) => {
      if (after != undefined && !block.tx.includes(after))
        throw new GraphQLError("Not found after cursor");

      const firstIndex =
        after == undefined ? 0 : block.tx.findIndex(elem => elem == after) + 1;
      const lastIndex =
        first == undefined || first <= 0 ? block.nTx : first + firstIndex;

      const edges = block.tx
        .slice(firstIndex, lastIndex)
        .map(id => ({ cursor: id, block }));

      const pageInfo = {
        endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
        hasNextCursor: block.nTx > lastIndex + 1,
      };

      return { count: block.nTx, edges, pageInfo };
    },
    previous: block => fetch(block.previousblockhash),
    next: block => fetch(block.nextblockhash),
  },
  TransactionEdge: {
    node: ({ cursor, block }) => TransactionType.fetch(cursor, block.hash),
  },
};

const fetch = hash => {
  return bitcoin
    .getBlock(hash, 1)
    .catch(
      error =>
        (error.message.includes("Block not found") && null) ||
        new Error(error.message)
    );
};

export default { typeDefs, resolvers, fetch };
