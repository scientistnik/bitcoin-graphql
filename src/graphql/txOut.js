const typeDefs = `
type TransactionOut {
  value: Float!
  n: Int!
  scriptPubKey: ScriptPubKey
}

type ScriptPubKey {
  asm: String!
  hex: String!
  reqSigs: Int
  type: String!
  addresses: [String!]
}
`;

const resolvers = {
  TransactionOut: {},
};

export default { typeDefs, resolvers };
