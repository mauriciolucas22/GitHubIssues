import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },

  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    padding: 20,
    backgroundColor: colors.background,
    borderRadius: 3,
  },
});

export default styles;
