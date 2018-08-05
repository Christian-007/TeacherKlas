import { StyleSheet } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

export default ScaledSheet.create({
  fontLato: {
    fontFamily: 'Lato-Regular',
    fontWeight: '400',
  },
  lightText: {
    fontFamily: 'Lato-Regular',
    fontWeight: '300',
    fontSize: '12@ms',
  },
  boldText: {
    fontFamily: 'Lato-Regular',
    fontWeight: '700',
  },
  itemWrapper: {
    marginBottom: 10,
  },
  customItem: {
    borderBottomWidth: 1,
    height: '60@ms',
  },
  formLabel: {
    fontFamily: 'Lato-Regular',
    fontSize: '12@ms',
    letterSpacing: 2,
    color: '#b3b3b3'
  },
  formInput: {
    paddingTop: '20@ms',
    fontFamily: 'Lato-Regular',
    fontSize: '12@ms',
    width: '280@ms0.8',
  },
  errorMessage: {
    color: '#ed2f2f',
    fontFamily: 'Lato-Regular',
    fontSize: '12@ms',
    marginTop: 5,
  },
  textTeacher: {
    fontFamily: 'Lato-Regular',
    fontWeight: '800',
    fontSize: 12,
    letterSpacing: 1,
    color: '#00b16e',
  }
});