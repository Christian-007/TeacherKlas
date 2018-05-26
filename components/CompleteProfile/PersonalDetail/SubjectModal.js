import React, { Component } from 'react';
import { Text, View, Modal, TouchableHighlight } from 'react-native';

class SubjectModal extends Component {
  state = {
    modalVisible: this.props.modalStatus,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.modalStatus}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <View style={{marginTop: 22}}>
          <View>
            <Text>Hello World!</Text>

            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(false);
              }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    )
  }
}

export default SubjectModal;