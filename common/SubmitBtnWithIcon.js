import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from '../components/CompleteProfile/Stylesheet';
import commonStyles from './CommonStyleSheet';
import Material from 'react-native-vector-icons/MaterialIcons';

const SubmitBtnWithIcon = ({label, onPress, disabled}) => {
  return (
    <TouchableOpacity style={styles.submitBtn} onPress={onPress} disabled={disabled}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={[commonStyles.boldText, styles.submitText]}>
          {label + ' '}
        </Text>
        <Material 
          name="arrow-forward"
          backgroundColor="transparent"
          size={20}
          color="white"
        />
      </View>
    </TouchableOpacity>
  )
}

export default SubmitBtnWithIcon;