import React, { Component } from 'react';
import { Text, View, Button, ScrollView, TextInput, TouchableOpacity, Modal, TouchableHighlight } from 'react-native';
import { H3, Label, Input, Item , Form, Textarea} from 'native-base';
import Ionic from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import styles from './Stylesheet';
import commonStyles from '../../../common/CommonStyleSheet';
import { scale } from 'react-native-size-matters';
import SubjectModal from './SubjectModal';

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
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  onSubmit() {

  }

  onAddSubject() {
    this.setModalVisible(true);
  }

  render() {

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
            <View style={{position: 'absolute', left:85, top:15, zIndex: 0, flexDirection:'row', }}>
              <View style={[styles.hr, {backgroundColor: '#cdccd8'}]}></View>
              <View style={[styles.hr, {marginLeft: 15}]}></View>
            </View>
          </View>

          <Form style={[styles.formWrapper]}>
            <Item stackedLabel style={{marginLeft: 0, width: '47%'}}>
              <Label style={[commonStyles.fontLato, {letterSpacing: 2, color: '#b3b3b3'}]}>First Name</Label>
              <Input 
                style={[commonStyles.fontLato, {fontSize: 13}]}
                underlineColorAndroid='transparent'
                onChangeText={(fname) => this.setState({fname})}
                value={this.state.fname}
              />
            </Item>
            <Item stackedLabel style={{marginLeft: 0, width: '47%'}}>
              <Label style={[commonStyles.fontLato, {letterSpacing: 2, color: '#b3b3b3'}]}>Last Name</Label>
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
              <Label style={[commonStyles.fontLato, {letterSpacing: 2, color: '#b3b3b3'}]}>Location</Label>
              <Input 
                style={[commonStyles.fontLato, {fontSize: 13}]}
                underlineColorAndroid='transparent'
                onChangeText={(location) => this.setState({location})}
                value={this.state.location}
              />
            </Item>
          </Form>

          <Form style={styles.inputWrapper}>
            <Label style={[commonStyles.fontLato, {letterSpacing: 2, color: '#b3b3b3', fontSize: 15}]}>Subjects</Label>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <TouchableOpacity style={styles.addSubject} onPress={this.onAddSubject} disabled={this.state.disableSubmit}>
                <Text style={[styles.subjectText, commonStyles.fontLato]}>
                  + ADD
                </Text>
              </TouchableOpacity>
            </View>
          </Form>

          <Form style={styles.inputWrapper}>
            <Label style={[commonStyles.fontLato, {letterSpacing: 2, color: '#b3b3b3', fontSize: 15}]}>Profile Summary</Label>
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

export default PersonalDetail;