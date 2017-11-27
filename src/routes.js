import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Repositories from './pages/repositories';
import Issues from './pages/issues';

//import Header from './components/Header';

const createRootNavigator = (userExists = false) => {
  StackNavigator({
      Repositories: { screen: Repositories },
      Issues: { screen: Issues },
    },//fim navs
    
  );//fimStackNavigator

};

export default createRootNavigator;
