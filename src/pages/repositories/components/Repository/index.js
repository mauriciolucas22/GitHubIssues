import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import Issues from '../../../issues';
import Icon from 'react-native-vector-icons/FontAwesome';

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
          <Image style={styles.avatar} source={{ uri: repository.owner.avatar_url }} />
          <View style={styles.infoContainer}>
            <Text style={styles.infoRepoName}>{repository.name}</Text>
            <Text style={styles.infoUserName}>{repository.owner.login}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Icon name="angle-right" size={20} color="#999" style={styles.icon} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
