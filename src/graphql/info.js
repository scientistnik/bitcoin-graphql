import BlockType from "./block.js";

const typeDefs = `
type Info {
  chain: String!
  blocks: Int!
  headers: Int!
  bestBlock: Block!
  difficulty: String!
  mediantime: Int!
  verificationProgress: String!
  initialBlockDownload: Boolean!
  chainWork: String!
  sizeOnDisk: Int!
  pruned: Boolean!
  pruneHeight: Int!
  automaticPruning: Boolean!
  pruneTargetSize: Int!
  sorftForks: String!
  warnings: String! 
}
`;

const resolvers = {
  Info: {
    bestBlock: async info => BlockType.fetch(info.bestblockhash),
    verificationProgress: info => info.verificationprogress,
    initialBlockDownload: info => info.initialblockdownload,
    chainWork: info => info.chainwork,
    sizeOnDisk: info => info.size_on_disk,
    pruneHeight: info => info.pruneheight,
    automaticPruning: info => info.automatic_pruning,
    pruneTargetSize: info => info.prune_target_size,
    sorftForks: info => JSON.stringify(info.softforks),
  },
};

export default { typeDefs, resolvers };
