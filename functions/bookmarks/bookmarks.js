const { ApolloServer, gql } = require("apollo-server-lambda");

const typeDefs = gql`
  type Query {
    bookmarks: [Bookmark]!
  }
  type Bookmark {
    id: ID!
    desc: String!
    url: String!
  }
  type Mutation {
    addBookmark(desc: String!, url: String!): Bookmark
  }
`;

const bookmarks = {};
let bookmarkIndex = 0;
const resolvers = {
  Query: {
    bookmarks: () => {
      return Object.values(bookmarks);
    },
  },
  Mutation: {
    addBookmark: (_, { desc, url }) => {
      bookmarkIndex++;
      const id = `key-${bookmarkIndex}`;
      bookmarks[id] = { id, desc, url };
      return bookmarks[id];
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
});

exports.handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});
