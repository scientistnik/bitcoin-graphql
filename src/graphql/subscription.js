const typeDefs = `
type Subscription {
  newSec: Int
}`;

const resolvers = {
  Subscription: {
    newSec: console.log,
  },
};

export default { typeDefs, resolvers };
