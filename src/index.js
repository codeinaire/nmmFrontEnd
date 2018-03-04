import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';
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
    <Router >
      <AppStyled />
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
