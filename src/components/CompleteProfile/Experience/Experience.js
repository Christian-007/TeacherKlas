import React, { Component } from 'react';
import { Text, View, Button, ScrollView, TextInput, TouchableOpacity, Modal, TouchableHighlight, Alert } from 'react-native';
import { H3, Label, Input, Item , Form, Textarea} from 'native-base';
import Material from 'react-native-vector-icons/MaterialIcons';
import styles from '../Stylesheet';
import commonStyles from '../../../common/CommonStyleSheet';
import SubmitBtnWithIcon from '../../../common/SubmitBtnWithIcon';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExperience } from '../../../modules/actions';
import UserJourney from '../../../common/UserJourney';
import moment from 'moment';

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
      disableSubmit: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onAddExperience = this.onAddExperience.bind(this);
  }

  onSubmit() {
    this.props.navigation.navigate('CreateSchedule');
  }

  onAddExperience(type, title) {
    this.props.navigation.navigate('ExperienceModal', {
      expType: type,
      screen: title
    });
  }

  showDeleteAlert = (title, expType, expId) => {
    Alert.alert(
      `Delete ${title}`,
      `Remove the selected ${title}?`,
      [
        {text: 'OK', onPress: () => this.deleteExperience(expType, expId)},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
    )
  }

  deleteExperience = (expType, expId) => {
    this.props.removeExperience(expType, expId);
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
          <Text style={[commonStyles.fontLato, {color: "#00b16e",}]}>
            ({moment(work.startmonth, 'MM').format('MMMM')} {work.startyear} - {work.workHere ? 'Now' : moment(work.endmonth, 'MM').format('MMMM')+' '+work.endyear})
          </Text>
        </View>
        <View style={{flex: 1,}}>
          <TouchableOpacity
            onPress={() => this.showDeleteAlert('work experience', 'WORK', work.id)}
          >
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
          <Text style={[commonStyles.fontLato, {color: "#00b16e",}]}>{education.degree} of {education.major} </Text>
          <Text style={[commonStyles.fontLato, {color: "#00b16e",}]}>{education.university}</Text>
          <Text style={[commonStyles.fontLato, {color: "#00b16e",}]}>
            ({moment(education.startmonth, 'MM').format('MMMM')} {education.startyear} - {education.studyHere ? 'Now' : moment(education.endmonth, 'MM').format('MMMM')+' '+education.endyear})
          </Text>
        </View>
        <View style={{flex: 1,}}>
          <TouchableOpacity
            onPress={() => this.showDeleteAlert('education', 'EDU', education.id)}
          >
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
            current='stage2'
          />

          <Form style={[styles.inputWrapper, {marginTop: 30}]}>
            <Label style={[commonStyles.formLabel, styles.labelForm]}>WORKING EXPERIENCE</Label>
            <TouchableOpacity style={styles.addWorkBtn} onPress={() => this.onAddExperience('work', 'EXPERIENCE')} disabled={this.state.disableSubmit}>
              <Text style={[commonStyles.boldText, styles.workText]}>
                + Add Working Experience
              </Text>
            </TouchableOpacity>
            { works }
          </Form>

          <Form style={[styles.inputWrapper, {marginTop: 30}]}>
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
          <SubmitBtnWithIcon 
            label="NEXT"
            onPress={this.onSubmit}
            disabled={this.state.disableSubmit}
          />
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

export default connect(mapStateToProps, { removeExperience })(Experience);