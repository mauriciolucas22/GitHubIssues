import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    height: 70,
    padding: 20,
    flexDirection: 'row',
  },

  input: {
    backgroundColor: colors.backgroundContainer,
    fontSize: fonts.small,
    width: 300,
    height: 30,
    borderRadius: 3,
    paddingHorizontal: 20,
    marginLeft: 10,
  },

  icon: {
    marginLeft: 10,
  },
});

export default styles;
