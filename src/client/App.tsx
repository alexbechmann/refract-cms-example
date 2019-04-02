import React from 'react';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  WithStyles,
  Theme,
  createStyles,
  withStyles,
  Link as TextLink
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';

export interface AppProps {}

const styles = (theme: Theme) =>
  createStyles({
    content: {
      padding: theme.spacing.unit,
      maxWidth: 1000
    },
    grow: {
      flexGrow: 1
    },
    appBar: {
      marginBottom: theme.spacing.unit * 3
    },
    title: {
      marginBottom: theme.spacing.unit * 3
    }
  });

interface Props extends AppProps, WithStyles<typeof styles> {}

const App: React.ComponentType<Props> = ({ classes }) => (
  <>
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar>
        <Typography color="inherit" variant="h6">
          <Link to="/" style={{ color: 'white' }}>
            Refract Cms example
          </Link>
        </Typography>
        <div className={classes.grow} />
        <Button color="inherit" href="/admin/">
          Go to content dashboard
        </Button>
      </Toolbar>
    </AppBar>
    <CssBaseline />
    <Grid container justify="center">
      <Grid item xs={12} sm={10} md={8} lg={7} className={classes.content}>
        <Typography gutterBottom variant="h4" className={classes.title}>
          Welcome to the Refract Cms example app
        </Typography>
        <Typography gutterBottom>
          This example has client code on the same app as the CMS for convenience, with the content editing dashboard
          avaialable on the
          <TextLink component={(props: any) => <Link {...props} to="/admin" />}>/admin</TextLink> route.
        </Typography>
        <Typography gutterBottom>
          You can decide to go fully headless and host your frontend elsewhere, using the framework of your choice.
        </Typography>
      </Grid>
    </Grid>
  </>
);

export default compose(withStyles(styles))(App) as React.ComponentType<AppProps>;
