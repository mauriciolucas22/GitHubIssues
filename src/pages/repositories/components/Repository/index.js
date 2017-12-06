import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

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
      <View>
        <TouchableOpacity onPress={this.navigateToIssues}>
          { this.state.loading
          ? <ActivityIndicator size="small" color="#FFF" />
          : <Text>{repository.full_name}</Text>
          }
        </TouchableOpacity>
      </View>
    );
  }
}
