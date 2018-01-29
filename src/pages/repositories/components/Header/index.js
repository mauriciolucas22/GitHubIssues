import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../../../services/api';
import styles from './styles';

export default class Header extends Component {
  state = {
    searchText: '',
    loading: false,
    repositorie: {},
  }

  getOrganizationString = (text = this.state.searchText) => {
    const index = text.indexOf('/');
    const org = text.slice(0, index);
    const repo = text.slice(index + 1);

    return { org, repo };
  };

  searchRepositorie = async () => {
    this.setState({ loading: true });
    const { org, repo } = this.getOrganizationString(this.state.searchText);
    const response = await api.get(`/repos/${org}/${repo}`);
    this.setState({ loading: false, repositorie: response.data });
  };

  /**
   * Ao​ ​ clicar​ ​ no​ ​ botão​ ​ “+”​ ​ uma​ ​ request​ ​ será​ ​ enviada​ ​ à ​ ​ API​ ​ do​ ​ Github​ ​ buscando
   * informações​ ​ do​ ​ repositório​ ​ e ​ ​ armazenando​ ​ os​ ​ campos​ ​ ID,​ ​ nome,​ ​ organização​ ​ e
   * avatar​ ​ no​ ​ storage​ ​ (AsyncStorage)​ ​ do​ ​ dispositivo;
   */

  checkAndSaveRepositorie = () => {
    this.searchRepositorie().then(() => {
      this.saveRepositorie();
    });
  };

  saveRepositorie = async () => {
    const { org } = this.getOrganizationString();
    const { repositorie } = this.state;

    if (repositorie) {
      const reposSaved = JSON.parse(await AsyncStorage.getItem('@GitHubIssues:repositories')) || [];

      const newSaved = [...reposSaved, {
        id: repositorie.id,
        org,
        name: repositorie.name,
      }];

      await AsyncStorage.setItem('@GitHubIssues:repositories', JSON.stringify(newSaved));
    }
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

        <TouchableOpacity onPress={this.checkAndSaveRepositorie}>
          <Icon name="plus" size={30} color="#900" style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }
}
