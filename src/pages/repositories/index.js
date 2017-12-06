import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableOpacity, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import api from '../../services/api';
import Repository from './components/Repository';

export default class Repositories extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  }

  state = {
    repositories: [],
    username: 'facebook',
  }

  componentWillMount() {
    this.checkUser().then((response) => {
      if (!response) {
        this.checkAndSaveUser();
      }
    });
  }

  checkUser = async () => {
    const user = await AsyncStorage.getItem('@GitHubIssues:username');
    return user !== null;
  }

  checkAndSaveUser = async () => {
    const response = await api.get(`/users/${this.state.username}`);// await = api.get(...).then(response => {...})

    if (!response.ok) throw Error();// se user não existe Error

    await AsyncStorage.setItem('@GiHubAppIssues:username', this.state.username);
  };

  repository = {
    full_name: 'TESTE',
  }

  render() {
    return (
      <View>
        <Text>Repos</Text>
        <Repository navigation={this.props.navigation} repository={this.repository} />
      </View>
    );
  }
}
