import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Label, Input, Form, Item, Picker } from 'native-base';
import styles from '../Stylesheet';
import commonStyles from '../../../common/CommonStyleSheet';
import DateTimePicker from 'react-native-modal-datetime-picker';

class ScheduleForm extends Component {

  onValueChange = (key, value) => {
    this.props.onChange(key, value);
  }

  showStartDateTimePicker = () => this.onValueChange('startDateTimePickerVisible', true );
  showEndDateTimePicker = () => this.onValueChange('endDateTimePickerVisible', true );

  hideStartDateTimePicker = () => this.onValueChange('startDateTimePickerVisible', false );
  hideEndDateTimePicker = () => this.onValueChange('endDateTimePickerVisible', false );

  handleStartDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.onValueChange('starttime', date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    this.hideStartDateTimePicker();
  };

  handleEndDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.onValueChange('endtime', date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
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
          <Label style={[commonStyles.boldText, styles.bigLabel, {marginBottom: 10}]}>Teaching Day</Label>
          <Label style={[commonStyles.formLabel, styles.labelForm]}>What day do you want to teach?</Label>
          <Picker 
            iosHeader="Select day"
            mode="dropdown"
            selectedValue={this.props.currentState.day}
            onValueChange={(day) => this.onValueChange('day', day)}
            style={{borderBottomWidth: 0.5, borderColor: '#D9D5Dc', alignSelf: 'stretch', paddingTop: 0, paddingBottom: 0, height: 35}}
            textStyle={[commonStyles.fontLato, {fontSize: 12, paddingLeft: 0}]}
          >
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
            <Picker.Item label="Sunday" value="Sunday" />
          </Picker>
        </Form>
        <Form style={styles.inputWrapper}>
          <Label style={[commonStyles.boldText, styles.bigLabel]}>Teaching Time</Label>
          <Item stackedLabel style={{marginLeft: 0, borderBottomWidth: 0}}>
            <Label style={[commonStyles.formLabel, styles.labelForm]}>How long do you want to teach?</Label>
            <View style={{marginTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
              <View style={[{ width:'40%', }]}>
                <TouchableOpacity onPress={this.showStartDateTimePicker} style={{borderBottomColor: '#eee', borderBottomWidth: 1,}}>
                  <Text style={styles.textLabel}>{this.props.currentState.starttime}</Text>
                </TouchableOpacity>
                <DateTimePicker
                  isVisible={this.props.currentState.startDateTimePickerVisible}
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
                <Text style={styles.textLabel}>{this.props.currentState.endtime}</Text>
                </TouchableOpacity>
                <DateTimePicker
                  isVisible={this.props.currentState.endDateTimePickerVisible}
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