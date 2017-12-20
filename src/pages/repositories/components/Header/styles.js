import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 60,
    flexDirection: 'row',
  },

  input: {
    backgroundColor: colors.backgroundFilter,
    fontSize: fonts.small,
    width: 300,
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 20,
    marginLeft: 20,
  },

  icon: {
    marginLeft: 10,
  },
});

export default styles;
