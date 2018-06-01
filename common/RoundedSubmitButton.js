import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from '../components/CompleteProfile/Stylesheet';
import commonStyles from './CommonStyleSheet';

const RoundedSubmitButton = ({label, onPress}) => {
  return (
    <TouchableOpacity style={styles.submitBtn} onPress={onPress}>
      <Text style={[commonStyles.boldText, styles.submitText]}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}

export default RoundedSubmitButton;