import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import { H3, Label, Input, Item , Form, Textarea, Picker} from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../Stylesheet';
import commonStyles from '../../../common/CommonStyleSheet';
import { addWorkExperience, addEducationExperience } from '../../../actions';

class WorkingModal extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('screen'),
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      work: {
        company: '',
        industry: '',
        role: '',
        startmonth: '',
        startyear: '',
        endmonth: '',
        endyear: '',
      },
      education: {
        university: '',
        degree: 'bachelor',
        major: '',
        startmonth: '',
        startyear: '',
        endmonth: '',
        endyear: '',
      },
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  onValueChange(key, value) {
    this.setState(prevState => ({
      ...prevState,
      education: {
        ...prevState.education,
        [key]: value
      }
    }));
  }

  onValueChangeWork(key, value) {
    this.setState(prevState => ({
      ...prevState,
      work: {
        ...prevState.work,
        [key]: value
      }
    }));
  }

  onSubmit() {
    console.log('data: ', this.state);
    if(this.props.navigation.getParam('expType') === 'work') {
      this.props.addWorkExperience(this.state.work);
    } else {
      this.props.addEducationExperience(this.state.education);
    }
    this.props.navigation.goBack();
  }

  render() {
    let isFormWork = false;
    if(this.props.navigation.getParam('expType') === 'work'){
      isFormWork = true;
    }
    const formWork = (
      <View>
        <Form style={[styles.inputWrapper]}>
          <Item stackedLabel style={{marginLeft: 0}}>
            <Label style={[commonStyles.formLabel, styles.labelForm]}>COMPANY</Label>
            <Input 
              style={[commonStyles.fontLato, {fontSize: 13}]}
              underlineColorAndroid='transparent'
              onChangeText={(company) => this.onValueChangeWork('company', company)}
              value={this.state.work.company}
              placeholder="Name of company"
              placeholderTextColor="#b3b3b3"
            />
          </Item>
        </Form>
        <Form style={[styles.inputWrapper]}>
          <Item stackedLabel style={{marginLeft: 0}}>
            <Label style={[commonStyles.formLabel, styles.labelForm]}>INDUSTRY</Label>
            <Input 
              style={[commonStyles.fontLato, {fontSize: 13}]}
              underlineColorAndroid='transparent'
              onChangeText={(industry) => this.onValueChangeWork('industry', industry)}
              value={this.state.work.industry}
              placeholder="e.g. IT, Engineering, Finance"
              placeholderTextColor="#b3b3b3"
            />
          </Item>
        </Form>
        <Form style={[styles.inputWrapper]}>
          <Item stackedLabel style={{marginLeft: 0}}>
            <Label style={[commonStyles.formLabel, styles.labelForm]}>ROLE / JOB POSITION</Label>
            <Input 
              style={[commonStyles.fontLato, {fontSize: 13}]}
              underlineColorAndroid='transparent'
              onChangeText={(role) => this.onValueChangeWork('role', role)}
              value={this.state.work.role}
              placeholder="e.g. Junior Developer, Office Manager"
              placeholderTextColor="#b3b3b3"
            />
          </Item>
        </Form>

        <Form style={[styles.inputWrapper, {flexDirection: 'row', width: '100%', justifyContent: 'space-between'}]}>
          <Item stackedLabel style={{marginLeft: 0, borderWidth: 0, borderColor: '#fff', width: '45%'}}>
            <Label style={[commonStyles.formLabel, styles.labelForm]}>START DATE</Label>
            <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
              <Input 
                style={[commonStyles.fontLato, {fontSize: 13, borderBottomColor: '#d9d5dc', borderBottomWidth: 0.6}]}
                underlineColorAndroid='transparent'
                onChangeText={(startmonth) => this.onValueChangeWork('startmonth', startmonth)}
                value={this.state.work.startmonth}
                placeholder="mm"
                placeholderTextColor="#b3b3b3"
              />
              <Input 
                style={[commonStyles.fontLato, {marginLeft: 10, fontSize: 13, borderBottomColor: '#d9d5dc', borderBottomWidth: 0.6}]}
                underlineColorAndroid='transparent'
                onChangeText={(startyear) => this.onValueChangeWork('startyear', startyear)}
                value={this.state.work.startyear}
                placeholder="yyyy"
                placeholderTextColor="#b3b3b3"
              />
            </View>
          </Item>
          <Item stackedLabel style={{marginLeft: 0, borderWidth: 0, borderColor: '#fff', width: '45%'}}>
            <Label style={[commonStyles.formLabel, styles.labelForm]}>END DATE</Label>
            <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
              <Input 
                style={[commonStyles.fontLato, {fontSize: 13, borderBottomColor: '#d9d5dc', borderBottomWidth: 0.6}]}
                underlineColorAndroid='transparent'
                onChangeText={(endmonth) => this.onValueChangeWork('endmonth', endmonth)}
                value={this.state.work.endmonth}
                placeholder="mm"
                placeholderTextColor="#b3b3b3"
              />
              <Input 
                style={[commonStyles.fontLato, {marginLeft: 10, fontSize: 13, borderBottomColor: '#d9d5dc', borderBottomWidth: 0.6}]}
                underlineColorAndroid='transparent'
                onChangeText={(endyear) => this.onValueChangeWork('endyear', endyear)}
                value={this.state.work.endyear}
                placeholder="yyyy"
                placeholderTextColor="#b3b3b3"
              />
            </View>
          </Item>
          </Form>
      </View>
    );
    const formEducation = (
      <View>
        <Form style={[styles.inputWrapper]}>
          <Item stackedLabel style={{marginLeft: 0}}>
            <Label style={[commonStyles.formLabel, styles.labelForm]}>SCHOOL / UNIVERSITY</Label>
            <Input 
              style={[commonStyles.fontLato, {fontSize: 13}]}
              underlineColorAndroid='transparent'
              onChangeText={(university) => this.onValueChange('university', university)}
              value={this.state.education.university}
              placeholder="Name of school / university"
              placeholderTextColor="#b3b3b3"
            />
          </Item>
        </Form>

        <Form style={[styles.inputWrapper]}>
          <Item stackedLabel style={{marginLeft: 0}}>
            <Label style={[commonStyles.formLabel, styles.labelForm]}>MAJOR</Label>
            <Input 
              style={[commonStyles.fontLato, {fontSize: 13}]}
              underlineColorAndroid='transparent'
              onChangeText={(major) => this.onValueChange('major', major)}
              value={this.state.education.major}
              placeholder="e.g. Computer Science, Accounting, Business"
              placeholderTextColor="#b3b3b3"
            />
          </Item>
        </Form>
        <Form style={[styles.inputWrapper]}>
          <Label style={[commonStyles.formLabel, styles.labelForm]}>DEGREE</Label>
          <Picker
            iosHeader="Select degree"
            mode="dropdown"
            selectedValue={this.state.education.degree}
            onValueChange={(degree) => this.onValueChange('degree', degree)}
            style={{borderBottomWidth: 0.5, borderColor: '#D9D5Dc', alignSelf: 'stretch', paddingTop: 0, paddingBottom: 0, height: 35}}
            textStyle={[commonStyles.fontLato, {fontSize: 12, paddingLeft: 0}]}
          >
            <Picker.Item label="High School" value="school" />
            <Picker.Item label="Diploma" value="diploma" />
            <Picker.Item label="Bachelor" value="bachelor" />
            <Picker.Item label="Masters" value="masters" />
            <Picker.Item label="PhD" value="phd" />
          </Picker>
        </Form>

        <Form style={[styles.inputWrapper, {flexDirection: 'row', width: '100%', justifyContent: 'space-between'}]}>
          <Item stackedLabel style={{marginLeft: 0, borderWidth: 0, borderColor: '#fff', width: '45%'}}>
            <Label style={[commonStyles.formLabel, styles.labelForm]}>START DATE</Label>
            <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
              <Input 
                style={[commonStyles.fontLato, {fontSize: 13, borderBottomColor: '#d9d5dc', borderBottomWidth: 0.6}]}
                underlineColorAndroid='transparent'
                onChangeText={(startmonth) => this.onValueChange('startmonth', startmonth)}
                value={this.state.education.startmonth}
                placeholder="mm"
                placeholderTextColor="#b3b3b3"
              />
              <Input 
                style={[commonStyles.fontLato, {marginLeft: 10, fontSize: 13, borderBottomColor: '#d9d5dc', borderBottomWidth: 0.6}]}
                underlineColorAndroid='transparent'
                onChangeText={(startyear) => this.onValueChange('startyear', startyear)}
                value={this.state.education.startyear}
                placeholder="yyyy"
                placeholderTextColor="#b3b3b3"
              />
            </View>
          </Item>
          <Item stackedLabel style={{marginLeft: 0, borderWidth: 0, borderColor: '#fff', width: '45%'}}>
            <Label style={[commonStyles.formLabel, styles.labelForm]}>END DATE</Label>
            <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
              <Input 
                style={[commonStyles.fontLato, {fontSize: 13, borderBottomColor: '#d9d5dc', borderBottomWidth: 0.6}]}
                underlineColorAndroid='transparent'
                onChangeText={(endmonth) => this.onValueChange('endmonth', endmonth)}
                value={this.state.education.endmonth}
                placeholder="mm"
                placeholderTextColor="#b3b3b3"
              />
              <Input 
                style={[commonStyles.fontLato, {marginLeft: 10, fontSize: 13, borderBottomColor: '#d9d5dc', borderBottomWidth: 0.6}]}
                underlineColorAndroid='transparent'
                onChangeText={(endyear) => this.onValueChange('endyear', endyear)}
                value={this.state.education.endyear}
                placeholder="yyyy"
                placeholderTextColor="#b3b3b3"
              />
            </View>
          </Item>
        </Form> 
      </View>
    );
    return (
      <View style={{ flex: 1, backgroundColor: '#fff'}}>
        <ScrollView>
        {isFormWork ? formWork : formEducation}
        </ScrollView>
        <View style={[styles.submitWrapper]}>
          <TouchableOpacity style={styles.submitBtn} onPress={this.onSubmit} disabled={this.state.disableSubmit}>
            <Text style={[commonStyles.boldText, styles.submitText]}>
              CONFIRM
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

WorkingModal.propTypes = {
  profileObj: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profileObj: state.completeProfileReducer
});

export default connect(mapStateToProps, { addWorkExperience, addEducationExperience })(WorkingModal);