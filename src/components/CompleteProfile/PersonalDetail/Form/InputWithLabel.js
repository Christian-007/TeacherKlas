import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Label, Input, Item } from 'native-base';
import commonStyles from '../../../../common/CommonStyleSheet';

class InputGroup extends Component {
  render() {
    return (
      <View style={this.props.itemStyle}>
        <Item stackedLabel error={this.props.error ? true : false} style={{marginLeft: 0}}>
          <Label style={[commonStyles.formLabel, {letterSpacing: 2, color: '#b3b3b3', fontSize: 12}]}>{this.props.labelText}</Label>
          <Input 
            style={[commonStyles.fontLato, {fontSize: 13}]}
            underlineColorAndroid='transparent'
            onChangeText={this.props.onChangeText}
            value={this.props.value}
          />
        </Item>
        <Text style={commonStyles.errorMessage}>
          {this.props.error ? this.props.error : ''}
        </Text>
      </View>
    )
  }
}

export default InputGroup;