import { ScaledSheet } from 'react-native-size-matters';
export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbfb',
  },
  paddingView: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  profileCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15, paddingBottom: 15,
    paddingLeft: 25, paddingRight: 25,
    borderWidth: 1,
    borderColor: '#f3f3f3',
    borderRadius: 10,
    marginTop: 15,
  },
  roundedImg: {
    height: '60@s',
    width: '60@s',
    borderRadius: 45,
  },
});