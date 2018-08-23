import React from 'react';
import commonStyles from '../../common/CommonStyleSheet';
import styles from './Stylesheet';
import { 
  View,
  Image,
  Text,
} from 'react-native';
import Material from 'react-native-vector-icons/MaterialIcons';

const TeacherCard = ({imgUrl, teacherName, isDiscovered}) => {
  return (
    <View style={styles.profileCard}>
      <Image
        style={styles.roundedImg}
        source={{uri: imgUrl}}
      />
      <View style={{marginLeft: 10}}>
        <Text style={[commonStyles.fontLato, {fontSize: 24, letterSpacing: 1, color: '#171717'}]}>{teacherName}</Text>
        {isDiscovered ? 
        (
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <Material 
              name="check-circle"
              size={15}
              color="#00b16e" 
            />
            <Text style={[commonStyles.fontLato, {fontSize: 12, color: '#00b16e', letterSpacing: 2, marginLeft: 5}]}>DISCOVERABLE</Text>
          </View>
        )
        :
        (
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <Material 
              name="error"
              size={15}
              color="#f2453d" 
            />
            <Text style={[commonStyles.fontLato, {fontSize: 12, color: '#f2453d', letterSpacing: 2, marginLeft: 5}]}>NOT DISCOVERED</Text>
          </View>
        )
        }
      </View>
    </View>
  )
};

export default TeacherCard;