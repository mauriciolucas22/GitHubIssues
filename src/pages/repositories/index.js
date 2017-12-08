import React, { Component } from 'react';
import { View, Text, AsyncStorage, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import api from '../../services/api';
import Repository from './components/Repository';
import '../../config/ReactotronConfig';

import styles from './styles';


export default class Repositories extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  }

  state = {
    repositories: [],
    username: 'facebook',
    loading: false,
  }

  componentWillMount() {
    // AsyncStorage.clear();
    this.checkUser().then((response) => {
      if (!response) {
        this.checkAndSaveUser();
      }
    });

    this.loadRepositories();
  }

  checkUser = async () => {
    const user = await AsyncStorage.getItem('@GitHubAppIssues:username');
    return user !== null;
  }

  checkAndSaveUser = async () => {
    const response = await api.get(`/users/${this.state.username}`);// await = api.get(...).then(response => {...})

    if (!response.ok) throw Error();// se user não existe Error

    await AsyncStorage.setItem('@GitHubAppIssues:username', this.state.username);
  };

  loadRepositories = async () => {
    this.setState({ loading: true });
    const username = await AsyncStorage.getItem('@GitHubAppIssues:username');
    const response = await api.get(`/users/${username}/repos`);
    this.setState({ repositories: response.data, loading: false });
  };

  renderRepositories = () => (
    this.state.repositories.map(repo => (
      <Repository key={repo.id} navigation={this.props.navigation} repository={repo} />
    ))
  );

  renderList = () => (
    this.state.repositories.length
      ? this.renderRepositories()
      : <Text style={styles.empty}>Sem Repositorios</Text>
  );

  render() {
    return (
      <View style={styles.container}>
        { this.state.loading
          ? <ActivityIndicator size="small" color="#999" />
          : this.renderList()
        }
        
      </View>
    );
  }
}
