import React, { Component } from 'react';
import { Text, View, Button, ScrollView } from 'react-native';
import styles from '../Stylesheet';
import commonStyles from '../../../common/CommonStyleSheet';
import UserJourney from '../../../common/UserJourney';
import SubmitBtnWithIcon from '../../../common/SubmitBtnWithIcon';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PersonalForm from './Form/PersonalForm';
import { validatePersonalForm } from '../../../utils/formValidation';

class PersonalDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Button
          onPress={() => navigation.navigate("SignedIn")}
          title="SKIP"
        />
      ),
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      avatarSource: {},
      fname: '',
      lname: '',
      location: '',
      subjects: 0,
      summary: '',
      errors: {},
      isUploaded: false,
      disableSubmit: false,
      loading: false,
      modalVisible: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onAddSubject = this.onAddSubject.bind(this);
  }

  onChangeInput(key, value) {
    this.setState({
      [key]: value
    });
  }

  formValidation() {
    const { errors, isValid } = validatePersonalForm(this.state);

    if(!isValid) {
      this.setState({ errors }, () => {
        console.log(this.state);
      });
    }
    
    return isValid;
  }

  onSubmit() {
    console.log('subjects: ', this.props.profileObj.subjects);
    this.setState({subjects: this.props.profileObj.subjects.length}, () => {
      
      // validate form here
      // if it's success, then navigate to the next slide
      if(this.formValidation()){
        console.log('no error');
        this.setState({ errors: {} }, () => {
          this.props.navigation.navigate('Experience');
        });
      }
      // otherwise, shows errors on releavant text field
    });
  }

  onAddSubject() {
    this.props.navigation.navigate('SubjectModal');
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.centerTitle}>
            <Text style={[styles.title, commonStyles.boldText]}>Complete Your Profile</Text>
          </View>
          
          <UserJourney 
            stage1='#00b16e'
            stage2='#cdccd8'
            stage3='#cdccd8'
            current='stage1'
          />

          <View style={{paddingBottom: 20}}>
            <PersonalForm 
              currentState={this.state}
              onChangeInput={(key,value) => this.onChangeInput(key,value)}
              onAddSubject={this.onAddSubject}
            />
          </View>
        </ScrollView>

        <View style={[styles.submitWrapper]}>
          <SubmitBtnWithIcon 
            label="NEXT"
            onPress={this.onSubmit}
          />
        </View>
      </View>
    )
  }
}

PersonalDetail.propTypes = {
  profileObj: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profileObj: state.completeProfileReducer
});

export default connect(mapStateToProps, {})(PersonalDetail);