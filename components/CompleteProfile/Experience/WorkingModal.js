import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import { H3, Label, Input, Item , Form, Textarea, Picker} from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../Stylesheet';
import commonStyles from '../../../common/CommonStyleSheet';
import { addWorkExperience } from '../../../actions';

class WorkingModal extends Component {
  static navigationOptions = {
    title: 'WORKING EXPERIENCE',
  };

  constructor(props) {
    super(props);
    this.state = {
      company: '',
      industry: '',
      role: '',
      startmonth: '',
      startyear: '',
      endmonth: '',
      endyear: '',
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  onValueChange(value) {
    this.setState({
      startdate: value
    });
  }

  onSubmit() {
    console.log('data: ', this.state);
    this.props.addWorkExperience(this.state);
    this.props.navigation.goBack();
  }

  render() {
    const { text } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#fff'}}>
        <ScrollView>
          <Form style={[styles.inputWrapper]}>
            <Item stackedLabel style={{marginLeft: 0}}>
              <Label style={[commonStyles.formLabel, styles.labelForm]}>COMPANY</Label>
              <Input 
                style={[commonStyles.fontLato, {fontSize: 13}]}
                underlineColorAndroid='transparent'
                onChangeText={(company) => this.setState({company})}
                value={this.state.company}
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
                onChangeText={(industry) => this.setState({industry})}
                value={this.state.industry}
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
                onChangeText={(role) => this.setState({role})}
                value={this.state.role}
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
                  onChangeText={(startmonth) => this.setState({startmonth})}
                  value={this.state.startmonth}
                  placeholder="mm"
                  placeholderTextColor="#b3b3b3"
                />
                <Input 
                  style={[commonStyles.fontLato, {marginLeft: 10, fontSize: 13, borderBottomColor: '#d9d5dc', borderBottomWidth: 0.6}]}
                  underlineColorAndroid='transparent'
                  onChangeText={(startyear) => this.setState({startyear})}
                  value={this.state.startyear}
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
                  onChangeText={(endmonth) => this.setState({endmonth})}
                  value={this.state.endmonth}
                  placeholder="mm"
                  placeholderTextColor="#b3b3b3"
                />
                <Input 
                  style={[commonStyles.fontLato, {marginLeft: 10, fontSize: 13, borderBottomColor: '#d9d5dc', borderBottomWidth: 0.6}]}
                  underlineColorAndroid='transparent'
                  onChangeText={(endyear) => this.setState({endyear})}
                  value={this.state.endyear}
                  placeholder="yyyy"
                  placeholderTextColor="#b3b3b3"
                />
              </View>
            </Item>
           </Form>
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

export default connect(mapStateToProps, { addWorkExperience })(WorkingModal);