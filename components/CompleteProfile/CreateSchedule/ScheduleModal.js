import React, { Component } from 'react';
import { Text, View, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../Stylesheet';
import Material from 'react-native-vector-icons/MaterialIcons';
import commonStyles from '../../../common/CommonStyleSheet';
import ScheduleForm from './ScheduleForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSchedule } from '../../../actions/scheduleProfile';

class ScheduleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDateTimePickerVisible: false,
      endDateTimePickerVisible: false,
      starttime: 'Start Time',
      endtime: 'End Time',
      day: 'Monday'
    };
    this.handleChange = this.handleChange.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  handleChange(key, value) {
    this.setState({
      [key]: value
    });
  }

  onConfirm() {
    this.props.createSchedule(this.state);
    this.props.onHideModal();
  }
  
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.modalVisible}
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
          <Text style={modalStyle.titleStyle}>ADD SCHEDULE</Text>
          <View style={{flex: 1, flexDirection: 'row',justifyContent: 'flex-end',}}>
            <TouchableOpacity onPress={this.onConfirm}>
              <Text style={modalStyle.prev}>CONFIRM</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScheduleForm onChange={this.handleChange} currentState={this.state} />
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
    fontSize: 12,
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
});

ScheduleModal.propTypes = {
  profileObj: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profileObj: state.completeProfileReducer
});

export default connect(mapStateToProps, { createSchedule })(ScheduleModal);