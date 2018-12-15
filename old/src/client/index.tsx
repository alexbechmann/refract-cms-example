import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter, Link, RouteComponentProps } from 'react-router-dom';
import { createDashboard } from '@refract-cms/dashboard';
import { config } from '../refract-cms/refract.config';
import App from './App';

const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/admin" component={createDashboard({ config, serverUrl: '/cms' })} />
      <Route path="/" component={App} />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(<Root />, document.getElementById('root'));
