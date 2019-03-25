import React from 'react';
import { CssBaseline } from '@material-ui/core';

export interface AppProps {}

interface Props extends AppProps {}

class App extends React.Component<Props> {
  render() {
    return (
      <div>
        <CssBaseline />
        app here
      </div>
    );
  }
}

export default App as React.ComponentType<AppProps>;
