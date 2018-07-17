import React, { Component } from 'react';
import { Text, View, Button, ScrollView, TouchableOpacity } from 'react-native';
import { Toast } from 'native-base';
import styles from '../Stylesheet';
import commonStyles from '../../../common/CommonStyleSheet';
import UserJourney from '../../../common/UserJourney';
import SubmitBtnWithIcon from '../../../common/SubmitBtnWithIcon';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PersonalForm from './Form/PersonalForm';
import { onAddPersonal } from '../../../modules/actions/personalDetail';
import Loader from '../../../common/Loader';
import { validatePersonalForm } from '../../../utils/formValidation';
import firebase from 'react-native-firebase';
import type { Notification } from 'react-native-firebase';

class PersonalDetail extends Component {
  static navigationOptions = ({ navigation }) => {
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
      avatarSource: {},
      fname: '',
      lname: '',
      location: '',
      subjects: 0,
      summary: '',
      errors: {},
      isUploaded: false,
      disableSubmit: false,
      loading: false,
      modalVisible: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onAddSubject = this.onAddSubject.bind(this);
  }

  onChangeInput(key, value) {
    this.setState({
      [key]: value
    });
  }

  formValidation() {
    const { errors, isValid } = validatePersonalForm(this.state);

    if(!isValid) {
      this.setState({ errors });
    }
    
    return isValid;
  }

  onSubmit() {
    this.setState({subjects: this.props.profileObj.subjects.length}, () => {
      
      // validate form here
      // if it's success, then navigate to the next slide
      if(this.formValidation()){
        this.props.onAddPersonal(this.state);
        this.setState({ errors: {} }, () => {
          this.props.navigation.navigate('Experience');
        });
      } else {
        Toast.show({
          text: 'Please fill all the fields!',
          buttonText: 'Okay'
        });
      }
    });
  }

  onAddSubject() {
    this.props.navigation.navigate('SubjectModal');
  }

  firebaseNotif = () => {
    const FCM = firebase.messaging();
    const rtdbRef = firebase.database();

    FCM.requestPermission()
    .then(() => {
      // User has authorised  
      console.log('Authorised user!');
      FCM.getToken().then(currentToken => {
        if (currentToken) {
          console.log('Token', currentToken);
          rtdbRef.ref('users/dY1grt123/notifTokens').set({
            [currentToken]: true
          }, err => {
            if (err) {
              console.log('error occurred:', err);
            } else {
              console.log('successfully write!');
            }
          })
        } else {
          // Show permission request.
          console.log('No Instance ID token available. Request permission to generate one.');
        }
      }).catch(err => {
        console.log('An error occurred while retrieving token. ', err);
        
      });
    })
    .catch(error => {
      // User has rejected permissions
      console.log('Reject permissions!');
    });
  }

  componentDidMount() {
    // Build a channel
    const channel = new firebase.notifications.Android.Channel('Klas.co.id', 'Klas.co.id', firebase.notifications.Android.Importance.Max)
      .setDescription('My apps test channel');
    // Create the channel
    firebase.notifications().android.createChannel(channel);

    // Build a channel group
    const channelGroup = new firebase.notifications.Android.ChannelGroup('Klas.co.id-Group', 'Klas.co.id Group');
    // Create the channel group
    firebase.notifications().android.createChannelGroup(channelGroup);

    const notificationBuilder = new firebase.notifications.Notification()
      .setNotificationId('notificationId')
      .setTitle('My notification title')
      .setBody('My notification body')
      .setData({
        key1: 'value1',
        key2: 'value2',
      });

    notificationBuilder.android.setChannelId('Klas.co.id');

    this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
      // Process your notification as required
      console.log('notification listen ', notification);
      this.setState({
        notifListenLog: 'hey, listen log!!',
        
      });
      notification.android.setChannelId('Klas.co.id');
      firebase.notifications().displayNotification(notification);
    });
  }

  componentWillUnmount() {
    this.notificationListener();
  }

  render() {
    return (
      <View style={styles.container}>
        <Loader loading={this.props.profileObj.isLoading} />
        <ScrollView>
          <View style={styles.centerTitle}>
            <Text style={[styles.title, commonStyles.boldText]}>Complete Your Profile</Text>
          </View>
          
          <UserJourney 
            stage1='#00b16e'
            stage2='#cdccd8'
            stage3='#cdccd8'
            current='stage1'
          />

          <TouchableOpacity 
            style={{backgroundColor: 'blue', padding: 10, width: 100, height: 35}}
            onPress={this.firebaseNotif}
          >
            <Text style={{color: 'white'}}>Push Notif</Text>
          </TouchableOpacity>

          <View style={{paddingBottom: 20}}>
            <PersonalForm 
              currentState={this.state}
              onChangeInput={(key,value) => this.onChangeInput(key,value)}
              onAddSubject={this.onAddSubject}
            />
          </View>
        </ScrollView>

        <View style={[styles.submitWrapper]}>
          <SubmitBtnWithIcon 
            label="NEXT"
            onPress={this.onSubmit}
          />
        </View>
      </View>
    )
  }
}

PersonalDetail.propTypes = {
  profileObj: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profileObj: state.completeProfileReducer
});

export default connect(mapStateToProps, { onAddPersonal })(PersonalDetail);