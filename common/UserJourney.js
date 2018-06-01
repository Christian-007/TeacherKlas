import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from '../components/CompleteProfile/Stylesheet';
import commonStyles from './CommonStyleSheet';
import Ionic from 'react-native-vector-icons/Ionicons';

const UserJourney = ({stage1, stage2, stage3}) => {
  return (
    <View style={styles.journey}>
      <View style={{alignItems: 'center', justifyContent:'center', width: 60, zIndex: 2}}>
        <View style={{backgroundColor: 'white'}}>
          <Ionic name="ios-checkmark-circle-outline" size={25} color={stage1} />
        </View>
        <Text style={[commonStyles.boldText, {fontSize: 8, color: stage1, marginTop: 5, letterSpacing: 1}]}>PERSONAL</Text>
      </View>
      <View style={{alignItems: 'center', justifyContent:'center', width: 60, marginLeft: 50, marginRight: 50, zIndex: 2}}>
        <View style={{backgroundColor: 'white'}}>
          <Ionic name="ios-checkmark-circle-outline" size={25} color={stage2} />
        </View>
        <Text style={[commonStyles.boldText, {fontSize: 8, color: stage2, marginTop: 5, letterSpacing: 1}]}>EXPERIENCE</Text>
      </View>
      <View style={{alignItems: 'center', justifyContent:'center', width: 60, zIndex: 2}}>
        <View style={{backgroundColor: 'white'}}>
          <Ionic name="ios-checkmark-circle-outline" size={25} color={stage3} />
        </View>
        <Text style={[commonStyles.boldText, {fontSize: 8, color: stage3, marginTop: 5, letterSpacing: 1}]}>SCHEDULE</Text>
      </View>
      <View style={{position: 'absolute', left:90, top:12, zIndex: 0, flexDirection:'row', }}>
        <View style={[styles.hr, {backgroundColor: stage2}]}></View>
        <View style={[styles.hr, {marginLeft: 15, backgroundColor: stage3}]}></View>
      </View>
    </View>
  )
}

export default UserJourney;