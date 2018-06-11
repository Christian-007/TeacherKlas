// import { StyleSheet } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

export default ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  fontLato: {
    fontFamily: 'Lato-Regular',
  },
  imageLogo: {
    height: '160@vs', 
    width: '160@ms',
  },
  fieldWrapper: {
    marginTop: '20@s',
  },
  submitWrapper: {
    marginTop: '10@vs',
    borderRadius: 30,
    borderColor: 'transparent',
    backgroundColor: '#00b16e',
    borderWidth: 1,
  },
  button: {
    fontFamily: 'Lato-Regular',
    fontWeight: '300',
    letterSpacing: 2,
    color: 'white',
    lineHeight: 30,
    padding: 10,
    textAlign: 'center',
    width: '280@ms0.8',
  },
  textWrapper: {
    marginTop: 12,
    flexDirection: 'row',
  },
  lightText: {
    fontFamily: 'Lato-Regular',
    fontWeight: '300',
    fontSize: '12@ms',
  },
  anchorLink: {
    fontFamily: 'Lato-Regular',
    color: '#006ce5',
    fontWeight: '400',
    fontSize: '12@ms',
  },
});