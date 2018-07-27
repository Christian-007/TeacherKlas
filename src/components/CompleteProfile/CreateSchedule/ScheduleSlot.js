import React, { Component } from 'react';
import { Text, View, Modal, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Material from 'react-native-vector-icons/MaterialIcons';
import commonStyles from '../../../common/CommonStyleSheet';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { addSchedule } from '../../../modules/actions/scheduleProfile';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';

class ScheduleSlot extends Component {
  state = {
    selectedSlot: [],
    startDateTimePickerVisible: false,
    endDateTimePickerVisible: false,
    selectedTime: 0,
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

  showStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: true });
  showEndDateTimePicker = (index) => {
    this.setState({ 
      endDateTimePickerVisible: true,
      selectedTime: index
    });
  }

  hideStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: false });
  hideEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: false });

  handleStartDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    // this.onValueChange('starttime', date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    this.hideStartDateTimePicker();
  };

  handleEndDatePicked = (date) => {
    const endTime = this.momentAddTime(date);
    console.log('A date has been picked: ', date);
    this.changeTime(this.state.selectedTime, this.formatToHourMinute(date), this.formatToHourMinute(endTime._d));
    this.hideEndDateTimePicker();
  };

  addSlot = () => {
    this.setState(prevState => ({
      selectedSlot: [
        ...prevState.selectedSlot,
        {starttime: "15.00", endtime: "16.30", minutes: 900}
      ]
    }));
  }

  onConfirm = () => {
    console.log('onConfirm ', this.state.selectedSlot);
    this.props.addSchedule(this.props.dayName, this.state.selectedSlot);
    this.props.onHideModal();
  }

  showModal = () => {
    console.log('object', this.props.slotState);
    this.setState({
      selectedSlot: this.props.slotState,
    })
  }
  
  changeTime = (selectedIndex, startTime, endTime) => {
    const newTime = {
      starttime: startTime, 
      endtime: endTime, 
      minutes: this.momentMinute(startTime),
      endMinutes: this.momentMinute(endTime),
    };

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
    console.log('state', this.state);
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
            onPress={this.props.onEdit}
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
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.modalVisible}
        onShow={this.showModal}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <View style={modalStyle.headerBar}>
          <View style={{flex: 1, flexDirection: 'row',justifyContent: 'flex-start',}}>
            <TouchableOpacity onPress={this.props.onHideModal}>
              <Material 
                name="close"
                backgroundColor="transparent"
                size={20}
                color="#828282" 
              />
            </TouchableOpacity>
          </View>
          <Text style={modalStyle.titleStyle}>{this.props.dayName.toUpperCase()}</Text>
          <View style={{flex: 1, flexDirection: 'row',justifyContent: 'flex-end',}}>
            <TouchableOpacity onPress={this.onConfirm}>
              <Text style={modalStyle.prev}>CONFIRM</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={[modalStyle.daysCard, {backgroundColor: '#fff'}]} onPress={this.addSlot}>
          <Text style={[commonStyles.boldText, {letterSpacing: 1, color: '#00b16e', fontSize: 12}]}>+ ADD SLOT</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.endDateTimePickerVisible}
          onConfirm={this.handleEndDatePicked}
          onCancel={this.hideEndDateTimePicker}
          mode='time'
          titleIOS='Pick end time'
          date={new Date()}
        />
        <FlatList
          extraData={this.state}
          data={this.state.selectedSlot.sort((a,b) => a.minutes - b.minutes)}
          renderItem={(item) => this.renderSlots(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </Modal>
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

export default connect(null, { addSchedule })(ScheduleSlot);