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
  // --- START OF USER JOURNEY STYLE ---
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
  // --- END OF USER JOURNEY STYLE ---
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10,
    borderRadius: 20,
    marginRight: 5, marginBottom: 5,
  },
  subjectText: {
    color: '#d3d3d3',
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

  // ADD SUBJECT STYLE
  subjectBtn: {
    backgroundColor: '#00b16e',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10,
    borderRadius: 20,
    marginRight: 5, marginBottom: 5,
  }
});