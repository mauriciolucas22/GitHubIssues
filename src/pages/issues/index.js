import React, { Component } from 'react';
import { View, Text } from 'react-native';
import api from '../../services/api';
import PropTypes from 'prop-types';

export default class Issues extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.user}`,
  })

  componentWillMount() {
    this.loadIssues();
  }

  loadIssues = async () => {
    const issues = await api.get(this.props.navigation.state.params.urlIssues);
  }

  render() {
    return (
      <View>
        <Text>jesus</Text>
      </View>
    );
  }
}
