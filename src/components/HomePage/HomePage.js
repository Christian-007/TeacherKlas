import React, { Component } from 'react';
import { Badge, Icon, Text, Card } from 'native-base';
import { 
  View,
  Image,
  ScrollView,
} from 'react-native';
import commonStyles from '../../common/CommonStyleSheet';
import styles from './Stylesheet';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      lessonObj: [
        {
          id: 1,
          subject: 'Bahasa Inggris',
          type: 'PRIVATE',
          teacherName: 'Christian Ing',
          date: 'Tuesday, 27 April 2018',
          timeStart: '09.00',
          timeEnd: '10.30',
        },
        {
          id: 2,
          subject: 'Bahasa Inggris',
          type: 'PRIVATE',
          teacherName: 'Christian Ing',
          date: 'Tuesday, 27 April 2018',
          timeStart: '09.00',
          timeEnd: '10.30',
        },
        {
          id: 3,
          subject: 'Bahasa Inggris',
          type: 'PRIVATE',
          teacherName: 'Christian Ing',
          date: 'Tuesday, 27 April 2018',
          timeStart: '09.00',
          timeEnd: '10.30',
        }
      ]
    };
  }

  render() {
    const lessonItems = this.state.lessonObj.map(lesson => (
      <Card key={lesson.id} style={[styles.cardWrapper]}>
        <View>
          <Text style={[commonStyles.boldText, styles.cardSubject]}>{lesson.subject}</Text>
          <Text style={[commonStyles.fontLato, styles.cardTeacher]}>{lesson.teacherName}</Text>
          <Badge style={styles.cardType}>
            <Text style={styles.cardTextStyle}>{lesson.type}</Text>
          </Badge>
        </View>
        <Image
          style={styles.roundedImg}
          source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
          resizeMode="contain"
        />
      </Card>
    ));

    return (
      <View style={styles.container}>
        <View style={styles.paddingView}>
          <View style={{marginTop: 15, borderWidth: 1, borderColor: '#f2f5f7', borderRadius: 4}}>
            <View style={{backgroundColor: '#f2f5f7', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10}}>
              <Image
                style={styles.roundedImg}
                source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                resizeMode="contain"
              />
              <View style={{marginLeft: 10}}>
                <Text style={[commonStyles.fontLato, {fontSize: 20}]}>David Blain</Text>
                <Text style={[commonStyles.lightText, {fontSize: 12}]}>Brighton, United Kingdom</Text>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: 10}}>
                <View style={{backgroundColor: '#f2f5f7', width: '40%', borderRadius: 4, padding: 5}}>
                  <Text style={[commonStyles.fontLato, {fontSize: 12, letterSpacing: 1, color: '#576c7f'}]}>status</Text>
                </View>
                <View style={{width: '40%'}}>
                  <Text style={[commonStyles.fontLato, {fontSize: 12, letterSpacing: 1, color: '#00b16e'}]}>Discoverable</Text>
                </View>
              </View>
              <View style={{borderTopWidth: 1, borderColor: '#f2f5f7', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: 10}}>
                <View style={{backgroundColor: '#f2f5f7', width: '40%', borderRadius: 4, padding: 5}}>
                  <Text style={[commonStyles.fontLato, {fontSize: 12, letterSpacing: 1, color: '#576c7f'}]}>schedule</Text>
                </View>
                <View style={{width: '40%'}}>
                  <Text style={[commonStyles.fontLato, {fontSize: 12, letterSpacing: 1, color: '#00b16e'}]}>Discoverable</Text>
                </View>
              </View>
              <View style={{borderTopWidth: 1, borderColor: '#f2f5f7', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: 10}}>
                <View style={{backgroundColor: '#f2f5f7', width: '40%', borderRadius: 4, padding: 5}}>
                  <Text style={[commonStyles.fontLato, {fontSize: 12, letterSpacing: 1, color: '#576c7f'}]}>rate</Text>
                </View>
                <View style={{width: '40%'}}>
                  <Text style={[commonStyles.fontLato, {fontSize: 12, letterSpacing: 1, color: '#00b16e'}]}>Discoverable</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.textWrapper}>
            <Text style={[commonStyles.boldText, styles.upcomingText]}>ENROLLED LESSONS</Text>
            <Badge style={{ backgroundColor: '#00b16e' }}>
              <Text style={{ color: 'white' }}>2</Text>
            </Badge>
          </View>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.scheduleWrapper}>
            { lessonItems }
          </View>
        </ScrollView>
      </View>
    );
  }
}