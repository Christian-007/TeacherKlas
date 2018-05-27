import React, { Component } from 'react';
import { Text, View, Button, TouchableHighlight } from 'react-native';
import { List, ListItem } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { chooseSubject } from '../../../actions';

class SubjectModal extends Component {
  static navigationOptions = {
    title: 'ADD SUBJECT',
  };

  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          id: 1,
          title: 'English'
        },
        {
          id: 2,
          title: 'Japanese'
        },
        {
          id: 3,
          title: 'France'
        },
        {
          id: 4,
          title: 'Arabic'
        }
      ],
      selected: [],
      text: 'initial'
    }
    this.addSubject = this.addSubject.bind(this);
  }

  addSubject(title) {
    console.log('subject: ', title);
    this.props.chooseSubject(title);
  }

  render() {
    const { text } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#fafafa'}}>
        <View>
          <Text>Test</Text>
          {this.props.subjectsObj.map(subject => (
            <Text key={subject.id}>{subject.title}</Text>
          ))}
        </View>
        <List dataArray={this.state.items}
          renderRow={(item) =>
          <ListItem onPress={() => {this.addSubject(item.title)}}>
            <Text>{item.title}</Text>
          </ListItem>
          }>
        </List>
      </View>
    )
  }
}

SubjectModal.propTypes = {
  subjectsObj: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  subjectsObj: state.completeProfileReducer
});

export default connect(mapStateToProps, { chooseSubject })(SubjectModal);