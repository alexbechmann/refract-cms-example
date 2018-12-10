import React from 'react';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider, graphql } from 'react-apollo';
import { CssBaseline } from '@material-ui/core';
import News from './news/News';
import Products from './products/Products';
import { Link } from 'react-router-dom';

const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: `/cms/graphql` }),
  cache: new InMemoryCache({
    addTypename: false
  })
});

const App = () => (
  <ApolloProvider client={apolloClient}>
    <CssBaseline />
    <News />
    <Products />
    <Link target="_blank" to="/admin">
      Go to dashboard to add/edit some data
    </Link>
  </ApolloProvider>
);

export default App;
