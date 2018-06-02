import React, { Component } from 'react';
import { Text, View, Button, ScrollView, TextInput, TouchableOpacity, Modal, TouchableHighlight, Alert } from 'react-native';
import { H3, Label, Input, Item , Form, Textarea} from 'native-base';
import Ionic from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import styles from '../Stylesheet';
import commonStyles from '../../../common/CommonStyleSheet';
import { scale } from 'react-native-size-matters';
import SubjectModal from './SubjectModal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteSubject } from '../../../actions';
import UserJourney from '../../../common/UserJourney';
import TextFieldWithLabel from '../../../common/TextFieldWithLabel';
import SubmitBtnWithIcon from '../../../common/SubmitBtnWithIcon';

class PersonalDetail extends Component {
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
    this.onAddSubject = this.onAddSubject.bind(this);
    this.deleteSubject = this.deleteSubject.bind(this);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  onSubmit() {
    this.props.navigation.navigate('Experience');
  }

  onAddSubject() {
    // this.setModalVisible(true);
    this.props.navigation.navigate('SubjectModal');
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
        <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}>
            <View style={{marginTop: 22}}>
              <View>
                <Text>Hello World!</Text>

                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text>Hide Modal</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        <ScrollView>
          <View style={styles.centerTitle}>
            <Text style={[styles.title, commonStyles.boldText]}>Complete Your Profile</Text>
          </View>
          
          <UserJourney 
            stage1='#00b16e'
            stage2='#cdccd8'
            stage3='#cdccd8'
          />

          <Form style={[styles.formWrapper]}>
            <Item stackedLabel style={{marginLeft: 0, width: '47%'}}>
              <Label style={[commonStyles.formLabel, {letterSpacing: 2, color: '#b3b3b3', fontSize: 12}]}>FIRST NAME</Label>
              <Input 
                style={[commonStyles.fontLato, {fontSize: 13}]}
                underlineColorAndroid='transparent'
                onChangeText={(fname) => this.setState({fname})}
                value={this.state.fname}
              />
            </Item>
            <Item stackedLabel style={{marginLeft: 0, width: '47%'}}>
              <Label style={[commonStyles.formLabel, {letterSpacing: 2, color: '#b3b3b3', fontSize: 12}]}>LAST NAME</Label>
              <Input 
                style={[commonStyles.fontLato, {fontSize: 13}]}
                underlineColorAndroid='transparent'
                onChangeText={(lname) => this.setState({lname})}
                value={this.state.lname}
              />
            </Item>
          </Form>

          <TextFieldWithLabel 
            onChangeText={(location) => this.setState({location})}
            value={this.state.location}
            placeholder=""
            label="LOCATION"
            formStyles={styles.inputWrapper}
          />

          <Form style={styles.inputWrapper}>
            <Label style={[commonStyles.formLabel, {letterSpacing: 2, color: '#b3b3b3', fontSize: 12}]}>SUBJECTS</Label>
            <View style={{flexDirection: 'row', marginTop: 10, flexWrap: 'wrap'}}>
              {subjects}
              <TouchableOpacity style={styles.addSubject} onPress={this.onAddSubject} disabled={this.state.disableSubmit}>
                <Text style={[styles.subjectText, commonStyles.fontLato]}>
                  + ADD
                </Text>
              </TouchableOpacity>
            </View>
          </Form>

          <Form style={styles.inputWrapper}>
            <Label style={[commonStyles.formLabel, {letterSpacing: 2, color: '#b3b3b3', fontSize: 12}]}>PROFILE SUMMARY</Label>
            <Textarea 
              rowSpan={5}
              bordered
              placeholder="Add some description for your profile"
              placeholderTextColor="#b3b3b3"
              style={[commonStyles.fontLato, styles.summaryTextarea]}
            />
          </Form>

        </ScrollView>
        <View style={[styles.submitWrapper]}>
          <SubmitBtnWithIcon 
            label="NEXT"
            onPress={this.onSubmit}
            disabled={this.state.disableSubmit}
          />
        </View>
      </View>
    )
  }
}

PersonalDetail.propTypes = {
  subjectsObj: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  subjectsObj: state.completeProfileReducer
});

export default connect(mapStateToProps, { deleteSubject })(PersonalDetail);