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
  Link as TextLink,
  TableRow,
  TableCell,
  Table
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import News from './News';

export interface WelcomeProps {}

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
    },
    table: {
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 3
    }
  });

interface Props extends WelcomeProps, WithStyles<typeof styles> {}

const Welcome: React.ComponentType<Props> = ({ classes }) => (
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
          Welcome to the Refract Cms example
        </Typography>
        <Typography gutterBottom>
          This example has client code on the same Welcome as the CMS for convenience, with the content editing
          dashboard avaialable on the
          <TextLink href="/admin">/admin</TextLink> route.
        </Typography>
        <Typography gutterBottom>
          You can decide to go fully headless and host your frontend elsewhere, using the framework of your choice.
        </Typography>

        <Table className={classes.table}>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>
              <strong>admin</strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Password</TableCell>
            <TableCell>
              <strong>password</strong>
            </TableCell>
          </TableRow>
        </Table>
        {/* <Button variant="raised" color="secondary" href="/admin/">
          Go to content dashboard
        </Button> */}
        <News />
      </Grid>
    </Grid>
  </>
);

export default compose(withStyles(styles))(Welcome) as React.ComponentType<WelcomeProps>;
