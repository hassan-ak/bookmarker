const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require("faunadb");
const q = faunadb.query;

var client = new faunadb.Client({
  secret: "fnAEEeq056ACCO8uF_3EOptroiusZoilTCYG1VDq",
});

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

const resolvers = {
  Mutation: {
    addBookmark: async (_, { desc, url }, { user }) => {
      if (!user) {
        throw new Error("Must be authenticated to insert todos");
      }
      const results = await client.query(
        q.Create(q.Collection("bookmarks"), {
          data: {
            desc,
            url,
            owner: user,
          },
        })
      );
      return {
        ...results.data,
        id: results.ref.id,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ context }) => {
    if (context.clientContext.user) {
      return { user: context.clientContext.user.sub };
    } else {
      return {};
    }
  },
  playground: true,
  introspection: true,
});

exports.handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});
