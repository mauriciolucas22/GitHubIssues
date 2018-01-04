import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';

import styles from './styles';
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
    savedRepositories: {},
  }

  checkStorage = async () => {
    const savedRepositories = await AsyncStorage.getItem('@GitHubIssues:repositories');
    this.setState({ savedRepositories });
  };

  navigateToIssues = () => {
    this.setState({ loading: true });
    const { navigate } = this.props.navigation;
    const { repository } = this.props;
    navigate('Issues', { user: repository.name, urlIssues: `/repos/${repository.owner.login}/${repository.name}/issues` });
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
