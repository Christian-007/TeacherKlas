import React, { Component } from 'react';
import { Text, View, Button, ScrollView } from 'react-native';
import styles from '../Stylesheet';
import commonStyles from '../../../common/CommonStyleSheet';
import UserJourney from '../../../common/UserJourney';
import SubmitBtnWithIcon from '../../../common/SubmitBtnWithIcon';
import PersonalForm from './Form/PersonalForm';

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
    this.onSubmit = this.onSubmit.bind(this);
    this.onAddSubject = this.onAddSubject.bind(this);
  }

  onSubmit() {
    this.props.navigation.navigate('Experience');
  }

  onAddSubject() {
    this.props.navigation.navigate('SubjectModal');
  }

  render() {
    return (
      <View style={styles.container}>
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

          <View style={{paddingBottom: 20}}>
            <PersonalForm 
            onAddSubject={this.onAddSubject}/>
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

export default PersonalDetail;