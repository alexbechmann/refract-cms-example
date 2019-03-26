import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { App } from './app';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { createDashboard } from '@refract-cms/dashboard';
import config from '../refract-cms/refract.config';
import 'babel-polyfill';
import { teal } from '@material-ui/core/colors';
import { ApolloProvider } from 'react-apollo';
import { apolloClient } from './graphql/apollo-client';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[500]
    }
  },
  typography: {
    useNextVariants: true
  }
});

render(
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
        <Switch>
          <Route path="/admin" component={createDashboard({ config, serverUrl: '/cms' })} />
          <Route path="/" component={App} />
        </Switch>
      </ApolloProvider>
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
