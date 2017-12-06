import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import styled from 'styled-components';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient from './apollo/ApolloClient';

const AppStyled = styled(App)`
  font-family: sans-serif;
  margin: 0;
  padding: 0;
`;

ReactDOM.render(
  <ApolloProvider client={ApolloClient}>
    <AppStyled />
  </ApolloProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
