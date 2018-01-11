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
    statusIssue: 'open',
    activeFilter: 'all',
  }

  componentWillMount() {
    this.loadIssues();
  }

  loadIssues = async () => {
    this.setState({ loading: true });
    const issues = await api.get(this.props.navigation.state.params.urlIssues);
    this.setState({ loading: false, issues: issues.data });
  }

  filter = (statusFilter) => {
    this.setState({ statusFilter });
    console.tron.log(statusFilter);
    this.renderList();
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
      ? this.renderIssues()
      : <Text style={styles.empty}>Nenhuma Issue!</Text>
  );

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[
            styles.buttonFilterNotSelected,
            this.state.activeFilter === 'all' ? styles.active : styles.notActive,
          ]}
          onPress={() => { this.setState({ activeFilter: 'all' }); }}
        >
          <Text>TEST</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={[
            styles.buttonFilterNotSelected,
            this.state.activeFilter === 'open' ? styles.active : styles.notActive,
          ]}
          onPress={() => { this.setState({ activeFilter: 'open' }); }}
        >
          <Text>TEST</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.buttonFilterNotSelected,
            this.state.activeFilter === 'closed' ? styles.active : {},
          ]}
          onPress={() => { this.setState({ activeFilter: 'closed' }); }}
        >
          <Text>TEST</Text>
        </TouchableOpacity>

        { this.state.loading
          ? <ActivityIndicator size="small" color="#999" style={styles.loading} />
          : this.renderList()
        }
      </View>
    );
  }
}
