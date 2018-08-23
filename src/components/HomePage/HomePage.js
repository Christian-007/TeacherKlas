import React, { Component } from 'react';
import { Badge, Icon, Text, Card, List, ListItem, Thumbnail, Left, Body, Right, Button, Item } from 'native-base';
import { 
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import commonStyles from '../../common/CommonStyleSheet';
import styles from './Stylesheet';
import TeacherCard from './TeacherCard';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      lessonObj: [
        {
          name: 'Cardi McWoody',
          imgUrl: 'https://firebasestorage.googleapis.com/v0/b/klas-project-930c2.appspot.com/o/users%2Fgirl01.jpg?alt=media&token=d33d9915-59a2-4e2f-b7d9-0335f89974a3',
          subject: 'Math'
        },
        {
          name: 'John Doe',
          imgUrl: 'https://firebasestorage.googleapis.com/v0/b/klas-project-930c2.appspot.com/o/users%2Fguy01.jpeg?alt=media&token=6fbe65f4-b998-441f-9583-9df2fc377fb0',
          subject: 'Math'
        },
        {
          name: 'Rowan Durkin',
          imgUrl: 'https://firebasestorage.googleapis.com/v0/b/klas-project-930c2.appspot.com/o/users%2Fguy02.jpg?alt=media&token=723dd73d-6935-4b3a-8d73-0fa0084afd13',
          subject: 'English'
        }
      ]
    };
  }

  renderOngoingKlas = (data) => {
    return (
      <List>
        {data.map((item, index) => 
          <ListItem thumbnail key={index}>
            <Left>
              <Thumbnail source={{ uri: item.imgUrl }} />
            </Left>
            <Body>
              <Text>{item.name}</Text>
              <Text note numberOfLines={1}>{item.subject}</Text>
            </Body>
            <Right>
              <Button transparent>
                <Text>View</Text>
              </Button>
            </Right>
          </ListItem>
        )}
      </List>
    );
  }

  render() {

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.paddingView}>
            <TeacherCard 
              imgUrl='https://firebasestorage.googleapis.com/v0/b/klas-project-930c2.appspot.com/o/users%2Fteacher.jpg?alt=media&token=94bdacad-08cc-4161-b3d2-8d430df927df'
              teacherName='Josie Rizal'
              isDiscovered={true}
            />
            <View style={{marginTop: 20, borderWidth: 1, borderColor: '#f3f3f3'}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f5f5f8', padding: 15}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={[commonStyles.boldText, {color: '#999fab', letterSpacing: 1}]}>ON-GOING KLAS</Text>
                  <Badge style={{backgroundColor: '#00b16e', marginLeft: 5}}>
                    <Text>{this.state.lessonObj.length}</Text>
                  </Badge>
                </View>
                <TouchableOpacity>
                  <Text style={[commonStyles.boldText, {color: '#3d8af7', letterSpacing: 2}]}>SEE ALL</Text>
                </TouchableOpacity>
              </View>

              <View style={{backgroundColor: 'white'}}>
                {this.renderOngoingKlas(this.state.lessonObj)}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}