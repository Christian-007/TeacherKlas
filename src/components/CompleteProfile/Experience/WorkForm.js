import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import { H3, Label, Input, Item , Form, Textarea, Picker} from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../Stylesheet';
import commonStyles from '../../../common/CommonStyleSheet';
import { addWorkExperience } from '../../../modules/actions';
import TextFieldWithLabel from '../../../common/TextFieldWithLabel';
import RoundedSubmitButton from '../../../common/RoundedSubmitButton';

class WorkForm extends Component {
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
      }
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onValueChangeWork = this.onValueChangeWork.bind(this);
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
    this.props.addWorkExperience(this.state.work);
    this.props.propsNavigation.goBack();
  }

  render(){

    return (
      <View style={{ flex: 1, backgroundColor: '#fff'}}>
        <ScrollView>
          <TextFieldWithLabel 
            onChangeText={(company) => this.onValueChangeWork('company', company)}
            value={this.state.work.company}
            placeholder="Name of company"
            label="COMPANY"
            formStyles={styles.inputWrapper}
          />
          <TextFieldWithLabel 
            onChangeText={(industry) => this.onValueChangeWork('industry', industry)}
            value={this.state.work.industry}
            placeholder="e.g. IT, Engineering, Finance"
            label="INDUSTRY"
            formStyles={styles.inputWrapper}
          />
          <TextFieldWithLabel 
            onChangeText={(role) => this.onValueChangeWork('role', role)}
            value={this.state.work.role}
            placeholder="e.g. Junior Developer, Office Manager"
            label="ROLE / JOB POSITION"
            formStyles={styles.inputWrapper}
          />

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

WorkForm.propTypes = {
  profileObj: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profileObj: state.completeProfileReducer
});

export default connect(mapStateToProps, { addWorkExperience })(WorkForm);