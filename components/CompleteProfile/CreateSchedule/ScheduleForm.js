import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Label, Input, Form, Item } from 'native-base';
import styles from '../Stylesheet';
import commonStyles from '../../../common/CommonStyleSheet';
import DateTimePicker from 'react-native-modal-datetime-picker';

class ScheduleForm extends Component {
  state = {
    startDateTimePickerVisible: false,
    endDateTimePickerVisible: false,
    starttime: 'Start Time',
    endtime: 'End Time',
  };

  showStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: true });
  showEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: true });

  hideStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: false });
  hideEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: false });

  handleStartDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.setState({starttime: date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}, function() {
      console.log(this.state)
    });
    this.hideStartDateTimePicker();
  };

  handleEndDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.setState({endtime: date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}, function() {
      console.log(this.state)
    });
    this.hideEndDateTimePicker();
  };

  render() {
    const d = new Date();
    const month = d.getMonth();
    const day = d.getDate();
    const year = d.getFullYear();
    const setStart = new Date(year, month, day, 9, 0);
    const setEnd = new Date(year, month, day, 16, 0);
    return (
      <ScrollView>
        <Form style={styles.inputWrapper}>
          <Label style={[commonStyles.boldText, styles.bigLabel]}>Teaching Day</Label>
          <Item stackedLabel style={{marginLeft: 0}}>
            <Label style={[commonStyles.formLabel, styles.labelForm]}>What day do you want to teach?</Label>
            <Input 
              style={[commonStyles.fontLato, {fontSize: 13}]}
              underlineColorAndroid='transparent'
              
              placeholderTextColor="#b3b3b3"
            />
          </Item>
        </Form>
        <Form style={styles.inputWrapper}>
          <Label style={[commonStyles.boldText, styles.bigLabel]}>Teaching Time</Label>
          <Item stackedLabel style={{marginLeft: 0, borderBottomWidth: 0}}>
            <Label style={[commonStyles.formLabel, styles.labelForm]}>How long do you want to teach?</Label>
            <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
              <View style={[{ width:'40%', }]}>
                <TouchableOpacity onPress={this.showStartDateTimePicker} style={{borderBottomColor: '#eee', borderBottomWidth: 1,}}>
                  <Text style={{padding: 10}}>{this.state.starttime}</Text>
                </TouchableOpacity>
                <DateTimePicker
                  isVisible={this.state.startDateTimePickerVisible}
                  onConfirm={this.handleStartDatePicked}
                  onCancel={this.hideStartDateTimePicker}
                  mode='time'
                  titleIOS='Pick start time'
                  date={setStart}
                />
              </View>
              <View style={{width: '10%', height: 20, alignItems: 'center'}}>
                <Text>TO</Text>
              </View>
              <View style={{ width:'40%'}}>
                <TouchableOpacity onPress={this.showEndDateTimePicker} style={{borderBottomColor: '#eee', borderBottomWidth: 1,}}>
                  <Text style={{padding: 10}}>{this.state.endtime}</Text>
                </TouchableOpacity>
                <DateTimePicker
                  isVisible={this.state.endDateTimePickerVisible}
                  onConfirm={this.handleEndDatePicked}
                  onCancel={this.hideEndDateTimePicker}
                  mode='time'
                  titleIOS='Pick end time'
                  date={setEnd}
                />
              </View>
            </View>
          </Item>
        </Form>

      </ScrollView>
    )
  }
}

export default ScheduleForm;