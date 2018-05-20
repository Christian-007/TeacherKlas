import React, { Component } from 'react';
import { 
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Image
} from 'react-native';
import commonStyles from '../../common/CommonStyleSheet';
import { Label, Input, Item } from 'native-base';
import styles from './Stylesheet';
import { onSignIn } from "../../auth";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: '',
      password: ''
    };
  }

  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: 'LOGIN AS TEACHER'
    }
  };

  render() {
    const errors = '';

    return (
      <View style={styles.container}>
        <Image
          style={styles.imageLogo}
          source={require('../../assets/images/klaslogotext.png')}
        />

        <View style={styles.fieldWrapper}>
          <View style={commonStyles.itemWrapper}>
            <Item style={commonStyles.customItem} stackedLabel error={errors.email ? true : false}>
              <Label style={commonStyles.formLabel}>EMAIL ADDRESS</Label>
              <TextInput
                underlineColorAndroid='transparent'
                style={[commonStyles.formInput]} 
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
                placeholder="Your Email Address"
                placeholderTextColor="#b3b3b3"
                autoCapitalize = 'none'
              />
            </Item>
            <Text style={commonStyles.errorMessage}>
              { errors.email ? errors.email : ''}
            </Text>
          </View>

          <View style={commonStyles.itemWrapper}>
            <Item style={commonStyles.customItem} stackedLabel error={errors.password ? true : false}>
              <Label style={commonStyles.formLabel}>PASSWORD</Label>
              <TextInput
                underlineColorAndroid='transparent'
                style={[commonStyles.formInput]} 
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
                placeholder="Your Password"
                placeholderTextColor="#b3b3b3"
                secureTextEntry={true}
              />
            </Item>
            <Text style={commonStyles.errorMessage}>
              { errors.password ? errors.password : ''}
            </Text>
          </View>
        </View>
        {/* <View style={styles.inputWrapper}>
          <TextInput
            underlineColorAndroid='transparent'
            style={[styles.input, styles.inputBorderBtm]} 
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            placeholder="Your Email"
            placeholderTextColor="#b3b3b3"
          />
          <TextInput
            underlineColorAndroid='transparent'
            style={styles.input} 
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            placeholder="Your Password"
            placeholderTextColor="#b3b3b3"
            secureTextEntry={true}
          />
        </View> */}
        <TouchableOpacity style={styles.submitWrapper}>
          <Text 
            style={styles.button}
            onPress={() => {
              onSignIn().then(() => this.props.navigation.navigate("SignedIn"));
            }}
          >
            LOGIN
          </Text>
        </TouchableOpacity>
        <View style={styles.textWrapper}>
          <Text style={styles.lightText}>
            Don't have an account?{'  '}
          </Text>
          <Text
            style={styles.anchorLink}
            onPress={() => this.props.navigation.navigate('Signup')}
          >
            Sign Up
          </Text>
        </View>
      </View>
    );
  }
}