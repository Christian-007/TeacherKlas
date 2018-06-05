import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Material from 'react-native-vector-icons/MaterialIcons';
import commonStyles from '../../../common/CommonStyleSheet';
import { connect } from 'react-redux';
import { removeSchedule } from '../../../actions/scheduleProfile';
import PropTypes from 'prop-types';

class ScheduleTable extends Component {
  constructor(props) {
    super(props);
  }

  onEditSchedule = (title, scheduleObj) => {
    this.props.onEditSchedule(title, scheduleObj);
  }

  onDeleteSchedule = (scheduleId) => {
    this.props.removeSchedule(scheduleId);
  }

  render() {
    let schedules = this.props.profileObj.schedules.map(schedule => (
      <View key={schedule.id} style={styles.tableWrapper}>
        <View style={styles.leftHeader}>
          <Text style={[commonStyles.fontLato]}>{schedule.day}</Text>
        </View>
        <View style={styles.centerHeader}>
          <Text style={[commonStyles.fontLato]}>{schedule.starttime} - {schedule.endtime} WIB</Text>
        </View>
        <View style={styles.rightHeader}>
          <TouchableOpacity style={{flexDirection: 'row', marginBottom: 5}} onPress={() => this.onEditSchedule('EDIT SCHEDULE', schedule)}>
            <Material 
              name="edit"
              backgroundColor="transparent"
              size={15}
              color="#00b16e" 
            />
            <Text style={{color: '#00b16e'}}>{' '}Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.onDeleteSchedule(schedule.id)}>
            <Material 
              name="delete"
              backgroundColor="transparent"
              size={15}
              color="#f2453d" 
            />
            <Text style={{color: '#f2453d'}}>{' '}Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    ));
    return (
      <View style={styles.tableContainer}>
        <View style={[styles.tableWrapper, {backgroundColor: '#fafafa'}]}>
          <View style={styles.leftHeader}>
            <Text style={[commonStyles.fontLato, styles.headerFont]}>DAY</Text>
          </View>
          <View style={styles.centerHeader}>
            <Text style={[commonStyles.fontLato, styles.headerFont]}>TIME</Text>
          </View>
          <View style={styles.rightHeader}>
            <Text style={[commonStyles.fontLato, styles.headerFont]}>EDIT</Text>
          </View>
        </View>
        {schedules.length === 0 ? 
          (
            <View style={[styles.tableWrapper, {alignItems: 'center', justifyContent: 'center', padding: 10}]}>
              <Text style={commonStyles.fontLato}>You don't have any schedule</Text>
            </View>
          ) : 
          schedules
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tableContainer: {
    marginTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  tableWrapper: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderColor: '#eee',
  },
  headerFont: {
    color: '#828282',
    letterSpacing: 1
  },
  leftHeader: {
    width: '30%',
    borderRightWidth: 1,
    borderRightColor: '#eee',
    padding: 10,
  },
  centerHeader: {
    width: '40%',
    padding: 10
  },
  rightHeader: {
    width: '30%',
    borderLeftWidth: 1,
    borderLeftColor: '#eee',
    padding: 10
  },
});

ScheduleTable.propTypes = {
  profileObj: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profileObj: state.completeProfileReducer
});

export default connect(mapStateToProps, { removeSchedule })(ScheduleTable);