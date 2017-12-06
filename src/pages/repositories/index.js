import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import api from '../../services/api';

export default class Repositories extends Component {
  componentWillMount() {
    this.checkUser().then((response) => {
      if (response) console.tron.log('OKKKKKK');
      else console.tron.log('VAZIO');
    });
  }

  checkUser = async () => {
    const user = AsyncStorage.getItem('@GitHubIssues:username');
    return user !== null;
  }

  checkAndSaveUser = async () => {
    const response = await api.get(`/users/${this.state.username}`);// await = api.get(...).then(response => {...})

    if (!response.ok) throw Error();// se user não existe Error

    await AsyncStorage.setItem('@SecondGiHubApp:username', this.state.username);
  };

  render() {
    return (
      <View>
        <Text>Repos</Text>
      </View>
    );
  }
}
