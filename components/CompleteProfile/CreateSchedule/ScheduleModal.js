import React, { Component } from 'react';
import { Text, View, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../Stylesheet';
import commonStyles from '../../../common/CommonStyleSheet';
import ScheduleForm from './ScheduleForm';

class ScheduleModal extends Component {
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
          <TouchableOpacity onPress={this.props.onHideModal}>
            <Text style={modalStyle.prev}>CANCEL</Text>
          </TouchableOpacity>
          <Text style={modalStyle.titleStyle}>ADD SCHEDULE</Text>
          <TouchableOpacity onPress={this.props.onHideModal}>
            <Text style={modalStyle.prev}>CONFIRM</Text>
          </TouchableOpacity>
        </View>
        <ScheduleForm />
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
    marginTop: 30,
    padding: 15,
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

export default ScheduleModal;