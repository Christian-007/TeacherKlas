import React, { Component } from 'react';
import { isSignedIn, getProfileStatus } from "./auth";
import { Root } from "native-base";
import { createRootNavigator } from "./router";
import firebase from 'react-native-firebase';
import Loader from './src/common/Loader';

class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false,
      loading: true,
    };
  }

  componentDidMount() {
    isSignedIn()
      .then(res => {
        if (res === true) {
          getProfileStatus().then(res => {
            if (res !== null) {
              const userProfile = JSON.parse(res);
              if (userProfile.isCompleteProfile) {
                this.setState({ signedIn: "SignedIn", checkedSignIn: true })
              } else {
                this.setState({ signedIn: "CompleteProfile", checkedSignIn: true })
              }
            }
          });
        } else {
          this.setState({ signedIn: "SignedOut", checkedSignIn: true })
        }
      })
      .catch(err => alert("An error occurred"));
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }

    const Layout = createRootNavigator(signedIn);
    return (
      <Root>
        <Layout />
      </Root>
    )

    // if (signedIn) {
    //   return <SignedIn />;
    // } else {
    //   return <SignedOut />;
    // }

  }
}

export default AppContainer;