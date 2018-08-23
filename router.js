import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import { 
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from 'react-navigation';
import { Button, Text, View } from 'react-native';

import LoginPage from './src/components/LoginPage/LoginPage';
import SignupPage from './src/components/SignupPage/SignupPage';
import HomePage from './src/components/HomePage/HomePage';
import ProfilePage from './src/components/ProfilePage/ProfilePage';

import PersonalDetailPage from './src/components/CompleteProfile/PersonalDetail/PersonalDetail';
import ExperiencePage from './src/components/CompleteProfile/Experience/Experience';
import CreateSchedulePage from './src/components/CompleteProfile/CreateSchedule/CreateSchedule';
import SubjectModal from './src/components/CompleteProfile/PersonalDetail/SubjectModal';
import ExperienceModal from './src/components/CompleteProfile/Experience/ExperienceModal';
import SlotModal from './src/components/CompleteProfile/CreateSchedule/SlotModal';

const headerStyling = {
  backgroundColor: '#fff',
  elevation: 0,
  shadowOpacity: 0,
  shadowColor: 'transparent',
  borderBottomColor:'#f3f3f3',
};

const headerTitleStyling = {
  fontFamily: 'Lato-Regular',
  fontWeight: '800',
  fontSize: 12,
  letterSpacing: 3,
  color: '#7a7a7a',
};

// Template for custom back btn on headerLeft
const customBackBtn = (navigation) => {
  return (
    <View style={{marginLeft: 20}}>
      <Material 
        name="keyboard-backspace"
        backgroundColor="transparent"
        size={30}
        color="#cdccd8" 
        onPress={() => {
          navigation.goBack()
        }}
      />
    </View>
  );
};

// SignedOut Pages or First Landing Page
export const SignedOut = createStackNavigator({
  Login: {
    screen: LoginPage,
    title: 'LOGIN',
    navigationOptions: {
      headerStyle: headerStyling,
      headerTitleStyle: headerTitleStyling
    }
  },
  Signup: {
    screen: SignupPage,
    navigationOptions: ({navigation}) => ({
      headerLeft: (customBackBtn(navigation)),
      headerStyle: headerStyling,
    })
  },
});

/* --- Complete Profile Navigations ---- */
const CompleteProfile = createStackNavigator(
  {
    CreateSchedule: {
      screen: CreateSchedulePage,
    },
    PersonalDetail: {
      screen: PersonalDetailPage,
    },
    SubjectModal: {
      screen: SubjectModal,
    },
    Experience: {
      screen: ExperiencePage,
    },
    ExperienceModal: {
      screen: ExperienceModal,
    },
    SlotModal: {
      screen: SlotModal,
    },
  },
  {
    navigationOptions: {
      headerStyle: headerStyling,
      headerTitleStyle: headerTitleStyling
    }
  }
);

/* --- Signed in Navigations ---- */
const HomeStack = createStackNavigator({
  Home: { 
    screen: HomePage,
    navigationOptions: {
      title: 'HOME',
      headerStyle: headerStyling,
      headerTitleStyle: headerTitleStyling
    }
  },
});

const ProfileStack = createStackNavigator({
  Profile: { 
    screen: ProfilePage,
    navigationOptions: {
      title: 'PROFILE',
      headerStyle: headerStyling,
      headerTitleStyle: headerTitleStyling
    }
  },
});

// // FOR TESTING PURPOSE ONLY - DELETE BEFORE DEPLOYMENT!!!
// const CurrentStack = createStackNavigator({
//   Schedule: {
//     screen: SchedulePage,
//     navigationOptions: ({navigation}) => ({
//       headerStyle: headerStyling,
//     })
//   }
// });
// // FOR TESTING PURPOSE ONLY - DELETE BEFORE DEPLOYMENT!!!

// Pages after signed in
export const SignedIn = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      title: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Material name="home" size={30} color={tintColor} />
      )
    }
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      title: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-contact" size={30} color={tintColor} />
      )
    }
  },
},
{
  tabBarOptions: {
    showLabel: false,
    activeTintColor: '#00b16e',
    inactiveTintColor: '#c0c0c0',
    style: {
      backgroundColor:'white',
      borderTopColor: '#f3f3f3'
    },
  },
}
);

// Root Navigator: determine the root navigator
export const createRootNavigator = (signedIn = "SignedOut") => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      },
      CompleteProfile: {
        screen: CompleteProfile
      },
    },
    {
      initialRouteName: signedIn
      // initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
