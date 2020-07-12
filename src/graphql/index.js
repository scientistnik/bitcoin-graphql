import GraphQLTools from "graphql-tools";
import QueryType from "./query.js";
import BlockType from "./block.js";
import TransactionType from "./transaction.js";
import TxInType from "./txIn.js";
import TxOutType from "./txOut.js";
import InfoType from "./info.js";

import SubscriptionType from "./subscription.js";

const makeExecutableSchema = array => {
  const typeDefs = [];
  const resolvers = [];

  array.forEach(type => {
    typeDefs.push(type.typeDefs);
    resolvers.push(type.resolvers);
  });

  return GraphQLTools.makeExecutableSchema({
    typeDefs,
    resolvers,
  });
};

export default makeExecutableSchema([
  QueryType,
  BlockType,
  TransactionType,
  TxInType,
  TxOutType,
  InfoType,
  SubscriptionType,
]);
