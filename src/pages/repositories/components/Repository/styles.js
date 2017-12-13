import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },

  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    padding: 20,
    backgroundColor: colors.background,
    borderRadius: 3,
  },

  avatar: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },

  infoContainer: {
    marginLeft: 20,
  },

  infoRepoName: {
    fontWeight: 'bold',
    fontSize: fonts.big,
  },

  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    marginLeft: 40,
  },
});

export default styles;
