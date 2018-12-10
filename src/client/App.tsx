import React from 'react';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider, graphql } from 'react-apollo';
import { CssBaseline } from '@material-ui/core';
import { Switch, Route, BrowserRouter, Link, RouteComponentProps } from 'react-router-dom';
import { createDashboard } from '@refract-cms/dashboard';
import { config } from '../refract-cms/refract.config';
import Home from './home/Home';

const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: `/cms/graphql` }),
  cache: new InMemoryCache({
    addTypename: false
  })
});

const App = () => (
  <BrowserRouter>
    <ApolloProvider client={apolloClient}>
      <div>
        <CssBaseline />
        <Switch>
          <Route path="/admin" component={createDashboard({ config, serverUrl: '/cms' })} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </ApolloProvider>
  </BrowserRouter>
);

export default App;
