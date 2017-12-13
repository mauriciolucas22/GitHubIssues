import React, { Component } from 'react';
import { View, Text, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import api from '../../services/api';
import PropTypes from 'prop-types';
import styles from './styles';
import Issue from './Issue';

export default class Issues extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.user}`,
  })

  state = {
    issues: [],
    loading: false,
    refreshing: false,
  }

  componentWillMount() {
    this.loadIssues();
  }

  loadIssues = async () => {
    this.setState({ loading: true });
    const issues = await api.get(this.props.navigation.state.params.urlIssues);
    this.setState({ loading: false, issues: issues.data });
  }

  issueComponent = issue => (
    <Text>My Jesus</Text>
  );

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
        { this.state.loading
          ? <ActivityIndicator size="small" color="#999" style={styles.loading} />
          : this.renderList()
        }
      </View>
    );
  }
}
