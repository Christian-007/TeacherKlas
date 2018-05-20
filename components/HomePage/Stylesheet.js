import { ScaledSheet } from 'react-native-size-matters';
export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  paddingView: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  fontLato: {
    fontFamily: 'Lato-Regular',
  },
  boldText: {
    fontFamily: 'Lato-Regular',
    fontWeight: '700',
  },
  lightText: {
    fontFamily: 'Lato-Regular',
    fontWeight: '300',
  },
  welcomeText: {
    marginTop: 10,
    fontSize: '26@ms',
    fontFamily: 'Lato-Regular',
    fontWeight: '700',
    letterSpacing: 2,
  },
  textWrapper: {
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upcomingText: {
    letterSpacing: 1,
    fontSize: 14,
  },
  header: {
    fontSize: 30,
    letterSpacing: 1,
    color: '#aaaaaa',
  },
  userName: {
    fontWeight: '700',
    color: '#00b16e',
  },
  scheduleWrapper: {
    marginTop: 10,
    backgroundColor: '#fafafa',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  rightText: {
    fontWeight: '700',
    color: 'white',
    fontSize: 12,
  },
  lessonWrapper: {
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  dateLesson: {
    fontWeight: '700',
    color: '#aaaaaa',
    letterSpacing: 1,
    fontSize: 12,
    marginBottom: 20,
  },
  cardWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  cardSubject: {
    fontSize: 20,
    marginBottom: 5,
  },
  cardTeacher: {
    fontSize: 14,
    marginBottom: 10,
    color: '#828282',
  },
  cardType: {
    borderWidth: 1,
    borderColor: '#00b16e',
    backgroundColor: 'white',
    paddingTop: 0, paddingBottom: 0,
    paddingLeft: 5, paddingRight: 5,
    height: '15@s'
  },
  cardTextStyle: {
    color: '#00b16e',
    fontSize: '8@s',
    letterSpacing: 1,
    lineHeight: 0,
  },
  roundedImg: {
    height: '55@s',
    width: '55@s',
    borderWidth: 1,
    borderColor:'rgba(0,0,0,0.2)',
    borderRadius: '28@s',
  },
});