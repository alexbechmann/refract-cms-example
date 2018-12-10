import React from 'react';
import { apolloClient } from './graphql/apollo-client';
import { ApolloProvider } from 'react-apollo';
import { CssBaseline } from '@material-ui/core';
import { Switch, Route, BrowserRouter, Link, RouteComponentProps } from 'react-router-dom';
import { Dashboard, createDashboard } from '@refract-cms/dashboard';
import { basicExampleConfig } from './refract.config';
import News from './news/News';
import Products from './products/Products';

const App = () => (
  <BrowserRouter>
  <ApolloProvider client={apolloClient}>
    <div>
      <CssBaseline />

      <Switch>
        <Route path="/news" component={News} />
        <Route path="/products" component={Products} />
        <Route path="/basic-example" component={createDashboard({ config: basicExampleConfig, serverUrl: '/cms/basic-example' })} />
      <Route path="/" component={App} />
      </Switch>
    </div>
  </ApolloProvider>
  </BrowserRouter>
);

export default App;
