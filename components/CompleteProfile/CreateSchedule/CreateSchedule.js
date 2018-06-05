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
import { submitProfile } from '../../../actions/scheduleProfile';
import UserJourney from '../../../common/UserJourney';
import TextFieldWithLabel from '../../../common/TextFieldWithLabel';
import SubmitBtnWithIcon from '../../../common/SubmitBtnWithIcon';
import ScheduleModal from './ScheduleModal';
import ScheduleTable from './ScheduleTable';

class CreateSchedule extends Component {
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
      schedule: {},
      screen: '',
      errors: {},
      disableSubmit: false,
      loading: false,
      modalVisible: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteSubject = this.deleteSubject.bind(this);
    this.onAddSchedule = this.onAddSchedule.bind(this);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  onSubmit() {
    console.log('User data: ', this.props.profileObj);
    this.props.submitProfile(this.props.profileObj);
  }

  onAddSchedule = (title) => {
    this.setState({
      modalVisible: true,
      screen: title,
      schedule: {
        startDateTimePickerVisible: false,
        endDateTimePickerVisible: false,
        starttime: 'Start Time',
        endtime: 'End Time',
        day: 'Monday'
      }
    });
  }

  onEditSchedule = (title, scheduleObj) => {
    this.setState({
      modalVisible: true,
      screen: title,
      schedule: scheduleObj
    });
  }

  handleChange = (key, value) => {
    this.setState(prevState => ({
      ...prevState,
      schedule: {
        ...prevState.schedule,
        [key]: value
      }
    }));
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
    return (
      <View style={styles.container}>
        <ScheduleModal 
          modalVisible={this.state.modalVisible}
          onHideModal={() => this.setModalVisible(false)}
          screenTitle={this.state.screen}
          editSchedule={this.state.schedule}
          onChange={(key, value) => this.handleChange(key,value)}
        />
        <ScrollView>
          <View style={styles.centerTitle}>
            <Text style={[styles.title, commonStyles.boldText]}>Complete Your Profile</Text>
          </View>
          
          <UserJourney 
            stage1='#00b16e'
            stage2='#00b16e'
            stage3='#00b16e'
            current='stage3'
          />

          <Form style={[styles.inputWrapper, {marginTop: 30}]}>
            <Label style={[commonStyles.formLabel, styles.labelForm]}>SCHEDULES</Label>
            <TouchableOpacity style={styles.addWorkBtn} onPress={() => this.onAddSchedule('ADD SCHEDULE')}>
              <Text style={[commonStyles.boldText, styles.workText]}>
                + Add Schedule
              </Text>
            </TouchableOpacity>
          </Form>

          <ScheduleTable onEditSchedule={(title, scheduleObj) => this.onEditSchedule(title, scheduleObj)}/>

        </ScrollView>
        <View style={[styles.submitWrapper]}>
          <SubmitBtnWithIcon 
            label="SUBMIT"
            onPress={this.onSubmit}
            disabled={this.state.disableSubmit}
          />
        </View>
      </View>
    )
  }
}

CreateSchedule.propTypes = {
  profileObj: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profileObj: state.completeProfileReducer
});

export default connect(mapStateToProps, { deleteSubject, submitProfile })(CreateSchedule);