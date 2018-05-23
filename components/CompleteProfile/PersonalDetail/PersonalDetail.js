import React, { Component } from 'react';
import { Text, View, Button, ScrollView, TextInput } from 'react-native';
import { H3, Label, Input, Item , Form} from 'native-base';
import Ionic from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import styles from './Stylesheet';
import commonStyles from '../../../common/CommonStyleSheet';
import { scale } from 'react-native-size-matters';

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

  constructor(props) {
    super(props);
    this.state = { 
      fname: '',
      lname: '',
      location: '',
      subjects: '',
      summary: '',
      lname: '',
      errors: {},
      disableSubmit: false,
      loading: false,
    };
    // this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {

  }

  render() {
    // const { errors } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.centerTitle}>
            <H3 style={[styles.title, commonStyles.boldText]}>Complete Your Profile</H3>
          </View>
          
          <View style={styles.journey}>
            <View style={{alignItems: 'center', justifyContent:'center', width: 60, zIndex: 2}}>
              <View style={{backgroundColor: 'white'}}>
                <Ionic name="ios-checkmark-circle-outline" size={30} color={'#00b16e'} />
              </View>
              <Text style={[commonStyles.boldText, {fontSize: 10, color: '#00b16e', marginTop: 5, letterSpacing: 1}]}>PERSONAL</Text>
            </View>
            <View style={{alignItems: 'center', justifyContent:'center', width: 60, marginLeft: scale(50), marginRight: scale(50), zIndex: 2}}>
              <View style={{backgroundColor: 'white'}}>
                <Ionic name="ios-checkmark-circle-outline" size={30} color={'#cdccd8'} />
              </View>
              <Text style={[commonStyles.boldText, {fontSize: 10, color: '#cdccd8', marginTop: 5, letterSpacing: 1}]}>EXP</Text>
            </View>
            <View style={{alignItems: 'center', justifyContent:'center', width: 60, zIndex: 2}}>
              <View style={{backgroundColor: 'white'}}>
                <Ionic name="ios-checkmark-circle-outline" size={30} color={'#cdccd8'} />
              </View>
              <Text style={[commonStyles.boldText, {fontSize: 10, color: '#cdccd8', marginTop: 5, letterSpacing: 1}]}>SCHEDULE</Text>
            </View>
            <View style={{position: 'absolute', left:85, top:15, zIndex: 0, flexDirection:'row', }}>
              <View style={[styles.hr, {backgroundColor: '#cdccd8'}]}></View>
              <View style={[styles.hr, {marginLeft: 15}]}></View>
            </View>
          </View>

          <View style={{marginTop: 20, paddingLeft: 20, paddingRight: 20, alignItems: 'center',justifyContent: 'center',}}>
            <View style={commonStyles.itemWrapper}>
              <Item style={commonStyles.customItem} stackedLabel>
                <Label style={commonStyles.formLabel}>First Name</Label>
                <TextInput
                  underlineColorAndroid='transparent'
                  style={[commonStyles.formInput]} 
                  onChangeText={(fname) => this.setState({fname})}
                  value={this.state.fname}
                  autoCapitalize = 'none'
                />
              </Item>
            </View>
          </View>

          <View style={{marginTop: 20, paddingLeft: 20, paddingRight: 20, alignItems: 'center',justifyContent: 'center',}}>
            <View style={commonStyles.itemWrapper}>
              <Item style={commonStyles.customItem} stackedLabel>
                <Label style={commonStyles.formLabel}>Last Name</Label>
                <TextInput
                  underlineColorAndroid='transparent'
                  style={[commonStyles.formInput]} 
                  onChangeText={(lname) => this.setState({lname})}
                  value={this.state.lname}
                  autoCapitalize = 'none'
                />
              </Item>
            </View>
          </View>

          <View style={{marginTop: 20, paddingLeft: 20, paddingRight: 20, alignItems: 'center',justifyContent: 'center',}}>
            <View style={commonStyles.itemWrapper}>
              <Item style={commonStyles.customItem} stackedLabel>
                <Label style={commonStyles.formLabel}>Location</Label>
                <TextInput
                  underlineColorAndroid='transparent'
                  style={[commonStyles.formInput]} 
                  onChangeText={(location) => this.setState({location})}
                  value={this.state.location}
                  autoCapitalize = 'none'
                />
              </Item>
            </View>
          </View>
        </ScrollView>
        <View style={{alignItems: 'center', justifyContent: 'center',}}>
          <Text>SUBMIT</Text>
        </View>
      </View>
    )
  }
}

export default PersonalDetail;