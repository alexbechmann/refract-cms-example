import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { apolloClient } from './graphql/apollo-client';
import Welcome from './Welcome';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Welcome />
    </ApolloProvider>
  );
}

export default App;
