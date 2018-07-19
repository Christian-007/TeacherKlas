import React, { Component } from 'react';
import { Text, View, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import commonStyles from '../../../common/CommonStyleSheet';
import Ionicon from 'react-native-vector-icons/Ionicons';

export default class ScheduleDays extends Component {
  constructor(props) {
    super(props);
    this.state = {
      daysOn: false,
    }
  }

  onValueChange = () => {
    this.setState({
      daysOn: !this.state.daysOn
    })
  }

  render() {
    return (
      <View style={styles.daysCard}>
        <View style={styles.leftCol}>
          <Text style={commonStyles.boldText}>{this.props.dayName}</Text>
          <View style={styles.slotWrapper}>
            <View style={styles.slotStyle}>
              <Text style={[commonStyles.boldText, {fontSize: 10}]}>SLOT 1</Text>
            </View>
            <Text style={commonStyles.fontLato}>09.00</Text>
            <Ionicon 
              name="ios-arrow-round-forward-outline"
              size={30} 
              color="#00b16e" 
              style={{marginLeft: 10, marginRight: 10}}
            />
            <Text style={commonStyles.fontLato}>10.30</Text>
          </View>
          <View style={styles.slotWrapper}>
            <View style={styles.slotStyle}>
              <Text style={[commonStyles.boldText, {fontSize: 10}]}>SLOT 2</Text>
            </View>
            <Text style={commonStyles.fontLato}>13.00</Text>
            <Ionicon 
              name="ios-arrow-round-forward-outline"
              size={30} 
              color="#00b16e" 
              style={{marginLeft: 10, marginRight: 10}}
            />
            <Text style={commonStyles.fontLato}>14.30</Text>
          </View>
        </View> 
        <View style={styles.rightCol}>
          <Switch 
            onValueChange={this.onValueChange}
            value={this.state.daysOn} />
          <TouchableOpacity style={{marginTop: 10, flexDirection: 'row', alignItems: 'center'}}>
            <Ionicon 
              name="ios-settings"
              size={20} 
              color="#00b16e" 
              style={{marginRight: 5}}
            />
            <Text style={{color: '#00b16e'}}>Edit</Text>
          </TouchableOpacity>
        </View> 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  daysCard: {
    backgroundColor: '#fafafa',
    paddingTop: 20, paddingBottom: 20,
    paddingLeft: 30, paddingRight: 30,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  leftCol: {
    flex: 1,
    justifyContent:'flex-start',
    alignItems: 'flex-start'
  },
  slotWrapper: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center'
  },
  rightCol: {
    flex: 1,
    justifyContent:'flex-start',
    alignItems: 'flex-end'
  },
  slotStyle: {
    backgroundColor: '#f2f5f7',
    marginRight: 10,
    padding: 7,
    justifyContent: 'center'
  }
});