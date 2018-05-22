import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import styles from './Stylesheet';

class PersonalDetail extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerRight: (
        <Button
          onPress={() => navigation.navigate("SignedIn")}
          title="SKIP"
        />
      ),
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text> Complete Your Profile </Text>
      </View>
    )
  }
}

export default PersonalDetail;