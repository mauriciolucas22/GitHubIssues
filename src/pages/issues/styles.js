import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },

  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    padding: 20,
    backgroundColor: colors.background,
    borderRadius: 8,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },

  avatarIssue: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },

  infoIssue: {
    marginLeft: 10,
  },

  titleIssue: {
    fontSize: fonts.big,
    fontWeight: 'bold',
  },
});

export default styles;
