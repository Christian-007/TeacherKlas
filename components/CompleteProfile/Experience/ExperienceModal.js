import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import WorkForm from './WorkForm';
import EducationForm from './EducationForm';

class ExperienceModal extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('screen'),
    }
  };

  render() {
    let isFormWork = false;
    if(this.props.navigation.getParam('expType') === 'work'){
      isFormWork = true;
    }

    return (
      <View style={{ flex: 1, backgroundColor: '#fff'}}>
        {isFormWork ? (
          <WorkForm propsNavigation={this.props.navigation}/>
         ) : (
          <EducationForm propsNavigation={this.props.navigation}/>
         )}
        
      </View>
    )
  }
}

export default ExperienceModal;