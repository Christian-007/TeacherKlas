import React, { Component } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import { isSignedIn } from "./auth";
import { SignedOut, SignedIn, createRootNavigator } from "./router";
// import { SignedOut, createRootNavigator } from "./router";

class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentDidMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert("An error occurred"));
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }

    const Layout = createRootNavigator(signedIn);
    return <Layout />;

    // if (signedIn) {
    //   return <SignedIn />;
    // } else {
    //   return <SignedOut />;
    // }

  }
}

export default AppContainer;