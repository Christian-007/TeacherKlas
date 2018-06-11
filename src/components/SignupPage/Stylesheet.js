import { StyleSheet } from 'react-native';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';

export default StyleSheet.create({
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
    height: verticalScale(150),
    width: moderateScale(150),
  },
  inputBorderBtm: {
    borderColor: '#eeeeee',
    borderBottomWidth: 1,
  },
  formWrapper: {
    marginTop: 10,
  },
  submitWrapper: {
    marginTop: verticalScale(10),
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
    paddingTop: scale(15), paddingBottom: scale(15),
    textAlign: 'center',
    width: scale(280),
  },
  textWrapper: {
    marginTop: 10,
    flexDirection: 'row',
  },
  lightText: {
    fontFamily: 'Lato-Regular',
    fontWeight: '300',
    fontSize: moderateScale(12),
  },
  anchorLink: {
    fontFamily: 'Lato-Regular',
    color: '#006ce5',
    fontWeight: '400',
    fontSize: moderateScale(12),
  },
});