import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';

import "./config/ReactotronConfig";
import api from './services/api';
import createRootNavigator from "./routes";


export default class App extends Component {
  state = {
    userExists: false,
    userChecked: false,
  }

  componentWillMount(){
    //AsyncStorage.clear();
    this.checkUser().then((response) => {
      this.setState({ userExists: response, userChecked: true });
    });
  };

  /*checkAndSaveUser = async () => {
    const response = await api.get(`/users/${this.state.username}`);



    if( !response.ok ) throw Error();

    await AsyncStorage.setItem('@GitHubIssues:username', this.state.username);
  };*/

  checkUser = async () => {
    const user = await AsyncStorage.getItem('@GitHubIssues:username');

    return user !== null;
  };


  render(){
    const { userExists, userChecked } = this.state;

    if(!userChecked) return null;

    const Layout = createRootNavigator(userExists);

    return(
      <View >
        <Text>JESUSU</Text>
      </View>
    );
  }
};
