// Apollo client - this is the centre of the apps interactions with Graphql server.
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';


const hostURL = 'http://localhost:3001/graphql';

const httpLink = new HttpLink({
  uri: hostURL,
});

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : null,
//     },
//   };
// });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// const whatever = client.query({
//   query: gql`{ user {
//     id
//     name
//     username
//     password
//   } }` });
// console.log('this is in apollo client', whatever);

export default client;
