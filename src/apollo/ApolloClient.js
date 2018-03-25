// Apollo client - this is the centre of the apps interactions with Graphql server.
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import gql from 'graphql-tag';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import { ApolloLink, concat } from 'apollo-link';

const hostURL = 'http://localhost:3001/graphql';

const httpLink = createHttpLink({
  credentials: 'same-origin',
  uri: hostURL,
});

const client = new ApolloClient({
  cache: new InMemoryCache({
    dataIdFromObject: object => object.username + 1 || null,
  }),
  link: httpLink,
});

export default client;
