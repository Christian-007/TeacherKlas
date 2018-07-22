import React, { Component } from 'react';
import { Text, View, Switch, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
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

  renderSlots = (item) => {
    return (
      <View style={styles.slotWrapper}>
        <View style={styles.slotStyle}>
          <Text style={[commonStyles.boldText, {fontSize: 10}]}>SLOT {item.index+1}</Text>
        </View>
        <Text style={commonStyles.fontLato}>{item.item.starttime}</Text>
        <Ionicon 
          name="ios-arrow-round-forward-outline"
          size={30} 
          color="#00b16e" 
          style={{marginLeft: 10, marginRight: 10}}
        />
        <Text style={commonStyles.fontLato}>{item.item.endtime}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.daysCard}>
        <View style={styles.leftCol}>
          <Text style={commonStyles.boldText}>{this.props.dayName}</Text>
          
          { this.props.slotState.length === 0 ? 
            (<Text>You have no slot.</Text>) : 
            (
              <FlatList
                data={this.props.slotState}
                renderItem={(item) => this.renderSlots(item)}
                keyExtractor={(item, index) => index.toString()}
              />
            )
          }
        </View> 
        <View style={styles.rightCol}>
          <Switch 
            onValueChange={this.onValueChange}
            value={this.state.daysOn} />
          <TouchableOpacity 
            onPress={this.props.onEdit}
            style={{marginTop: 10, flexDirection: 'row', alignItems: 'center'}}
          >
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