import React, { Component } from 'react';
import { Text, View, Button, ScrollView, TextInput, TouchableOpacity, Modal, TouchableHighlight, Alert } from 'react-native';
import { H3, Label, Input, Item , Form, Textarea} from 'native-base';
import styles from '../Stylesheet';
import commonStyles from '../../../common/CommonStyleSheet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteSubject } from '../../../modules/actions';
import { submitProfile } from '../../../modules/actions/scheduleProfile';
import UserJourney from '../../../common/UserJourney';
import SubmitBtnWithIcon from '../../../common/SubmitBtnWithIcon';
import ScheduleModal from './ScheduleModal';
import ScheduleTable from './ScheduleTable';
import ScheduleDays from './ScheduleDays';
import ScheduleSlot from './ScheduleSlot';

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
      selectedDay: {
        dayName: ''
      },
      schedules: {
        Monday: [{
          starttime: '09.00',
          endtime: '10.30',
        },
        {
          starttime: '11.00',
          endtime: '12.30',
        }],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: []
      },
      selectedSchedule: [],
      disableSubmit: false,
      loading: false,
      modalVisible: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onAddSchedule = this.onAddSchedule.bind(this);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  onSubmit() {
    console.log('User data: ', this.props.profileObj);
    this.props.submitProfile(this.props.profileObj)
    .then(response => {
      // navigate to app Home!!
      console.log('response', response);
    })
    .catch(error => {
      console.log('error', error);
    });
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

  onEdit = (day) => {
    this.setState({
      modalVisible: true,
      selectedDay: {
        dayName: day
      },
      selectedSchedule: this.props.profileObj.schedules[day],
    });
  }

  onAddSlot(dayName) {
    console.log('number', dayName);
    this.setState(prevState => ({
      ...prevState,
      schedules: {
        ...prevState.schedules,
        [dayName]: [
          ...prevState.schedules[dayName],
          {
            starttime: "13.00",
            endtime: "14.30"
          }
        ]
      }
    }));
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <ScheduleModal 
          modalVisible={this.state.modalVisible}
          onHideModal={() => this.setModalVisible(false)}
          screenTitle={this.state.screen}
          editSchedule={this.state.schedule}
          onChange={(key, value) => this.handleChange(key,value)}
        /> */}
        <ScheduleSlot 
          modalVisible={this.state.modalVisible}
          onHideModal={() => this.setModalVisible(false)}
          dayName={this.state.selectedDay.dayName}
          slotState={this.state.selectedSchedule}
          onChange={(key, value) => this.handleChange(key,value)}
          onAddSlot={(dayName) => this.onAddSlot(dayName)}
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
          </Form>
          <ScheduleDays
            onEdit={() => this.onEdit("Monday")}
            dayName="Monday"
            slotState={this.state.schedules["Monday"]}
          />
          <ScheduleDays
            onEdit={() => this.onEdit("Tuesday")}
            dayName="Tuesday"
            slotState={this.state.schedules["Tuesday"]}
          />
          <ScheduleDays
            onEdit={() => this.onEdit("Wednesday")}
            dayName="Wednesday"
            slotState={this.state.schedules["Wednesday"]}
          />
          <ScheduleDays
            onEdit={() => this.onEdit("Thursday")}
            dayName="Thursday"
            slotState={this.state.schedules["Thursday"]}
          />
          <ScheduleDays
            onEdit={() => this.onEdit("Friday")}
            dayName="Friday"
            slotState={this.state.schedules["Friday"]}
          />
          <ScheduleDays
            onEdit={() => this.onEdit("Saturday")}
            dayName="Saturday"
            slotState={this.state.schedules["Saturday"]}
          />
          <ScheduleDays
            onEdit={() => this.onEdit("Sunday")}
            dayName="Sunday"
            slotState={this.state.schedules["Sunday"]}
          />
          {/* <Form style={[styles.inputWrapper, {marginTop: 30}]}>
            <Label style={[commonStyles.formLabel, styles.labelForm]}>SCHEDULES</Label>
            <TouchableOpacity style={styles.addWorkBtn} onPress={() => this.onAddSchedule('ADD SCHEDULE')}>
              <Text style={[commonStyles.boldText, styles.workText]}>
                + Add Schedule
              </Text>
            </TouchableOpacity>
          </Form>

          <ScheduleTable onEditSchedule={(title, scheduleObj) => this.onEditSchedule(title, scheduleObj)}/> */}

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

export default connect(mapStateToProps, { submitProfile })(CreateSchedule);