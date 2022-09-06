import React from 'react';
import Routes from './routes';
import {NavigationContainer} from '@react-navigation/native';
import {ApolloProvider} from '@apollo/client';
import client from './services/api';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
