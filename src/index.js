import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import Routes from './routes';
import './config/ReactotronConfig';
import api from './services/api';

export default class App extends Component {
  state = {
    username: 'facebook',
  }

  componentWillMount() {
    // AsyncStorage.clear();
    this.checkUser().then((response) => {
      if (!response) {
        this.checkAndSaveUser();
      }
    });
  }

  checkUser = async () => {
    const user = await AsyncStorage.getItem('@GitHubAppIssues:username');
    return user !== null;
  };

  checkAndSaveUser = async () => {
    const response = await api.get(`/users/${this.state.username}`);// await = api.get(...).then(response => {...})

    if (!response.ok) throw Error();// se user não existe Error

    await AsyncStorage.setItem('@GitHubAppIssues:username', this.state.username);
  };

  render() {
    return (
      <Routes />
    );
  }
}
