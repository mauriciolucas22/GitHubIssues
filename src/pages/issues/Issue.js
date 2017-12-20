import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default class Issue extends Component {
  static propTypes = {
    issue: PropTypes.shape({
      html_url: PropTypes.string,
    }).isRequired,
  }

  click = () => {
    Linking.canOpenURL(this.props.issue.html_url).then((supported) => {
      if (supported) {
        Linking.openURL(this.props.issue.html_url);
      } else {
        console.tron.log('nao suporta');
      }
    });
  };

  render() {
    const { issue } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonContainer} onPress={this.click}>
          <Image style={styles.avatarIssue} source={{ uri: issue.user.avatar_url }} />
          <View style={styles.infoIssue}>
            <Text style={styles.titleIssue}>{issue.title.length >= 30 ? issue.title.slice(0, 30).concat('...') : issue.title}</Text>
            <Text style={styles.userIssue}>{issue.user.login}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
