import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

export default class Header extends Component {
  state = {
    searchText: '',
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          placeHolder="Adicionar repositório"
          onCHangeText={(searchText) => { this.setState({ searchText }); }}
        />

        <TouchableOpacity>
          <Icon name="plus" size={30} color="#900" style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }
}
