import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../../../services/api';
import styles from './styles';

export default class Header extends Component {
  state = {
    searchText: '',
    loading: false,
  }

  searchRepositorie = async () => {
    this.setState({ loading: true });
    const username = await AsyncStorage.getItem('@GitHubIssues:username');
    const response = await api.get(`/orgs/${username}/${this.state.searchText}`);
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          placeHolder="Adicionar repositório"
          onChangeText={(searchText) => { this.setState({ searchText }); }}
        />

        <TouchableOpacity onPress={this.searchRepositorie}>
          <Icon name="plus" size={30} color="#900" style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }
}
