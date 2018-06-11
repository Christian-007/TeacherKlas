import React, { Component } from 'react';
import { 
  StyleSheet,
  Button,
  View,
  Text 
} from 'react-native';
import { onSignOut } from "../../../auth";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../modules/actions'

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.onLogoutUser = this.onLogoutUser.bind(this);
  }

  static navigationOptions = {
    title: 'Profile Page',
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0
    },
  };

  async onLogoutUser() {
    try {
      const response = await this.props.logoutUser();
      onSignOut().then(() => this.props.navigation.navigate('SignedOut'));
      console.log('response: ' + JSON.stringify(response));
    } catch (error) {
      console.log('error: ' +  JSON.stringify(error));
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Profile Page</Text>
        <Button
          title="Sign Out"
          onPress={this.onLogoutUser}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

ProfilePage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

export default connect(null, { logoutUser })(ProfilePage);