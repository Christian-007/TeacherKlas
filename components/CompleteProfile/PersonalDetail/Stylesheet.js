import { ScaledSheet } from 'react-native-size-matters';

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerTitle: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#606060',
    letterSpacing: 1,
  },
  journey: {
    marginTop: '15@s',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 50, paddingRight: 50,
    position: 'relative',
  },

  hr: {
    width: '90@s',
    height: 2,
    backgroundColor: '#cdccd8',
    zIndex: 0,
  },
});