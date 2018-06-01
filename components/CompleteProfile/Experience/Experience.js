import React, { Component } from 'react';
import { Text, View, Button, ScrollView, TextInput, TouchableOpacity, Modal, TouchableHighlight, Alert } from 'react-native';
import { H3, Label, Input, Item , Form, Textarea} from 'native-base';
import Ionic from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import styles from '../Stylesheet';
import commonStyles from '../../../common/CommonStyleSheet';
import { scale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteSubject } from '../../../actions';
import UserJourney from '../../../common/UserJourney';

class Experience extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
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
      fname: '',
      lname: '',
      location: '',
      subjects: '',
      summary: '',
      lname: '',
      errors: {},
      disableSubmit: false,
      loading: false,
      modalVisible: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onAddExperience = this.onAddExperience.bind(this);
    this.deleteSubject = this.deleteSubject.bind(this);
  }

  onSubmit() {

  }

  onAddExperience(type, title) {
    this.props.navigation.navigate('ExperienceModal', {
      expType: type,
      screen: title
    });
  }

  showDeleteAlert(subject) {
    Alert.alert(
      'Delete Subject',
      `Remove ${subject.title}?`,
      [
        {text: 'OK', onPress: () => this.deleteSubject(subject.id)},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
    )
  }

  deleteSubject(subjectId) {
    console.log('delete subject: ', subjectId);
    this.props.deleteSubject(subjectId);
  }

  render() {
    let works = this.props.profileObj.workExperience.map(work => (
      <View key={work.id} style={[styles.cardExperience]}>
        <View style={{flex: 1}}>
          <Material 
            name="work"
            backgroundColor="transparent"
            size={20}
            color="#00b16e" 
            style={{alignSelf: 'center'}}
          />
        </View>
        <View style={{flexWrap: 'wrap', flex: 3}}>
          <Text style={[commonStyles.fontLato, {color: "#00b16e",}]}>{work.role} at {work.company} </Text>
          <Text style={[commonStyles.fontLato, {color: "#00b16e",}]}>({work.startmonth} {work.startyear} - {work.endmonth} {work.endyear})</Text>
        </View>
        <View style={{flex: 1,}}>
          <TouchableOpacity>
            <Material 
              name="close"
              backgroundColor="transparent"
              size={20}
              color="#f2453d" 
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
        </View>
      </View>
    ));

    let educations = this.props.profileObj.education.map(education => (
      <View key={education.id} style={[styles.cardExperience]}>
        <View style={{flex: 1}}>
          <Material 
            name="school"
            backgroundColor="transparent"
            size={20}
            color="#00b16e" 
            style={{alignSelf: 'center'}}
          />
        </View>
        <View style={{flexWrap: 'wrap', flex: 3}}>
          <Text style={[commonStyles.fontLato, {color: "#00b16e",}]}>{education.university} ({education.startmonth} {education.startyear} - {education.endmonth} {education.endyear})</Text>
          <Text style={[commonStyles.fontLato, {color: "#00b16e",}]}>{education.degree} of {education.major} </Text>
        </View>
        <View style={{flex: 1,}}>
          <TouchableOpacity>
            <Material 
              name="close"
              backgroundColor="transparent"
              size={20}
              color="#f2453d" 
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
        </View>
      </View>
    ));

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.centerTitle}>
            <Text style={[styles.title, commonStyles.boldText]}>Complete Your Profile</Text>
          </View>
          
          <UserJourney 
            stage1='#00b16e'
            stage2='#00b16e'
            stage3='#cdccd8'
          />

          <Form style={[styles.inputWrapper, {marginTop: 30}]}>
            <Label style={[commonStyles.formLabel, styles.labelForm]}>WORKING EXPERIENCE</Label>
            <TouchableOpacity style={styles.addWorkBtn} onPress={() => this.onAddExperience('work', 'WORKING EXPERIENCE')} disabled={this.state.disableSubmit}>
              <Text style={[commonStyles.boldText, styles.workText]}>
                + Add Working Experience
              </Text>
            </TouchableOpacity>
            { works }
          </Form>

          <Form style={styles.inputWrapper}>
            <Label style={[commonStyles.formLabel, styles.labelForm]}>EDUCATION</Label>
            <TouchableOpacity style={styles.addWorkBtn} onPress={() => this.onAddExperience('education', 'EDUCATION')} disabled={this.state.disableSubmit}>
              <Text style={[commonStyles.boldText, styles.workText]}>
                + Add Education
              </Text>
            </TouchableOpacity>
            { educations }
          </Form>

        </ScrollView>
        <View style={[styles.submitWrapper]}>
          <TouchableOpacity style={styles.submitBtn} onPress={this.onSubmit} disabled={this.state.disableSubmit}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[commonStyles.boldText, styles.submitText]}>
                NEXT {' '}
              </Text>
              <Material 
                name="arrow-forward"
                backgroundColor="transparent"
                size={20}
                color="white"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

Experience.propTypes = {
  profileObj: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profileObj: state.completeProfileReducer
});

export default connect(mapStateToProps, { deleteSubject })(Experience);