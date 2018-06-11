import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from '../components/CompleteProfile/Stylesheet';
import commonStyles from './CommonStyleSheet';
import Ionic from 'react-native-vector-icons/Ionicons';

const UserJourney = ({stage1, stage2, stage3, current}) => {
  return (
    <View style={styles.journey}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.events}>
          {
            current === 'stage1' ?
            <Ionic name="ios-checkmark-circle" size={25} color={stage1} />
            :
            <Ionic name="ios-checkmark-circle-outline" size={25} color={stage1} />
          }
          <Text style={[commonStyles.boldText, {textAlign: 'center', fontSize: 8, color: stage1, letterSpacing: 1, width: 100}]}>PERSONAL</Text>
        </View>
        <View style={[styles.hr, {backgroundColor: stage2, marginTop: 10,}]}></View>
        <View style={styles.events}>
          {
            current === 'stage2' ?
            <Ionic name="ios-checkmark-circle" size={25} color={stage2} />
            :
            <Ionic name="ios-checkmark-circle-outline" size={25} color={stage2} />
          }
          <Text style={[commonStyles.boldText, {textAlign: 'center', fontSize: 8, color: stage2, letterSpacing: 1, width: 100}]}>EXPERIENCE</Text>
        </View>
        <View style={[styles.hr, {backgroundColor: stage3, marginTop: 10,}]}></View>
        <View style={styles.events}>
          {
            current === 'stage3' ?
            <Ionic name="ios-checkmark-circle" size={25} color={stage3} />
            :
            <Ionic name="ios-checkmark-circle-outline" size={25} color={stage3} />
          }
          <Text style={[commonStyles.boldText, {textAlign: 'center', fontSize: 8, color: stage3, letterSpacing: 1, width: 100}]}>SCHEDULE</Text>
        </View>
      </View>
    </View>
  )
}

export default UserJourney;