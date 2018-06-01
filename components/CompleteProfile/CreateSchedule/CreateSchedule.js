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
import UserJourney from '../../../common/UserJourney';
import TextFieldWithLabel from '../../../common/TextFieldWithLabel';
import ScheduleModal from './ScheduleModal';

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
      fname: '',
      lname: '',
      location: '',
      subjects: '',
      summary: '',
      lname: '',
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
    this.props.navigation.navigate('Experience');
  }

  onAddSchedule() {
    this.setState({modalVisible: true});
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
    let subjects = this.props.subjectsObj.subjects.map(subject => (
      <View key={subject.id} style={styles.subjectBtn}>
        <TouchableOpacity onPress={() => this.showDeleteAlert(subject)}>
          <Material 
            name="close"
            backgroundColor="transparent"
            size={15}
            color="#00b16e" 
          />
        </TouchableOpacity>
        <Text style={[commonStyles.fontLato, {color: "#00b16e"}]}>{' ' + subject.title}</Text>
      </View>
    ));

    return (
      <View style={styles.container}>
        <ScheduleModal 
          modalVisible={this.state.modalVisible}
          onHideModal={() => this.setModalVisible(false)}
        />
        <ScrollView>
          <View style={styles.centerTitle}>
            <Text style={[styles.title, commonStyles.boldText]}>Complete Your Profile</Text>
          </View>
          
          <UserJourney 
            stage1='#00b16e'
            stage2='#00b16e'
            stage3='#00b16e'
          />

          <Form style={[styles.inputWrapper, {marginTop: 30}]}>
            <Label style={[commonStyles.formLabel, styles.labelForm]}>SCHEDULES</Label>
            <TouchableOpacity style={styles.addWorkBtn} onPress={this.onAddSchedule}>
              <Text style={[commonStyles.boldText, styles.workText]}>
                + Add Schedule
              </Text>
            </TouchableOpacity>
          </Form>

        </ScrollView>
        <View style={[styles.submitWrapper]}>
          <TouchableOpacity style={styles.submitBtn} onPress={this.onSubmit} disabled={this.state.disableSubmit}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[commonStyles.boldText, styles.submitText]}>
                NEXT {' '}
              </Text>
              <Material 
                name="arrow-forward"
                backgroundColor="transparent"
                size={20}
                color="white" 
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

CreateSchedule.propTypes = {
  subjectsObj: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  subjectsObj: state.completeProfileReducer
});

export default connect(mapStateToProps, { deleteSubject })(CreateSchedule);