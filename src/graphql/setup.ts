import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { GRAPHQL_URL } from "../config";

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([httpLink]),
});
