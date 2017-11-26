// Apollo client - this is the centre of the apps interactions with Graphql server.
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

const httpLink = new HttpLink({
  uri: 'http://localhost:3001/graphql',
  credentials: 'same-origin',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

const whatever = client.query({ query: gql`{ user {
    id
    name
    username
    password
  } }` });
console.log('this is in apollo client', whatever);

export default client;
