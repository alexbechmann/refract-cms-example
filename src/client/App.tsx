import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createDashboard } from '@refract-cms/dashboard';
import { config } from '../refract-cms/refract.config';

const App = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" component={createDashboard({ config, serverUrl: '/cms' })} />
        <Route path="/" component={() => <p>hello</p>} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
