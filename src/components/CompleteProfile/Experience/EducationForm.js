import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { H3, Label, Input, Item , Form, CheckBox, Picker} from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../Stylesheet';
import commonStyles from '../../../common/CommonStyleSheet';
import { addEducationExperience } from '../../../modules/actions';
import TextFieldWithLabel from '../../../common/TextFieldWithLabel';
import RoundedSubmitButton from '../../../common/RoundedSubmitButton';

class EducationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      education: {
        university: '',
        degree: 'Bachelor',
        major: '',
        startmonth: '',
        startyear: '',
        endmonth: '',
        endyear: '',
        studyHere: '',
      },
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onValueChangeEducation = this.onValueChangeEducation.bind(this);
  }

  onValueChangeEducation(key, value) {
    this.setState(prevState => ({
      ...prevState,
      education: {
        ...prevState.education,
        [key]: value
      }
    }));
  }

  onSubmit() {
    console.log('data: ', this.state);
    this.props.addEducationExperience(this.state.education);
    this.props.propsNavigation.goBack();
  }

  render(){
    return (
      <View style={{ flex: 1, backgroundColor: '#fff'}}>
        <ScrollView>
        <TextFieldWithLabel 
          onChangeText={(university) => this.onValueChangeEducation('university', university)}
          value={this.state.education.university}
          placeholder="Name of school / university"
          label="SCHOOL / UNIVERSITY"
          formStyles={styles.inputWrapper}
        />

        <TextFieldWithLabel 
          onChangeText={(major) => this.onValueChangeEducation('major', major)}
          value={this.state.education.major}
          label="MAJOR"
          formStyles={styles.inputWrapper}
        />

        <Form style={[styles.inputWrapper]}>
          <Label style={[commonStyles.formLabel, styles.labelForm]}>DEGREE</Label>
          <Picker
            iosHeader="Degree"
            mode="dropdown"
            selectedValue={this.state.education.degree}
            onValueChange={(degree) => this.onValueChangeEducation('degree', degree)}
            style={{borderBottomWidth: 0.5, borderColor: '#D9D5Dc', alignSelf: 'stretch', paddingTop: 0, paddingBottom: 0, height: 35}}
            textStyle={[commonStyles.fontLato, {fontSize: 12, paddingLeft: 0}]}
          >
            <Picker.Item label="High School" value="High School" />
            <Picker.Item label="Diploma" value="Diploma" />
            <Picker.Item label="Bachelor" value="Bachelor" />
            <Picker.Item label="Masters" value="Masters" />
            <Picker.Item label="PhD" value="PhD" />
          </Picker>
        </Form>

        <Form style={[styles.inputWrapper, {flexDirection: 'row', width: '100%', justifyContent: 'space-between'}]}>
          <Item stackedLabel style={{marginLeft: 0, borderWidth: 0, borderColor: '#fff', width: '45%'}}>
            <Label style={[commonStyles.formLabel, styles.labelForm]}>START DATE</Label>
            <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
              <Input 
                style={[commonStyles.fontLato, {fontSize: 13, borderBottomColor: '#d9d5dc', borderBottomWidth: 0.6}]}
                underlineColorAndroid='transparent'
                onChangeText={(startmonth) => this.onValueChangeEducation('startmonth', startmonth)}
                value={this.state.education.startmonth}
                placeholder="mm"
                placeholderTextColor="#b3b3b3"
              />
              <Input 
                style={[commonStyles.fontLato, {marginLeft: 10, fontSize: 13, borderBottomColor: '#d9d5dc', borderBottomWidth: 0.6}]}
                underlineColorAndroid='transparent'
                onChangeText={(startyear) => this.onValueChangeEducation('startyear', startyear)}
                value={this.state.education.startyear}
                placeholder="yyyy"
                placeholderTextColor="#b3b3b3"
              />
            </View>
          </Item>
          {!this.state.studyHere && 
            (
              <Item stackedLabel style={{marginLeft: 0, borderWidth: 0, borderColor: '#fff', width: '45%'}}>
                <Label style={[commonStyles.formLabel, styles.labelForm]}>END DATE</Label>
                <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                  <Input 
                    style={[commonStyles.fontLato, {fontSize: 13, borderBottomColor: '#d9d5dc', borderBottomWidth: 0.6}]}
                    underlineColorAndroid='transparent'
                    onChangeText={(endmonth) => this.onValueChangeEducation('endmonth', endmonth)}
                    value={this.state.education.endmonth}
                    placeholder="mm"
                    placeholderTextColor="#b3b3b3"
                  />
                  <Input 
                    style={[commonStyles.fontLato, {marginLeft: 10, fontSize: 13, borderBottomColor: '#d9d5dc', borderBottomWidth: 0.6}]}
                    underlineColorAndroid='transparent'
                    onChangeText={(endyear) => this.onValueChangeEducation('endyear', endyear)}
                    value={this.state.education.endyear}
                    placeholder="yyyy"
                    placeholderTextColor="#b3b3b3"
                  />
                </View>
              </Item>
            )
          }
        </Form>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 35, paddingLeft: 15}} >
          <View>
            <CheckBox checked={this.state.studyHere} onPress={() => this.setState({studyHere: !this.state.studyHere})}/>
          </View>
          <Text style={commonStyles.fontLato}>{'       '}I currently study here</Text>
        </View>
        </ScrollView>
        <View style={[styles.submitWrapper]}>
          <RoundedSubmitButton 
            label="CONFIRM"
            onPress={this.onSubmit}
          />
        </View>
      </View>
    )
  }
}

EducationForm.propTypes = {
  profileObj: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profileObj: state.completeProfileReducer
});

export default connect(mapStateToProps, { addEducationExperience })(EducationForm);