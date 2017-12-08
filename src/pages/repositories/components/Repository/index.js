import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

export default class Repository extends Component {
  static propTypes = {
    repository: PropTypes.shape({
      full_name: PropTypes.string,
    }).isRequired,

    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  }

  state = {
    loading: false,
  }

  navigateToIssues = () => {
    this.setState({ loading: true });
    const { navigate } = this.props.navigation;
    navigate('Issues');
    this.setState({ loading: false });
  }

  render() {
    const { repository } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonContainer} onPress={this.navigateToIssues}>
          <Text style={styles.avatar}>Avatar</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoName}>{repository.full_name}</Text>
            <Text style={styles.infoOrganization}>{repository.organization}</Text>
          </View>
          <Text style={styles.icon}>...>>...</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
