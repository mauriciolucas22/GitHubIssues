import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Issues extends Component {
  render() {
    const { issue } = this.props;
    return (
      <View>
        <Text>{issue}</Text>
      </View>
    );
  }
}
