import React, { Component } from 'react';
import { Text, View, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { H3, Label, Input, Item , Form, Textarea} from 'native-base';
import styles from '../Stylesheet';
import commonStyles from '../../../common/CommonStyleSheet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteSubject } from '../../../modules/actions';
import { submitProfile } from '../../../modules/actions/scheduleProfile';
import UserJourney from '../../../common/UserJourney';
import SubmitBtnWithIcon from '../../../common/SubmitBtnWithIcon';
import ScheduleDays from './ScheduleDays';
import Loader from '../../../common/Loader';
import ScheduleSlot from './ScheduleSlot';
import SlotModal from './SlotModal';

class CreateSchedule extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[commonStyles.textTeacher, {paddingLeft: 20, fontSize: 16}]}>PREV</Text>
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate("SignedIn")}>
          <Text style={[commonStyles.textTeacher, {paddingRight: 20, fontSize: 16}]}>SKIP</Text>  
        </TouchableOpacity>
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
    this.props.navigation.navigate('SignedIn');
    // this.setState({
    //   loading: true
    // });
    // this.props.submitProfile(this.props.profileObj)
    // .then(response => {
    //   // navigate to app Home!!
    //   console.log('response', response);
    //   this.setState({
    //     loading: false
    //   }, () => {
    //     this.props.navigation.navigate('SignedIn');
    //   });
    // })
    // .catch(error => {
    //   console.log('error', error);
    // });
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

  onPressEdit = (day) => {
    this.props.navigation.navigate('SlotModal', {
      dayName: day,
      slotState: this.props.profileObj.schedules[day].slots,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
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
            onEdit={() => this.onPressEdit("Monday")}
            dayName="Monday"
          />
          <ScheduleDays
            onEdit={() => this.onPressEdit("Tuesday")}
            dayName="Tuesday"
          />
          <ScheduleDays
            onEdit={() => this.onPressEdit("Wednesday")}
            dayName="Wednesday"
          />
          <ScheduleDays
            onEdit={() => this.onPressEdit("Thursday")}
            dayName="Thursday"
          />
          <ScheduleDays
            onEdit={() => this.onPressEdit("Friday")}
            dayName="Friday"
          />
          <ScheduleDays
            onEdit={() => this.onPressEdit("Saturday")}
            dayName="Saturday"
          />
          <ScheduleDays
            onEdit={() => this.onPressEdit("Sunday")}
            dayName="Sunday"
          />

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