import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableOpacity, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import api from '../../services/api';
import Repository from './components/Repository';
import Header from './components/Header';
import '../../config/ReactotronConfig';

import styles from './styles';

export default class Repositories extends Component {
  static navigationOptions = {
    header: <Header />,
  }

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  }

  state = {
    testRepos: [],
    savedRepositories: [],
    repositories: [],
    loading: false,
    refreshing: false,
  }

  componentWillMount() {
    this.setState({ loading: true });
    this.loadSavedRepositories();
    this.loadRepositories().then(() => {
      this.setState({
        loading: false,
        testRepos: [
          ...this.state.savedRepositories,
          ...this.state.repositories,
        ],
      });
    });
  }

  loadRepositories = async () => {
    this.setState({ refreshing: true });
    const username = await AsyncStorage.getItem('@GitHubIssues:username');
    const response = await api.get(`/users/${username}/repos`);
    this.setState({ repositories: response.data, refreshing: false });
  };

  loadRepo = async (repo) => {
    const response = await api.get(`repos/${repo.org}/${repo.name}`);
    this.setState({
      savedRepositories: [
        ...this.state.savedRepositories,
        response.data,
      ],
    });
    return response;
  }

  loadSavedRepositories = async () => {
    // carrega objeto de repos in Async
    const savedRepositories = JSON.parse(await AsyncStorage.getItem('@GitHubIssues:repositories')) || [];

    // faz mapeamento dos repos saved e add in response
    savedRepositories.map(repo => this.loadRepo(repo));
  };

  filterRepositoriesSaved = () => {
    this.state.savedRepositories.map(saved => saved !== this.state.repositories.map(repo => repo));
  };

  renderRepositories = () => (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}// variavel que diz quando ele está atualizando ou não
          onRefresh={this.loadRepositories}// qual ação deve fazer quando puxar a lista para baixo
        />
      }
      data={this.state.testRepos} // conteudo que sera renderizado
      keyExtractor={repository => repository.id}// key, um repositorio por vez
      renderItem={({ item }) => <Repository navigation={this.props.navigation} repository={item} />}// como será renderizado cada item, { item } contem cada valor de state.repositories
    />
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
          ? <ActivityIndicator size="small" color="#999" style={styles.loading} />
          : this.renderList()
        }
      </View>
    );
  }
}
