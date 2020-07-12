const typeDefs = `
type TransactionIn {
  txid: String
  vout: Int
  scriptSig: ScriptSig
  coinbase: String
  sequence: String!
  txInWitness: [String!]
}

type ScriptSig {
  asm: String!
  hex: String!
}
`;

const resolvers = {
  TransactionIn: {
    txInWitness: inObj => inObj.txinwitness,
  },
};

export default { typeDefs, resolvers };
