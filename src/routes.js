import React from 'react';
import { StackNavigator } from 'react-navigation';
import Repositories from './pages/repositories';
import Issues from './pages/issues';

const createRootNavigator = (userExists = false) =>
      StackNavigator({
        Repositories: { screen: Repositories },
        Issues: { screen: Issues },
      });

export default createRootNavigator;
