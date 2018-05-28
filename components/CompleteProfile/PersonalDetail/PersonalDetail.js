import React, { Component } from 'react';
import { Text, View, Button, ScrollView, TextInput, TouchableOpacity, Modal, TouchableHighlight, Alert } from 'react-native';
import { H3, Label, Input, Item , Form, Textarea} from 'native-base';
import Ionic from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import styles from './Stylesheet';
import commonStyles from '../../../common/CommonStyleSheet';
import { scale } from 'react-native-size-matters';
import SubjectModal from './SubjectModal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteSubject } from '../../../actions';

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
    let subjects = this.props.subjectsObj.map(subject => (
      <View key={subject.id} style={styles.subjectBtn}>
        <TouchableOpacity onPress={() => this.showDeleteAlert(subject)}>
          <Material 
            name="close"
            backgroundColor="transparent"
            size={15}
            color="white" 
          />
        </TouchableOpacity>
        <Text style={[commonStyles.fontLato, {color: "white"}]}>{' ' + subject.title}</Text>
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
          
          <View style={styles.journey}>
            <View style={{alignItems: 'center', justifyContent:'center', width: 60, zIndex: 2}}>
              <View style={{backgroundColor: 'white'}}>
                <Ionic name="ios-checkmark-circle-outline" size={25} color={'#00b16e'} />
              </View>
              <Text style={[commonStyles.boldText, {fontSize: 8, color: '#00b16e', marginTop: 5, letterSpacing: 1}]}>PERSONAL</Text>
            </View>
            <View style={{alignItems: 'center', justifyContent:'center', width: 60, marginLeft: scale(50), marginRight: scale(50), zIndex: 2}}>
              <View style={{backgroundColor: 'white'}}>
                <Ionic name="ios-checkmark-circle-outline" size={25} color={'#cdccd8'} />
              </View>
              <Text style={[commonStyles.boldText, {fontSize: 8, color: '#cdccd8', marginTop: 5, letterSpacing: 1}]}>EXPERIENCE</Text>
            </View>
            <View style={{alignItems: 'center', justifyContent:'center', width: 60, zIndex: 2}}>
              <View style={{backgroundColor: 'white'}}>
                <Ionic name="ios-checkmark-circle-outline" size={25} color={'#cdccd8'} />
              </View>
              <Text style={[commonStyles.boldText, {fontSize: 8, color: '#cdccd8', marginTop: 5, letterSpacing: 1}]}>SCHEDULE</Text>
            </View>
            <View style={{position: 'absolute', left:85, top:12, zIndex: 0, flexDirection:'row', }}>
              <View style={[styles.hr, {backgroundColor: '#cdccd8'}]}></View>
              <View style={[styles.hr, {marginLeft: 15}]}></View>
            </View>
          </View>

          <Form style={[styles.formWrapper]}>
            <Item stackedLabel style={{marginLeft: 0, width: '47%'}}>
              <Label style={[commonStyles.boldText, {letterSpacing: 2, color: '#b3b3b3'}]}>First Name</Label>
              <Input 
                style={[commonStyles.fontLato, {fontSize: 13}]}
                underlineColorAndroid='transparent'
                onChangeText={(fname) => this.setState({fname})}
                value={this.state.fname}
              />
            </Item>
            <Item stackedLabel style={{marginLeft: 0, width: '47%'}}>
              <Label style={[commonStyles.boldText, {letterSpacing: 2, color: '#b3b3b3'}]}>Last Name</Label>
              <Input 
                style={[commonStyles.fontLato, {fontSize: 13}]}
                underlineColorAndroid='transparent'
                onChangeText={(lname) => this.setState({lname})}
                value={this.state.lname}
              />
            </Item>
          </Form>

          <Form style={styles.inputWrapper}>
            <Item stackedLabel style={{marginLeft: 0}}>
              <Label style={[commonStyles.boldText, {letterSpacing: 2, color: '#b3b3b3'}]}>Location</Label>
              <Input 
                style={[commonStyles.fontLato, {fontSize: 13}]}
                underlineColorAndroid='transparent'
                onChangeText={(location) => this.setState({location})}
                value={this.state.location}
              />
            </Item>
          </Form>

          <Form style={styles.inputWrapper}>
            <Label style={[commonStyles.boldText, {letterSpacing: 2, color: '#b3b3b3', fontSize: 15}]}>Subjects</Label>
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
            <Label style={[commonStyles.boldText, {letterSpacing: 2, color: '#b3b3b3', fontSize: 15}]}>Profile Summary</Label>
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
          <TouchableOpacity style={styles.submitBtn} onPress={this.onSubmit} disabled={this.state.disableSubmit}>
            <Text style={[commonStyles.boldText, styles.submitText]}>
              SUBMIT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

PersonalDetail.propTypes = {
  subjectsObj: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  subjectsObj: state.completeProfileReducer
});

export default connect(mapStateToProps, { deleteSubject })(PersonalDetail);