import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';

class PersonalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: {},
    };
  }

  chooseImage = () => {
    let options = {
      title: 'Select Avatar',
      customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
      ],
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
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
    
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        this.setState({avatarSource: source});
        console.log('avatarSource: ', source);
      }
    });
  }
  
  render() {
    return (
      <View>
        <Image source={this.state.avatarSource} style={styles.uploadAvatar} />
        <TouchableOpacity onPress={this.chooseImage}>
          <Text>Upload Image</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  uploadAvatar: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderColor:'rgba(0,0,0,0.2)',
    borderRadius: 25,
  },
});

export default PersonalForm;