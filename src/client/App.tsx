import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { CssBaseline } from '@material-ui/core';
import { Switch, Route, BrowserRouter, Link, RouteComponentProps } from 'react-router-dom';
import { Dashboard, createDashboard } from '@refract-cms/dashboard';
import Home from './home/Home';
import { basicExampleConfig } from '../examples/basic-example/refract.config';

const App = () => (
  <BrowserRouter>
    <div>
      <CssBaseline />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          path="/basic-example"
          component={createDashboard({ config: basicExampleConfig, serverUrl: '/cms/basic-example' })}
        />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
