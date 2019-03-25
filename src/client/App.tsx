import React from 'react';
import { MuiThemeProvider, Grid, Paper, CssBaseline } from '@material-ui/core';
import { theme } from './styles/theme';
import { Provider, connect } from 'react-redux';
import { store } from './state/root.store';
import { Employees } from './employees/Employees';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { routes } from './routes/routes';
import { Clinics } from './clinics/Clinics';
import { AppNavBar } from './menu/AppNavBar';
import { Home } from './home/Home';
import { Prices } from './prices/Prices';
import { Dashboard, createDashboard } from '@refract-cms/dashboard';
import { combineContainers } from 'combine-containers';
import { getLayout } from './layout/state/layout.actions';
import './styles/index.css';

export interface AppProps {}

interface Props extends AppProps {}

class App extends React.Component<Props> {
  render() {
    return (
      <div>
        <CssBaseline />
        <AppNavBar />
        <Grid container justify="center" spacing={16}>
          <Grid item xs={12} sm={11} md={10} lg={8} xl={6}>
            <Paper>
              <div className="content">app here</div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App as React.ComponentType<AppProps>;
