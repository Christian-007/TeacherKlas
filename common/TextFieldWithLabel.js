import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { Label, Input, Form, Item } from 'native-base';
import styles from '../components/CompleteProfile/Stylesheet';
import commonStyles from './CommonStyleSheet';

const TextFieldWithLabel = ({label, value, onChangeText, placeholder, formStyles}) => {
  return (
    <Form style={formStyles}>
      <Item stackedLabel style={{marginLeft: 0}}>
        <Label style={[commonStyles.formLabel, styles.labelForm]}>{label}</Label>
        <Input 
          style={[commonStyles.fontLato, {fontSize: 13}]}
          underlineColorAndroid='transparent'
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#b3b3b3"
        />
      </Item>
    </Form>
  )
  
}
export default TextFieldWithLabel;