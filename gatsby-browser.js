import "./src/styles/global.css";
import wrapRootElement from "./wrap-root-element";
import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:8888/.netlify/functions/bookmarks",
  }),
  cache: new InMemoryCache(),
});

const _wrapRootElement = ({ element }) => {
  return (
    <ApolloProvider client={client}>
      {wrapRootElement({ element })}
    </ApolloProvider>
  );
};
export { _wrapRootElement as wrapRootElement };
