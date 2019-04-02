import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { createDashboard } from '@refract-cms/dashboard';
import config from '../refract-cms/refract.config';
import 'babel-polyfill';
import { teal } from '@material-ui/core/colors';
import { install, ThemeProvider } from '@material-ui/styles';

install();

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
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/admin" component={createDashboard({ config, serverUrl: '/cms', homePageUrl: '/' })} />
          <Route path="/" component={App} />
        </Switch>
      </ThemeProvider>
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
