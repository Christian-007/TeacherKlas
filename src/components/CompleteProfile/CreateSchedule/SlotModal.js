import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, ScrollView, Alert } from 'react-native';
import { Toast } from 'native-base';
import Material from 'react-native-vector-icons/MaterialIcons';
import commonStyles from '../../../common/CommonStyleSheet';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { addSchedule, removeSchedule } from '../../../modules/actions/scheduleProfile';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';

class SlotModal extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('dayName').toUpperCase(),
      headerRight: (
        <TouchableOpacity onPress={navigation.state.params.handleSave} style={{marginRight: 20}}>
          <Text style={commonStyles.textTeacher}>SAVE</Text>
        </TouchableOpacity>
      )
    }
  };

  state = {
    selectedSlot: [],
    startDateTimePickerVisible: false,
    endDateTimePickerVisible: false,
    selectedTime: 0,
    selectedDateTime: new Date(),
    isAddingSlot: false,
    addSlotTime: null,
    disableSubmit: true,
    bgColor: '#ccc',
  }

  onSave = () => {
    console.log('onSave ', this.state.selectedSlot);
    this.props.addSchedule(this.props.navigation.getParam('dayName'), this.state.selectedSlot);
    this.showToast('Successfully saved time slots!', 'success');
    this.props.navigation.goBack();
  }

  componentWillMount() {
    this.props.navigation.setParams({
      handleSave: this.onSave,
    });
  }

  componentDidMount() {
    console.log('day', this.props.navigation.getParam('dayName'));
    console.log('slots', this.props.navigation.getParam('slotState'));
    
    this.setState({
      selectedSlot: this.props.navigation.getParam('slotState'),
      addSlotTime: null,
      disableSubmit: true,
    })
  }

  momentMinute = (time) => {
    return moment.duration(time+':00').asMinutes();
  }

  momentAddTime = (date) => {
    return moment(date).add(90, 'minutes');
  }

  formatToHourMinute = (time) => {
    return time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }

  showAddSlotTimePicker = () => {
    if (this.state.addSlotTime == null) {
      this.setState({ 
        endDateTimePickerVisible: true,
        selectedDateTime: new Date(),
        isAddingSlot: true,
      })
    } else {
      const time = this.state.addSlotTime;
      const getHour = moment.duration(time.startMinutes, 'minutes').get('hours');
      const getMinutes = moment.duration(time.startMinutes, 'minutes').get('minutes');
      const dateFormat = new Date(moment().get('year'), moment().get('month'), moment().get('date'), getHour, getMinutes);
      this.setState({ 
        endDateTimePickerVisible: true,
        selectedDateTime: dateFormat,
        isAddingSlot: true,
      })
    }
  };

  showEndDateTimePicker = (index) => {
    const time = this.state.selectedSlot[index];
    const getHour = moment.duration(time.startMinutes, 'minutes').get('hours');
    const getMinutes = moment.duration(time.startMinutes, 'minutes').get('minutes');
    const dateFormat = new Date(moment().get('year'), moment().get('month'), moment().get('date'), getHour, getMinutes);
    this.setState({ 
      endDateTimePickerVisible: true,
      selectedTime: index,
      selectedDateTime: dateFormat
    });
  }

  hideEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: false, isAddingSlot: false });

  handleEndDatePicked = (date) => {
    const endTime = this.momentAddTime(date);
    console.log('A date has been picked: ', date);
    if (this.state.isAddingSlot) {
      this.changeAddSlotTime(this.formatToHourMinute(date), this.formatToHourMinute(endTime._d));
    } else {
      this.changeTime(this.state.selectedTime, this.formatToHourMinute(date), this.formatToHourMinute(endTime._d));
    }
    this.hideEndDateTimePicker();
  };

  validateSlots = (time = null) => {
    let newStartMin, newEndMin;

    if (time == null) {
      newStartMin = this.state.addSlotTime.startMinutes;
      newEndMin = this.state.addSlotTime.endMinutes;
    } else {
      newStartMin = time.startMinutes;
      newEndMin = time.endMinutes;
    }

    return (slot, index, array) => {
      if (newEndMin <= slot.startMinutes-30) {
        if (index === 0) {
          return true;
        } else {
          if (newStartMin >= array[index-1].endMinutes+30) {
            return true;
          }
        }
      } else {
        if (index === array.length-1 && newStartMin >= slot.endMinutes+30) {
          return true;
        }
        return false;
      }
    }

    
  }

  addSlot = () => {
    const slotTimes = this.state.selectedSlot;
    let isValidSlot = slotTimes.some(this.validateSlots());

    if (slotTimes.length === 0 || isValidSlot) {
      this.showToast('Successfully added time slot!', 'success');
      this.setState(prevState => ({
        selectedSlot: [
          ...prevState.selectedSlot,
          this.state.addSlotTime
        ],
        addSlotTime: null,
        disableSubmit: true,
      }), () => {
        console.log(this.state);
      });
    } else {
      console.log('INVALID ADD TIME SLOT');
      this.showErrorAlert();
    }
  }

  deleteSlot = (scheduleId) => {
    this.setState(prevState => ({
      selectedSlot: prevState.selectedSlot.filter((slot, index) => index !== scheduleId),
    }), () => {
      console.log(this.state);
    });
    this.showToast('Deleted a time slot!', 'danger');
  }

  changeAddSlotTime = (startTime, endTime) => {
    const newTime = {
      starttime: startTime, 
      endtime: endTime, 
      startMinutes: this.momentMinute(startTime),
      endMinutes: this.momentMinute(endTime),
    };

    this.setState({ addSlotTime: newTime, disableSubmit: false });
  }
  
  changeTime = (selectedIndex, startTime, endTime) => {
    const newTime = {
      starttime: startTime, 
      endtime: endTime, 
      startMinutes: this.momentMinute(startTime),
      endMinutes: this.momentMinute(endTime),
    };

    // Filter the slot times to NOT INCLUDE the SELECTED TIME SLOT
    const slotTimes = this.state.selectedSlot.filter((slot, index) => index !== selectedIndex);
    let isValidSlot = slotTimes.some(this.validateSlots(newTime));

    if (slotTimes.length === 0 || isValidSlot) {
      this.setState(prevState => ({
        ...prevState,
        selectedSlot: prevState.selectedSlot.map((slot, index) => {
          // not the object to be updated
          if(index !== selectedIndex) {
            return slot;
          }

          // update object
          return {
            ...slot,
            ...newTime
          };   
        })
      }));
      this.showToast('Successfully changed a time slot!', 'success');
    } else {
      console.log('INVALID CHANGE TIME SLOT');
      this.showErrorAlert();
    }  
    console.log('state', this.state);
  }

  showErrorAlert = () => {
    Alert.alert(
      'Error: Added Time Clash',
      'The added time slot clashes with another time slot. Ensure that there is at least 30min difference between previous and next time slots.',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    );
  }

  showToast = (message, toastType) => {
    Toast.show({
      text: message,
      type: toastType,
      buttonText: "Okay",
    });
  }

  renderAddSlot = () => {
    const disableSubmit = this.state.disableSubmit;
    return (
      <View style={{paddingTop: 15, paddingLeft: 15, paddingRight: 15}}>
        <View style={modalStyle.addSlotCard}>
          <View style={modalStyle.leftCol}>
            <Text style={[commonStyles.boldText, {fontSize: 12, color: '#00b16e'}]}>ADD SLOT</Text>
            <View style={modalStyle.slotWrapper}>
              <TouchableOpacity onPress={() => this.showAddSlotTimePicker()}>
              <Text style={[commonStyles.fontLato, {backgroundColor: '#fff', padding: 10, borderWidth: 1, borderColor: '#ccc', fontSize: 12}]}>
                {this.state.addSlotTime === null ? 'Start time' : this.state.addSlotTime.starttime}
              </Text>
              </TouchableOpacity>
              <Ionicon 
                name="ios-arrow-round-forward-outline"
                size={30} 
                color="#00b16e" 
                style={{marginLeft: 10, marginRight: 10}}
              />
              <Text style={[commonStyles.fontLato, {fontSize: 12}]}>
                {this.state.addSlotTime === null ? 'End time' : this.state.addSlotTime.endtime}
              </Text>
            </View>
          </View> 
          <View style={modalStyle.rightCol}>
            <TouchableOpacity 
              onPress={this.addSlot}
              disabled={disableSubmit}
              style={{backgroundColor: disableSubmit ? this.state.bgColor : '#00b16e', borderRadius: 4, paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5}}
            >
              <Text style={{color: '#fff'}}>+ Add</Text>
            </TouchableOpacity>
          </View> 
        </View>
      </View>
    )
  }

  renderSlots = (item) => {
    return (
      <View style={modalStyle.daysCard}>
        <View style={modalStyle.leftCol}>
          <View style={modalStyle.slotStyle}>
            <Text style={[commonStyles.boldText, {fontSize: 10}]}>SLOT {item.index+1}</Text>
          </View>
          <View style={modalStyle.slotWrapper}>
            <TouchableOpacity onPress={() => this.showEndDateTimePicker(item.index)}>
              <Text style={[commonStyles.fontLato, {backgroundColor: '#fff', padding: 10, borderWidth: 1, borderColor: '#ccc'}]}>{item.item.starttime}</Text>
            </TouchableOpacity>
            <Ionicon 
              name="ios-arrow-round-forward-outline"
              size={30} 
              color="#00b16e" 
              style={{marginLeft: 10, marginRight: 10}}
            />
            <Text style={commonStyles.fontLato}>{item.item.endtime}</Text>
          </View>
        </View> 
        <View style={modalStyle.rightCol}>
          <TouchableOpacity 
            onPress={() => this.deleteSlot(item.index)}
            style={{marginTop: 10, flexDirection: 'row', alignItems: 'center'}}
          >
            <Material 
              name="delete"
              backgroundColor="transparent"
              size={15}
              color="#f2453d" 
            />
            <Text style={{color: '#f2453d'}}>Delete</Text>
          </TouchableOpacity>
        </View> 
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
      <ScrollView>
        {this.renderAddSlot()}
        <DateTimePicker
          isVisible={this.state.endDateTimePickerVisible}
          onConfirm={this.handleEndDatePicked}
          onCancel={this.hideEndDateTimePicker}
          mode='time'
          titleIOS='Pick end time'
          date={this.state.selectedDateTime}
        />
        <Text style={[commonStyles.boldText, {margin: 20, letterSpacing: 1}]}>TIME SLOT</Text>
        { 
          this.state.selectedSlot.length === 0 ?
          (
            <View style={{paddingLeft: 15, paddingRight: 15}}>
              <Text style={[commonStyles.boldText, {borderWidth: 1, textAlign: 'center', padding: 15, color: '#d3d3d3', borderColor: '#d3d3d3', backgroundColor: '#fafafa', borderRadius: 4, borderStyle: 'dashed',}]}>
                No time slot yet.
              </Text>
            </View>
          ) 
          :
          (
            <FlatList
              extraData={this.state}
              data={this.state.selectedSlot.sort((a,b) => a.startMinutes - b.startMinutes)}
              renderItem={(item) => this.renderSlots(item)}
              keyExtractor={(item, index) => index.toString()}
            />
          )
        }
        </ScrollView>
      </View>
    )
  }
}

const modalStyle = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3',
    marginTop: 20,
    padding: 13,
  },
  tableWrapper: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderColor: '#eee',
  },
  titleStyle: {
    fontFamily: 'Lato-Regular',
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 3,
    color: '#7a7a7a',
  },
  prev: {
    fontFamily: 'Lato-Regular',
    fontWeight: '800',
    fontSize: 12,
    letterSpacing: 1,
    color: '#00b16e',
  },
  addSlotCard: {
    backgroundColor: '#fafafa',
    padding: 20,
    flexDirection: 'row',
    borderLeftWidth: 3, borderLeftColor: '#00b16e'
  },
  daysCard: {
    backgroundColor: '#fafafa',
    padding: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  leftCol: {
    flex: 1,
    justifyContent:'flex-start',
    alignItems: 'flex-start'
  },
  slotWrapper: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center'
  },
  rightCol: {
    flex: 1,
    justifyContent:'flex-start',
    alignItems: 'flex-end'
  },
  slotStyle: {
    backgroundColor: '#f2f5f7',
    marginRight: 10,
    padding: 7,
    justifyContent: 'center'
  }
});

export default connect(null, { addSchedule, removeSchedule })(SlotModal);