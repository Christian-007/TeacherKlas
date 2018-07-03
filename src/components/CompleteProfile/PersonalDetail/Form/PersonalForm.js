import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Alert, Button } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Label, Form, Textarea } from 'native-base';
import Material from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../Stylesheet';
import InputWithLabel from './InputWithLabel';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteSubject } from '../../../../modules/actions';
import { uploadImage } from '../../../../modules/actions/personalDetail';
import commonStyles from '../../../../common/CommonStyleSheet';

class PersonalForm extends Component {
  constructor(props) {
    super(props);
    this.deleteSubject = this.deleteSubject.bind(this);
  }

  chooseImage = () => {
    let options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        let source = { uri: response.uri };
    
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        this.props.onChangeInput('avatarSource', response);
        this.props.onChangeInput('isUploaded', true);
        console.log('avatarSource: ', source);

        // UPLOAD IMAGE TO FIREBASE
        this.props.uploadImage(response);
      }
    });
  }

  deleteSubject(subjectId) {
    console.log('delete subject: ', subjectId);
    this.props.deleteSubject(subjectId);
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

  getSubjects = () => {
    return this.props.profileObj.subjects.map(subject => (
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
  }
  
  render() {
    let subjects = this.getSubjects();

    return (
      <View>
        <Form style={[styles.inputWrapper, {alignItems: 'center'}]}>
          <View style={{marginTop: 10}}>
            { this.props.currentState.isUploaded ? 
              <Image source={{uri: this.props.currentState.avatarSource.uri}} style={localStyles.uploadAvatar}/>
              :
              (<View style={[localStyles.uploadAvatar, localStyles.defaultPic]}>
                <Ionicons 
                  name="md-person"
                  size={50}
                  color='white'
                />
              </View>)
            }
            <TouchableOpacity onPress={this.chooseImage} style={localStyles.cameraBtn}>
              <Material 
                name="photo-camera"
                size={20}
                color="white" 
              />
            </TouchableOpacity>
          </View>
        </Form>

        <Form style={styles.formWrapper}>
          <InputWithLabel
            itemStyle={{marginLeft: 0, width: '47%'}}
            labelText="FIRST NAME"
            onChangeText={(fname) => this.props.onChangeInput('fname', fname)}
            value={this.props.currentState.fname}
            error={this.props.currentState.errors.fname}
          />
          <InputWithLabel
            itemStyle={{marginLeft: 0, width: '47%'}}
            labelText="LAST NAME"
            onChangeText={(lname) => this.props.onChangeInput('lname', lname)}
            value={this.props.currentState.lname}
            error={this.props.currentState.errors.lname}
          />
        </Form>
        
        <Form style={styles.inputWrapper}>
          <InputWithLabel 
            onChangeText={(location) => this.props.onChangeInput('location', location)}
            value={this.props.currentState.location}
            error={this.props.currentState.errors.location}
            labelText="LOCATION"
          />
        </Form>

        <Form style={styles.inputWrapper}>
          <Label style={[commonStyles.formLabel, {letterSpacing: 2, color: '#b3b3b3', fontSize: 12}]}>SUBJECTS</Label>
          <View style={{flexDirection: 'row', marginTop: 10, flexWrap: 'wrap'}}>
            {subjects}
            <TouchableOpacity style={styles.addSubject} onPress={this.props.onAddSubject} disabled={this.props.currentState.disableSubmit}>
              <Text style={[styles.subjectText, commonStyles.fontLato]}>
                + ADD
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={[commonStyles.fontLato, {color:'#ed2f2f', fontSize: 11, marginTop: 5,}]}>
            {this.props.currentState.errors.subjects ? this.props.currentState.errors.subjects : ''}
          </Text>
        </Form>

        <Form style={styles.inputWrapper}>
          <Label style={[commonStyles.formLabel, {letterSpacing: 2, color: '#b3b3b3', fontSize: 12}]}>PROFILE SUMMARY</Label>
          {this.props.currentState.errors.summary ? 
            (
              <Textarea 
                rowSpan={5}
                bordered
                placeholder="Add some description for your profile"
                placeholderTextColor="#b3b3b3"
                style={[commonStyles.fontLato, styles.summaryTextarea, {borderColor: '#ed2f2f'}]}
                onChangeText={(summary) => this.props.onChangeInput('summary', summary)}
                value={this.props.currentState.summary}
              />
            ) : 
            (
              <Textarea 
                rowSpan={5}
                bordered
                placeholder="Add some description for your profile"
                placeholderTextColor="#b3b3b3"
                style={[commonStyles.fontLato, styles.summaryTextarea]}
                onChangeText={(summary) => this.props.onChangeInput('summary', summary)}
                value={this.props.currentState.summary}
              />
            )
          }
          <Text style={[commonStyles.fontLato, {color:'#ed2f2f', fontSize: 11, marginTop: 5,}]}>
            {this.props.currentState.errors.summary ? this.props.currentState.errors.summary : ''}
          </Text>
        </Form>
      </View>
    )
  }
}

const localStyles = StyleSheet.create({
  uploadAvatar: {
    height: 90,
    width: 90,
    borderRadius: 45,
  },
  cameraBtn: {
    backgroundColor: '#00b16e',
    padding: 5,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#f7f6f6',
    position: 'absolute',
    bottom: -10, right: 0,
  },
  defaultPic: {
    backgroundColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

PersonalForm.propTypes = {
  profileObj: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profileObj: state.completeProfileReducer
});

export default connect(mapStateToProps, { deleteSubject, uploadImage })(PersonalForm);