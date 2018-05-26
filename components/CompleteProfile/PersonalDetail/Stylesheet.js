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
    fontSize: '16@s',
  },
  journey: {
    marginTop: '15@s',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 50, paddingRight: 50,
    position: 'relative',
  },
  inputWrapper: {
    marginTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  formWrapper: {
    marginTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  addSubject: {
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 20,
    paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10,
  },
  subjectText: {
    color: '#d3d3d3',
    letterSpacing: 2,
    fontSize: 12,
  },
  summaryTextarea: {
    marginTop: 10,
    borderColor: '#d3d3d3',
    color: '#000',
    paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10,
  },
  submitWrapper: {
    alignItems: 'center', 
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    paddingTop: 10, paddingBottom: 10, paddingLeft: 30, paddingRight: 30,
  },
  submitBtn: {
    backgroundColor: '#00b16e',
    width: '100%',
    alignItems: 'center',
    paddingTop: 10, paddingBottom: 10,
    borderRadius: 20,
  },
  submitText: {
    color: 'white',
    letterSpacing: 2,
  },
  hr: {
    width: '90@s',
    height: 2,
    backgroundColor: '#cdccd8',
    zIndex: 0,
  },
});