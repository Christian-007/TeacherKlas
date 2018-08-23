import React, { Component } from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Image,
  Alert
} from 'react-native';
import commonStyles from '../../common/CommonStyleSheet';
import { Label, Item } from 'native-base';
import styles from './Stylesheet';
import { onSignIn } from "../../../auth";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { validateForm } from '../../utils/formValidation';
import { loginUser } from '../../modules/actions';
import Loader from '../../common/Loader';

class LoginPage extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: 'LOGIN AS TEACHER'
    }
  };

  constructor(props) {
    super(props);
    this.state = { 
      email: '',
      password: '',
      errors: {},
      disableSubmit: false,
      loading: false,
    };
    this.onClickSignIn = this.onClickSignIn.bind(this);
  }
  
  async onClickSignIn() {
    this.setState({ errors: {}, loading: true, disableSubmit: true });
    const loginData = {
      email: this.state.email,
      password: this.state.password,
    };

    try {
      const response = await this.props.loginUser(loginData);
      await this.setState({ loading: false, disableSubmit: false });
      if(response) {
        onSignIn().then(() => this.props.navigation.navigate("SignedIn"));
      } else {
        onSignIn().then(() => this.props.navigation.navigate("CompleteProfile"));
      }
      console.log('response: ' + JSON.stringify(response));
    } catch (error) {
      const { errorFromStore } = this.props;
      await this.setState({ loading: false, disableSubmit: false });
      setTimeout(() => {
        this.showErrorAlert();
      }, 500);
      console.log('error from Promise: ' +  JSON.stringify(error));
      console.log('error from Store: ' +  JSON.stringify(errorFromStore));
    }
  }

  showErrorAlert() {
    Alert.alert(
      'Submission Error',
      `There's something wrong..`,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
  }

  render() {
    const { isLoading } = this.props;
    const { errors, disableSubmit } = this.state;

    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        <Image
          style={styles.imageLogo}
          source={require('../../../assets/images/klaslogotext.png')}
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
        <TouchableOpacity style={styles.submitWrapper} onPress={this.onClickSignIn} disabled={disableSubmit}>
          <Text style={styles.button}>
            {isLoading ? 'SUBMITTING...' : 'LOGIN'}
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

LoginPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isLoading: state.authReducer.isLoading,
  errorFromStore: state.authReducer.error,
});

export default connect(mapStateToProps, { loginUser })(LoginPage);