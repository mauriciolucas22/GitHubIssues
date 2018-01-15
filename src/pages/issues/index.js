import React, { Component } from 'react';
import { View, Text, FlatList, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native';
import api from '../../services/api';
import PropTypes from 'prop-types';
import styles from './styles';
import Issue from './Issue';

/**
 * Ah certo, você vai precisar adicionar a informação de qual filtro foi clicado ao estado do seu componente, então lá no seu state você tera:

state = {
  activeFilter: 'closed'
}


E daí em cada botão de filtro você faz uma verificação se ele está ativo e adiciona algum estilo a mais:

<TouchableOpacity
  style={[
    styles.button,
    (this.state.activeFilter === 'closed') ? styles.active : {},
  ]}
>
Algo assim
Aí quando clicar em cada botão de filtro precisa setar esse estado activeFilter com o que você clicou


Você deve realizar uma query cada vez que clicar em um botão de filtro passando um parâmetro na url https://api.github.com/repos/react-community/react-navigation/issues?type=closed
closed, open ou all
 */

export default class Issues extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.user}`,
  })

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.object,
    }).isRequired,
  }

  state = {
    issues: [],
    loading: false,
    refreshing: false,
    activeFilter: 'all',
  }

  componentWillMount() {
    this.loadIssues();
  }

  loadIssues = async () => {
    this.setState({ loading: true });
    const issues = await api.get(`${this.props.navigation.state.params.urlIssues}?type=${this.state.activeFilter}`);
    this.setState({ loading: false, issues: issues.data });
  }

  filter = () => {
    this.loadIssues();
  }

  renderIssues = () => (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.loadIssues}
        />
      }
      data={this.state.issues}
      keyExtractor={issue => issue.id}
      renderItem={({ item }) => <Issue issue={item} />}
    />
  );

  renderList = () => (
    this.state.issues.length
      ? this.renderIssues(this.state.activeFilter)
      : <Text style={styles.empty}>Nenhuma Issue!</Text>
  );

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
            this.state.activeFilter === 'all' ? styles.active : styles.notActive,
          ]}
            onPress={() => { this.setState({ activeFilter: 'all' }); this.filter(); }}
          >
            <Text style={this.state.activeFilter === 'all' ? styles.textActive : {}}>Todos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
            this.state.activeFilter === 'open' ? styles.active : styles.notActive,
          ]}
            onPress={() => { this.setState({ activeFilter: 'open' }); this.filter(); }}
          >
            <Text style={this.state.activeFilter === 'open' ? styles.textActive : {}}>Ativos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
            this.state.activeFilter === 'closed' ? styles.active : styles.notActive,
          ]}
            onPress={() => { this.setState({ activeFilter: 'closed' }); this.filter(); }}
          >
            <Text style={this.state.activeFilter === 'closed' ? styles.textActive : {}}>Fechados</Text>
          </TouchableOpacity>
        </View>

        { this.state.loading
          ? <ActivityIndicator size="small" color="#999" style={styles.loading} />
          : this.renderList()
        }
      </View>
    );
  }
}
